import { firestore } from '@schoolApp/core/firebase/firebase.config';
import { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';
import { School, schoolConverter, SchoolWithoutId } from '@schoolApp/shared/interfaces/schools.interface';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

/**
 * Return all schools corresponding to array of status, return all if no status specified
 * @param status {StatusType[] | undefined}
 */
export const getAllSchools = (status?: StatusType[]) => {
  if (!status?.length) {
    return getDocs(collection(firestore, 'schools').withConverter(schoolConverter));
  }

  return getDocs(query(collection(firestore, 'schools').withConverter(schoolConverter), where('status', 'in', status)));
};

export const subscribeToSchools = (callback: (snapshot: QuerySnapshot<School>) => void, status?: StatusType[]) => {
  const schoolCollection = collection(firestore, 'schools').withConverter(schoolConverter);

  const q = status?.length ? query(schoolCollection, where('status', 'in', status)) : schoolCollection;

  return onSnapshot(q, callback);
};

/**
 * Return a school attached to an uid
 * @param uid {string}
 */
export const getSchoolByUid = (uid: string) => {
  return getDoc(doc(firestore, `schools/${uid}`).withConverter(schoolConverter));
};

/**
 * Add a school in the database
 * @param school {School} - Optional, add EMPTY_SCHOOL constant if not precised
 */
export const addSchool = (school?: School) => {
  return addDoc(collection(firestore, `schools`).withConverter(schoolConverter), school ?? EMPTY_SCHOOL);
};

/**
 * Update school attached to an uid
 * @param uid {string}
 * @param school {Partial<School>}
 */
export const updateSchool = (uid: string, school: Partial<School>) => {
  return updateDoc(doc(firestore, `schools/${uid}`).withConverter(schoolConverter), school);
};

/**
 * Delete a school attached to an uid
 * @param uid {string}
 */
export const deleteSchool = (uid: string) => {
  return deleteDoc(doc(firestore, `schools/${uid}`).withConverter(schoolConverter));
};

/**
 * Empty school default object
 */
const EMPTY_SCHOOL: SchoolWithoutId = {
  title: 'Empty School',
  image: 'default-school.png',
  publicSummary: 'empty description',
  duration: 1,
  objectives: [],
  prerequisites: [],
  document: '',
  githubLink: '',
  teachers: [],
  referents: [],
  status: 'proposal',
  technology: '',
  lastSession: Timestamp.fromDate(new Date()),
  lastSessionLocation: '',
  lastUpdate: Timestamp.fromDate(new Date()),
  level: 'beginner',
  driveLink: '',
};
