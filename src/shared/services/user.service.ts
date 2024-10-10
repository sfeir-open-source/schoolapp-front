import { collection, doc, DocumentSnapshot, getDoc, getDocs, query, QuerySnapshot, setDoc } from 'firebase/firestore';
import { firestore } from '@schoolApp/core/firebase/firebase.config';
import { User, userConverter, UserRole } from '@schoolApp/shared/interfaces/users.interface';
import { UserCredential } from '@firebase/auth';
import { MissingEmailError } from '@schoolApp/shared/errors/user.errors';

/**
 * Return all users
 */
export const getAllUsers = (): Promise<QuerySnapshot<User>> => {
  return getDocs(query(collection(firestore, 'users').withConverter(userConverter)));
};

/**
 * Return User corresponding to its sfeir email
 * @param email {string}
 */
export const getUserByEmail = (email: string): Promise<DocumentSnapshot<User>> => {
  return getDoc(doc(firestore, `users/${email}`).withConverter(userConverter));
};

/**
 * Determine if a user exist in the database, if not he is inserted as a new user
 * @param userCredential {UserCredential}
 */
export const addUser = async (userCredential: UserCredential): Promise<DocumentSnapshot<User>> => {
  // Handle incomplete user information
  if (!userCredential.user.email) {
    throw new MissingEmailError(userCredential.user.displayName ?? undefined);
  }

  let user: DocumentSnapshot<User> = await getUserByEmail(userCredential.user.email);

  if (!user.exists()) {
    const newUser: User = {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName ?? '',
      email: userCredential.user.email,
      emailVerified: userCredential.user.emailVerified,
      photoURL: userCredential.user.photoURL ?? '',
      role: UserRole.STUDENT,
    };
    // Save new user at uid in collection.
    await setDoc(doc(firestore, `users/${newUser.email}`), newUser);
    user = await getUserByEmail(userCredential.user.email);
  }
  return user;
};
