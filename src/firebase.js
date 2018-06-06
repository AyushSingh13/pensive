import { initializeApp } from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

import { firebaseConfig } from './settings';

const app = initializeApp(firebaseConfig);

export const db = app.firestore();
export const vocabularyRef = db.collection('vocabulary');