const Word = require('../Word');

describe('Word Search Use Case Testing', () => {
    // Test cases for adding functionality
    describe('Add Word Functionality', () => {
        test('TC1: Searching a valid word', () => {
            const drive = "apple"
            const result_Length = Word.checkWord_Length(drive);
            const result_Character = Word.checkSpecialCharacters(drive);

            expect(result_Length).toBe("Word is valid");
            expect(result_Character).toBe(false);
        });

        test('TC2: Searching a word with length < 0', () => {
            const drive = ""
            const result_Length = Word.checkWord_Length(drive);
            const result_Character = Word.checkSpecialCharacters(drive);

            expect(result_Length).toBe("Word must be at least 1 character");
            expect(result_Character).toBe(false);
        });

        test('TC3: Searching a word with length > 50', () => {
            const drive = "abcdefghijklmnopqrsuvwxyzabcdefghijklmnopqrsuvwxyzabcd"
            const result_Length = Word.checkWord_Length(drive);
            const result_Character = Word.checkSpecialCharacters(drive);

            expect(result_Length).toBe("Word is too long");
            expect(result_Character).toBe(false);
        });

        test('TCr: Searching a word with special characters', () => {
            const drive = "ap%@ple"
            const result_Length = Word.checkWord_Length(drive);
            const result_Character = Word.checkSpecialCharacters(drive);

            expect(result_Length).toBe("Word is valid");
            expect(result_Character).toBe(true);
        });

    });
});
