import { initializeApp } from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './settings';

const app = initializeApp(firebaseConfig);

export const db = app.database();
export const vocabularyRef = db.ref('vocabulary')