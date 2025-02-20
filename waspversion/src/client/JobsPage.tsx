import { useState } from 'react';
import {
  Heading,
  Spacer,
  VStack,
  HStack,
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  Divider,
  Checkbox,
  Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@wasp/queries';
import { OptimisticUpdateDefinition, useAction } from '@wasp/actions';
import getJobs from '@wasp/queries/getJobs';
import getCoverLetters from '@wasp/queries/getCoverLetters';
import updateJob from '@wasp/actions/updateJob';
import { Job } from '@wasp/entities';
import ModalElement from './components/Modal';
import DescriptionModal from './components/DescriptionModal';
import BorderBox from './components/BorderBox';
import { useHistory } from 'react-router-dom';
import { DeleteJob } from './components/AlertDialog';
import { FiDelete } from 'react-icons/fi';

function JobsPage() {
  const [jobId, setJobId] = useState<string>('');
  const [descriptionText, setDescriptionText] = useState<string | null>(null);

  const history = useHistory();

  const { data: jobs, isLoading, error } = useQuery(getJobs);
  const { data: coverLetter } = useQuery(getCoverLetters, { id: jobId }, { enabled: jobId.length > 0 });

  const updateJobOptimistically = useAction(updateJob, {
    optimisticUpdates: [
      {
        getQuerySpecifier: () => [getJobs],
        updateQuery: ({ isCompleted, id }, oldData) => {
          return oldData && oldData.map((job) => (job.id === id ? { ...job, isCompleted } : job));
        },
      } as OptimisticUpdateDefinition<Pick<Job, 'id' | 'isCompleted'>, Job[]>,
    ],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: desIsOpen, onOpen: desOnOpen, onClose: desOnClose } = useDisclosure();
  const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();

  const coverLetterHandler = (job: Job) => {
    if (job) {
      setJobId(job.id);
      onOpen();
    }
  };

  const checkboxHandler = async (e: any, job: Job) => {
    try {
      const payload = {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        isCompleted: e.target.checked,
      };
      updateJobOptimistically(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCoverLetterHandler = async (jobId: string) => {
    history.push(`/?job=${jobId}`);
  };

  return (
    <VStack gap={1}>
      <BorderBox>
        <Heading size='md'>Your Jobs</Heading>
        {isLoading && <Spinner />}
        {!!jobs && (
          <Accordion width='100%'>
            {jobs.length > 0 ? (
              jobs.map((job: Job) => (
                <AccordionItem key={job.id}>
                  <h2>
                    <HStack flex='1' justifyContent='space-between'>
                      <AccordionButton _focus={{ boxShadow: '0px -1px 0px 0px var(--chakra-colors-active)' }}>
                        <Text textDecoration={job.isCompleted ? 'line-through' : ''}>
                          <b>{job.title}</b>
                        </Text>
                        <Spacer />
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>
                  </h2>
                  <AccordionPanel pb={4} pt={2}>
                    <HStack justify='space-between' align='center'>
                      <Divider maxW='40%' variant='dashed' />
                      <Button
                        leftIcon={<FiDelete />}
                        mr={3}
                        size='xs'
                        fontSize='sm'
                        onClick={() => {
                          setJobId(job.id);
                          deleteOnOpen();
                        }}
                      >
                        Delete
                      </Button>
                    </HStack>
                    <VStack alignItems={'space-between'} my={1}>
                        <Text>
                          <b>Spouse Description:</b>
                        </Text>
                        <Button
                          size='xs'
                          fontSize='sm'
                          onClick={() => {
                            setDescriptionText(job.description);
                            desOnOpen();
                          }}
                        >
                          Display
                        </Button>
                      <HStack py={1} justify='space-between'>
                        <Button onClick={() => coverLetterHandler(job)} size='sm'>
                          Display Vows
                        </Button>
                        <Button colorScheme='purple' onClick={() => updateCoverLetterHandler(job.id)} size='sm'>
                          Create Additional Vows
                        </Button>
                      </HStack>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              ))
            ) : (
              <Text textAlign='center'>no jobs yet...</Text>
            )}
          </Accordion>
        )}
      </BorderBox>
      <Button size='sm' colorScheme='purple' alignSelf='flex-end' onClick={() => history.push('/')}>
        Create New Job
      </Button>
      {coverLetter && coverLetter.length > 0 && (
        <ModalElement coverLetterData={coverLetter} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      )}
      {descriptionText && (
        <DescriptionModal description={descriptionText} isOpen={desIsOpen} onOpen={desOnOpen} onClose={desOnClose} />
      )}
      <DeleteJob jobId={jobId} isOpen={deleteIsOpen} onOpen={deleteOnOpen} onClose={deleteOnClose} />
    </VStack>
  );
}

export default JobsPage;
