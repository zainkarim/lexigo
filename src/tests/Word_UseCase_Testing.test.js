/**
 * Use Case testing class for Word class
 * Zora Lahlou
 */
const Word = require('../Word');
const { addWord, deleteWord, searchWords } = Word;

describe('Word Manipulation System', () => {
    // Test cases for adding functionality
    describe('Add Word Functionality', () => {
        test('TC1: Adding a valid word', () => {
            const drive = new Word('drive', 'to operate a vehicle', 'verb');
            const result = addWord(drive);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Successfully added word');
        });

        test('TC2: Adding a word with digits', () => {
            const result = addWord('nice2seeU');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Please enter a valid word');
        });

        test('TC3: Adding an empty string', () => {
            const result = addWord('');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Failed to add word');
        });
    });

    // Test cases for adding functionality
    describe('Delete Word Functionality', () => {
        test('TC1: Deleting a valid word', () => {
            const testWord = new Word('jump', 'to leap in the air', 'verb');
            testWord.wordID = '4'; // Manually set ID for testing
            addWord(testWord);     // Add the word first

            const result = deleteWord('4');
            expect(result.success).toBe(true);
            expect(result.message).toBe('Deleted word successfully');
        });

        test('TC2: Deleting a word with letters', () => {
            const result = deleteWord('three');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Please enter a valid word');
        });

        test('TC3: Deleting an empty string', () => {
            const result = deleteWord('');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Word not found');
        });
    });

    // Test cases for adding functionality
    describe('Search Word Functionality', () => {
        test('TC1: Searching for a valid word', () => {
            const result = searchWords('drive');
            expect(result.success).toBe(true);
            expect(result.message).toBe('Successfully found word: drive');
            expect(Array.isArray(result.words)).toBe(true);
        });

        test('TC2: Searching for a word with digits', () => {
            const result = searchWords('nice2seeU');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Please enter a valid word');
        });

        test('TC3: Searching for a word an empty string', () => {
            const result = searchWords('');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Failed to search for word');
        });
    });
});