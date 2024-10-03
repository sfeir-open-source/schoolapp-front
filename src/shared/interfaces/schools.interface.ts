import { StatusType } from './filter-status.interface';

export interface School {
  id: number;
  title: string;
  publicSummary: string;
  status: StatusType;
  image: string;
  duration: number;
  teacher: Teacher;
  professors: Professor[];
}

export interface Teacher {
  name: string;
  email: string;
  picture: string;
}

export interface Professor {
  name: string;
  email: string;
  picture: string;
}
