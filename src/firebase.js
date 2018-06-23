import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

import { firebaseConfig } from './settings';

const app = initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;
export const db = app.firestore();
export const storage = app.storage();
export const vocabularyRef = db.collection('vocabulary');
export const documentsStorageRef = storage.ref("documents");
export const documentsDbRef = db.collection("documents");