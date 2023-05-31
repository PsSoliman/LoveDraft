import type { Job } from '@wasp/entities'

export type CoverLetterPayload = {
  jobId: string;
  title: string;
  company: string;
  content: string;
  description: string;
  isCompleteCoverLetter: boolean;
  includeWittyRemark: boolean;
  temperature: number;
};

export type JobPayload = Pick<Job, 'title' | 'company' | 'location' | 'description'>;
