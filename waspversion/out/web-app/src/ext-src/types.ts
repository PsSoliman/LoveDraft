import type { Job } from '../entities'

export type CoverLetterPayload = {
  jobId: string;
  title: string;
  content: string;
  description: string;
  isCompleteCoverLetter: boolean;
  includeWittyRemark: boolean;
  temperature: number;
};

export type JobPayload = Pick<Job, 'title' | 'company' | 'location' | 'description'>;
