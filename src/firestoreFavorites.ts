import { db } from './firebaseConfig';
import { doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';

export const addFavorite = async (userId: string, word: any) => {
  const wordId = word.word.toLowerCase();
  await setDoc(doc(db, 'users', userId, 'favorites', wordId), {
    ...word,
    dateAdded: new Date().toISOString(),
  });
};

export const removeFavorite = async (userId: string, wordId: string) => {
  await deleteDoc(doc(db, 'users', userId, 'favorites', wordId.toLowerCase()));
};

export const getFavorites = async (userId: string) => {
  const snapshot = await getDocs(collection(db, 'users', userId, 'favorites'));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      word: data.word,
      partOfSpeech: data.partOfSpeech,
      definition: data.definition,
      dateAdded: data.dateAdded,
      lastViewed: data.lastViewed || undefined,
    };
  });
};
