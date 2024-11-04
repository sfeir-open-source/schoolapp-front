import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export interface RealTimeEdits {
  id: string;
  schoolId: string;
  userId: string;
  fieldId: string;
}

export const realTimeEditsConverter: FirestoreDataConverter<RealTimeEdits> = {
  toFirestore(realTimeEdits: RealTimeEdits): DocumentData {
    return { ...realTimeEdits };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): RealTimeEdits {
    const data: DocumentData = snapshot.data(options);
    return {
      id: snapshot.id,
      schoolId: data.schoolId,
      userId: data.userId,
      fieldId: data.fieldId,
    };
  },
};
