import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, connectAuthEmulator, getAuth, onAuthStateChanged } from 'firebase/auth';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyD2VaGwGn-jNKNCwERFNqhf96WoeMcopvI',
  authDomain: 'school-app-399808.firebaseapp.com',
  projectId: 'school-app-399808',
  storageBucket: 'school-app-399808.appspot.com',
  messagingSenderId: '902602651848',
  appId: '1:902602651848:web:75ee7219e2590da3af8dfd',
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const firestore: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log({ user });
    // ...
  } else {
    // User is signed out
    // ...
  }
});
const storage: FirebaseStorage = getStorage(app);

if (location.hostname === 'localhost') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:4001', {
    disableWarnings: true,
  });
  connectStorageEmulator(storage, 'localhost', 9199);
}

export { app, auth, firestore, storage };
