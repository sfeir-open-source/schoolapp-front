import { StatusType } from './filter-status.interface';

export interface School {
  id: number;
  title: string;
  publicSummary: string;
  status: StatusType;
  image: string;
  duration: number;
}
