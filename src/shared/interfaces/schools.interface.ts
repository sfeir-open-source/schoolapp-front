import { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { User } from './users.interface';

/**
 * School interface
 */
export interface School {
  id: string;
  title: string;
  publicSummary: string;
  status: StatusType;
  image: string;
  duration: number;
  objectives: string[];
  prerequisites: string[];
  document: string;
  githubLink: string;
  driveLink: string;
  teachers: User[];
  referents: User[];
}

/**
 * School converter for Firestore
 */
export const schoolConverter: FirestoreDataConverter<School> = {
  /**
   * Convert School from Json object to Firestore document
   * @param school {School}
   */
  toFirestore(school: School): DocumentData {
    return { ...school };
  },

  /**
   * Convert School from Firestore to Json object
   * @param snapshot {QueryDocumentSnapshot}
   * @param options {SnapshotOptions}
   */
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): School {
    const data: DocumentData = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      publicSummary: data.publicSummary,
      status: data.status,
      image: data.image,
      duration: data.duration,
      objectives: data.objectives,
      prerequisites: data.prerequisites,
      document: data.document,
      githubLink: data.githubLink,
      driveLink: data.driveLink,
      teachers: data.teachers,
      referents: data.referents,
    };
  },
};
