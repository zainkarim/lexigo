/**
 * Winston Shih
 * CS 3354 Group 14 Lexigo
 * Phase 5 Favorites Use Case Class
 */
import { addFavorite, removeFavorite, getFavorites } from './favorites';
import { db } from './firebaseConfig';
import { doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';

jest.mock('./firebaseConfig', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
  getDocs: jest.fn(),
  collection: jest.fn(),
}));

describe('Add Favorites', () => {
  const userId = 'wxs190012';
  const word = { word: 'say', partOfSpeech: 'noun', definition: 'utter words so as to convey information, an opinion, a feeling or intention, or an instruction.' };
  const wordId = word.word.toLowerCase();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('addFavorite calls setDoc with correct parameters', async () => {
    const mockDoc = {};
    doc.mockReturnValue(mockDoc);
    await addFavorite(userId, word);
    expect(doc).toHaveBeenCalledWith(db, 'users', userId, 'favorites', wordId);
    expect(setDoc).toHaveBeenCalledWith(mockDoc, expect.objectContaining({
      ...word,
      dateAdded: expect.any(String),
    }));
  });

  test('removeFavorite calls deleteDoc with correct parameters', async () => {
    const mockDoc = {};
    doc.mockReturnValue(mockDoc);
    await removeFavorite(userId, wordId);
    expect(doc).toHaveBeenCalledWith(db, 'users', userId, 'favorites', wordId);
    expect(deleteDoc).toHaveBeenCalledWith(mockDoc);
  });

  test('getFavorites returns mapped favorites', async () => {
    const mockDocs = [
      {
        id: 'say',
        data: () => ({
          word: 'Say',
          partOfSpeech: 'noun',
          definition: 'utter words so as to convey information, an opinion, a feeling or intention, or an instruction.',
          dateAdded: '2025-04-25T12:00:00.000Z',
          lastViewed: '2025-04-25T12:10:00.000Z',
        }),
      },
    ];
    getDocs.mockResolvedValue({ docs: mockDocs });
    collection.mockReturnValue('collectionRef');

    const favorites = await getFavorites(userId);

    expect(collection).toHaveBeenCalledWith(db, 'users', userId, 'favorites');
    expect(getDocs).toHaveBeenCalledWith('collectionRef');
    expect(favorites).toEqual([
      {
        id: 'say',
        word: 'Say',
        partOfSpeech: 'noun',
        definition: 'utter words so as to convey information, an opinion, a feeling or intention, or an instruction.',
        dateAdded: '2025-04-25T12:00:00.000Z',
        lastViewed: '2025-04-25T12:10:00.000Z',
      },
    ]);
  });
});
