import { firestore } from '@schoolApp/core/firebase/firebase.config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  updateDoc,
} from 'firebase/firestore';
import { RealTimeEdits, realTimeEditsConverter } from '../interfaces/real-time-edits.interface';

export const getAllRealTimeEdits = () => {
  return getDocs(query(collection(firestore, 'realTimeEdits').withConverter(realTimeEditsConverter)));
};

export const subscribeToRealTimeEdits = (callback: (snapshot: QuerySnapshot<RealTimeEdits>) => void) => {
  const realTimeEditsCollection = collection(firestore, 'realTimeEdits').withConverter(realTimeEditsConverter);

  return onSnapshot(realTimeEditsCollection, callback);
};

export const addRealTimeEdits = (realTimeEdits: Partial<RealTimeEdits>) => {
  return addDoc(collection(firestore, `realTimeEdits`).withConverter(realTimeEditsConverter), realTimeEdits);
};

export const updateRealTimeEdits = (uid: string, realTimeEdit: Partial<RealTimeEdits>) => {
  return updateDoc(doc(firestore, `realTimeEdits/${uid}`).withConverter(realTimeEditsConverter), realTimeEdit);
};

export const deleteRealTimeEdits = (uid: string) => {
  return deleteDoc(doc(firestore, `realTimeEdits/${uid}`).withConverter(realTimeEditsConverter));
};
