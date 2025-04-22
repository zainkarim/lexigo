/**
 * Black Box testing class for Word class
 * Anoop Kondepudi
 */
const Word = require('../../Word');

// Clear the word list before tests to ensure clean state
beforeEach(() => {
    Word.wordList = [];
});

describe('Word Class', () => {
    // Test the constructor
    describe('Constructor and Basic Properties', () => {
        test('TC-W-001: Creating a word with all valid parameters', () => {
            const word = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            expect(word.wordID).toBe(1);
            expect(word.word).toBe("apple");
            expect(word.definition).toBe("A fruit");
            expect(word.example).toBe("I ate an apple");
            expect(word.tag).toBe("noun");
            expect(word.difficulty).toBe("easy");
        });

        test('TC-W-002: Creating a word with default parameters', () => {
            const word = new Word();
            expect(word.wordID).toBeNull();
            expect(word.word).toBeNull();
            expect(word.definition).toBeNull();
            expect(word.example).toBeNull();
            expect(word.tag).toBeNull();
            expect(word.difficulty).toBeNull();
        });
    });

    // Test the setter and getter methods
    describe('Setter and Getter Methods', () => {
        let word;

        beforeEach(() => {
            word = new Word();
        });

        // Test wordID methods
        test('TC-W-003: Setting a valid wordID', () => {
            expect(word.setWordID(5)).toBe(true);
            expect(word.getWordID()).toBe(5);
        });

        test('TC-W-004: Setting an invalid negative wordID', () => {
            expect(word.setWordID(-1)).toBe(false);
            expect(word.getWordID()).toBeNull();
        });

        test('TC-W-005: Setting an invalid non-numeric wordID', () => {
            expect(word.setWordID("five")).toBe(false);
            expect(word.getWordID()).toBeNull();
        });

        // Test word methods
        test('TC-W-006: Setting a valid word', () => {
            expect(word.setWord("banana")).toBe(true);
            expect(word.getWord()).toBe("banana");
        });

        test('TC-W-007: Setting an empty word string', () => {
            expect(word.setWord("")).toBe(false);
            expect(word.getWord()).toBeNull();
        });

        test('TC-W-008: Setting an invalid non-string word', () => {
            expect(word.setWord(123)).toBe(false);
            expect(word.getWord()).toBeNull();
        });

        // Test definition methods
        test('TC-W-009: Setting a valid definition', () => {
            expect(word.setDefinition("A yellow fruit")).toBe(true);
            expect(word.getDefinition()).toBe("A yellow fruit");
        });

        test('TC-W-010: Setting an empty definition string', () => {
            expect(word.setDefinition("")).toBe(false);
            expect(word.getDefinition()).toBeNull();
        });

        // Test example methods
        test('TC-W-011: Setting a valid example', () => {
            expect(word.setExample("The monkey ate a banana")).toBe(true);
            expect(word.getExample()).toBe("The monkey ate a banana");
        });

        test('TC-W-012: Setting an empty example string', () => {
            expect(word.setExample("")).toBe(true);
            expect(word.getExample()).toBe("");
        });

        // Test tag methods
        test('TC-W-013: Setting a valid tag', () => {
            expect(word.setTag("noun")).toBe(true);
            expect(word.getTag()).toBe("noun");
        });

        test('TC-W-014: Setting an invalid non-string tag', () => {
            expect(word.setTag(123)).toBe(false);
            expect(word.getTag()).toBeNull();
        });

        // Test difficulty methods
        test('TC-W-015: Setting a valid difficulty (easy)', () => {
            expect(word.setDifficulty("easy")).toBe(true);
            expect(word.getDifficulty()).toBe("easy");
        });

        test('TC-W-016: Setting a valid difficulty (medium)', () => {
            expect(word.setDifficulty("medium")).toBe(true);
            expect(word.getDifficulty()).toBe("medium");
        });

        test('TC-W-017: Setting a valid difficulty (hard)', () => {
            expect(word.setDifficulty("hard")).toBe(true);
            expect(word.getDifficulty()).toBe("hard");
        });

        test('TC-W-018: Setting a case-insensitive difficulty', () => {
            expect(word.setDifficulty("EASY")).toBe(true);
            expect(word.getDifficulty()).toBe("easy");
        });

        test('TC-W-019: Setting an invalid difficulty value', () => {
            expect(word.setDifficulty("expert")).toBe(false);
            expect(word.getDifficulty()).toBeNull();
        });
    });

    // Test the static methods
    describe('Static Methods', () => {
        // Test addWord method
        test('TC-W-020: Adding a valid word object', () => {
            const word = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            expect(Word.addWord(word)).toBe(true);
            expect(Word.wordList.length).toBe(1);
            expect(Word.wordList[0]).toBe(word);
        });

        test('TC-W-021: Adding an invalid non-Word object', () => {
            expect(Word.addWord("not a word object")).toBe(false);
            expect(Word.wordList.length).toBe(0);
        });

        test('TC-W-022: Updating an existing word', () => {
            const word1 = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            const word2 = new Word(1, "apple", "Updated definition", "New example", "noun", "medium");
            
            Word.addWord(word1);
            expect(Word.addWord(word2)).toBe(true);
            
            expect(Word.wordList.length).toBe(1);
            expect(Word.wordList[0].definition).toBe("Updated definition");
            expect(Word.wordList[0].example).toBe("New example");
            expect(Word.wordList[0].difficulty).toBe("medium");
        });

        // Test deleteWord method
        test('TC-W-023: Deleting an existing word', () => {
            const word = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            Word.addWord(word);
            
            expect(Word.deleteWord(1)).toBe(true);
            expect(Word.wordList.length).toBe(0);
        });

        test('TC-W-024: Deleting a non-existing word', () => {
            const word = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            Word.addWord(word);
            
            expect(Word.deleteWord(2)).toBe(false);
            expect(Word.wordList.length).toBe(1);
        });

        // Test getWordByID method
        test('TC-W-025: Getting an existing word by ID', () => {
            const word = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            Word.addWord(word);
            
            const result = Word.getWordByID(1);
            expect(result).toBe(word);
        });

        test('TC-W-026: Getting a non-existing word by ID', () => {
            const word = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            Word.addWord(word);
            
            const result = Word.getWordByID(2);
            expect(result).toBeNull();
        });

        // Test searchWords method
        test('TC-W-027: Searching for words with matches', () => {
            const word1 = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            const word2 = new Word(2, "banana", "A yellow fruit", "The monkey ate a banana", "noun", "easy");
            Word.addWord(word1);
            Word.addWord(word2);
            
            const results = Word.searchWords("fruit");
            expect(results.length).toBe(2);
            expect(results).toContain(word1);
            expect(results).toContain(word2);
        });

        test('TC-W-028: Searching for words with no matches', () => {
            const word1 = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            const word2 = new Word(2, "banana", "A yellow fruit", "The monkey ate a banana", "noun", "easy");
            Word.addWord(word1);
            Word.addWord(word2);
            
            const results = Word.searchWords("car");
            expect(results.length).toBe(0);
        });

        test('TC-W-029: Searching with an empty string', () => {
            const word1 = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            Word.addWord(word1);
            
            const results = Word.searchWords("");
            expect(results.length).toBe(0);
        });

        // Test getWordsByTag method
        test('TC-W-030: Getting words by existing tag', () => {
            const word1 = new Word(1, "run", "To move quickly", "I run every day", "verb", "easy");
            const word2 = new Word(2, "jump", "To leap upwards", "The cat can jump high", "verb", "easy");
            const word3 = new Word(3, "apple", "A fruit", "I ate an apple", "noun", "easy");
            Word.addWord(word1);
            Word.addWord(word2);
            Word.addWord(word3);
            
            const results = Word.getWordsByTag("verb");
            expect(results.length).toBe(2);
            expect(results).toContain(word1);
            expect(results).toContain(word2);
        });

        test('TC-W-031: Getting words by non-existing tag', () => {
            const word1 = new Word(1, "run", "To move quickly", "I run every day", "verb", "easy");
            Word.addWord(word1);
            
            const results = Word.getWordsByTag("adjective");
            expect(results.length).toBe(0);
        });

        // Test getWordsByDifficulty method
        test('TC-W-032: Getting words by difficulty', () => {
            const word1 = new Word(1, "run", "To move quickly", "I run every day", "verb", "easy");
            const word2 = new Word(2, "perplexing", "Confusing or puzzling", "It was a perplexing problem", "adjective", "hard");
            Word.addWord(word1);
            Word.addWord(word2);
            
            const results = Word.getWordsByDifficulty("easy");
            expect(results.length).toBe(1);
            expect(results).toContain(word1);
        });

        test('TC-W-033: Getting words by invalid difficulty', () => {
            const word1 = new Word(1, "run", "To move quickly", "I run every day", "verb", "easy");
            Word.addWord(word1);
            
            const results = Word.getWordsByDifficulty("unknown");
            expect(results.length).toBe(0);
        });

        // Test getRandomWord method
        test('TC-W-034: Getting a random word from non-empty list', () => {
            const word1 = new Word(1, "run", "To move quickly", "I run every day", "verb", "easy");
            const word2 = new Word(2, "jump", "To leap upwards", "The cat can jump high", "verb", "easy");
            Word.addWord(word1);
            Word.addWord(word2);
            
            const result = Word.getRandomWord();
            expect([word1, word2]).toContain(result);
        });

        test('TC-W-035: Getting a random word from empty list', () => {
            const result = Word.getRandomWord();
            expect(result).toBeNull();
        });

        // Test updateWord method
        test('TC-W-036: Updating an existing word with valid data', () => {
            const word = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            Word.addWord(word);
            
            const updateResult = Word.updateWord(1, {
                definition: "A red or green fruit",
                difficulty: "medium"
            });
            
            expect(updateResult).toBe(true);
            expect(word.definition).toBe("A red or green fruit");
            expect(word.difficulty).toBe("medium");
        });

        test('TC-W-037: Updating a non-existing word', () => {
            const updateResult = Word.updateWord(99, {
                definition: "New definition"
            });
            
            expect(updateResult).toBe(false);
        });

        test('TC-W-038: Updating with invalid data', () => {
            const word = new Word(1, "apple", "A fruit", "I ate an apple", "noun", "easy");
            Word.addWord(word);
            
            const updateResult = Word.updateWord(1, {
                difficulty: "expert" // Invalid difficulty
            });
            
            expect(updateResult).toBe(false);
            expect(word.difficulty).toBe("easy"); // Should not change
        });
    });

    // Test the validation functions
    describe('Validation Functions', () => {
        test('TC-W-039: Validating a valid wordID', () => {
            expect(Word.isValidWordID(10)).toBe(true);
        });

        test('TC-W-040: Validating an invalid negative wordID', () => {
            expect(Word.isValidWordID(-5)).toBe(false);
        });

        test('TC-W-041: Validating an invalid string wordID', () => {
            expect(Word.isValidWordID("10")).toBe(false);
        });

        test('TC-W-042: Validating a valid word string', () => {
            expect(Word.isValidWord("apple")).toBe(true);
        });

        test('TC-W-043: Validating a whitespace-only word string', () => {
            expect(Word.isValidWord("   ")).toBe(false);
        });

        test('TC-W-044: Validating an invalid non-string word', () => {
            expect(Word.isValidWord(123)).toBe(false);
        });

        test('TC-W-045: Validating a valid definition string', () => {
            expect(Word.isValidDefinition("A fruit")).toBe(true);
        });

        test('TC-W-046: Validating an empty definition string', () => {
            expect(Word.isValidDefinition("")).toBe(false);
        });

        test('TC-W-047: Validating a valid example string', () => {
            expect(Word.isValidExample("This is an example")).toBe(true);
        });

        test('TC-W-048: Validating an empty example string', () => {
            expect(Word.isValidExample("")).toBe(true);
        });

        test('TC-W-049: Validating a valid tag string', () => {
            expect(Word.isValidTag("noun")).toBe(true);
        });

        test('TC-W-050: Validating an invalid non-string tag', () => {
            expect(Word.isValidTag(123)).toBe(false);
        });

        test('TC-W-051: Validating a valid difficulty value', () => {
            expect(Word.isValidDifficulty("easy")).toBe(true);
        });

        test('TC-W-052: Validating a valid case-insensitive difficulty', () => {
            expect(Word.isValidDifficulty("MEDIUM")).toBe(true);
        });

        test('TC-W-053: Validating an invalid difficulty value', () => {
            expect(Word.isValidDifficulty("super-hard")).toBe(false);
        });
    });
}); 