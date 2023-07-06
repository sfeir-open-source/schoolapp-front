export interface Status {
  bgColor: string;
  type: StatusType;
  isChecked: boolean;
}

export type StatusType =
  | 'active'
  | 'abandoned'
  | 'wish'
  | 'proposal'
  | 'rejected';
