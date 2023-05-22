import { Tooltip, Button, Textarea, useClipboard, Spinner, HStack } from '@chakra-ui/react';
import { match } from 'react-router-dom';
import { useQuery } from '../queries';
import getCoverLetter from '../queries/getCoverLetter';
import BorderBox from './components/BorderBox';
import { useContext } from 'react';
import { TextareaContext } from './App';
import { EditAlert } from './components/AlertDialog';
import editCoverLetter from '../actions/editCoverLetter';
import { useEffect, useState } from 'react';
import { CoverLetter } from '../entities';

export default function CoverLetterPage({ match }: { match: match<{ id: string }> }) {
  const { textareaState, setTextareaState } = useContext(TextareaContext);
  const [editIsLoading, setEditIsLoading] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const id = match.params.id as string;
  const {
    data: coverLetter,
    isLoading,
    refetch,
  } = useQuery<{ id: string }, CoverLetter>(getCoverLetter, { id: id }, { enabled: false });

  const { hasCopied, onCopy } = useClipboard(coverLetter?.content || '');

  // restrains fetching to mount only to avoid re-render issues
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (coverLetter) {
      setTextareaState(coverLetter.content);
    }
  }, [coverLetter]);

  const handleClick = async () => {
    try {
      setEditIsLoading(true);

      const editedCoverLetter = await editCoverLetter({ coverLetterId: id, content: textareaState });

      if (!!editedCoverLetter) {
        setIsEdited(true);
        setTimeout(() => {
          setIsEdited(false);
        }, 2500);
      }
    } catch (error) {
      console.error(error);
      alert('An error occured. Please try again.');
    }
    setEditIsLoading(false);
  };

  return (
    <>
      <BorderBox>
        {isLoading && <Spinner />}

        <Textarea
          onChange={(e) => {
            setTextareaState(e.target.value);
          }}
          value={textareaState}
          id='cover-letter-textarea'
          height='md'
          top='50%'
          left='50%'
          transform={'translate(-50%, 0%)'}
          resize='none'
          variant='filled'
          dropShadow='lg'
          overflow='none'
          visibility={isLoading ? 'hidden' : 'visible'}
        />

        {coverLetter && (
          <HStack>
            <Tooltip
              label={isEdited && 'Changes Saved!'}
              placement='top'
              hasArrow
              isOpen={isEdited}
              closeDelay={2500}
              closeOnClick={true}
            >
              <Button size='sm' mr={3} onClick={handleClick} isDisabled={false} isLoading={editIsLoading}>
                Save Changes
              </Button>
            </Tooltip>
            <Tooltip
              label={hasCopied ? 'Copied!' : 'Copy Letter to Clipboard'}
              placement='top'
              hasArrow
              closeOnClick={false}
            >
              <Button colorScheme='purple' size='sm' mr={3} onClick={onCopy}>
                Copy
              </Button>
            </Tooltip>
          </HStack>
        )}
      </BorderBox>
      <EditAlert coverLetter={!!coverLetter} />
    </>
  );
}
