/**
 * Anoop and Winston Shih
 * CS 3354 Group 14 Phase 4
 * 4/2/2025
 */
class Word {
    static wordList = []; // Static list to store all words
    /**
     * Constructor class with 6 parameter arguments
     * @param {*} wordID ID of word
     * @param {*} word word
     * @param {*} definition word definition
     * @param {*} example example of word used in a sentence.
     * @param {*} tag word tag
     * @param {*} difficulty difficulty level of word
     */
    constructor(wordID = null, word = null, definition = null, example = null, tag = null, difficulty = null) {
        this.wordID = wordID;
        this.word = word;
        this.definition = definition;
        this.example = example;
        this.tag = tag;
        this.difficulty = difficulty;
    }

    /**
     * Validates if a wordID is valid
     * @param {*} wordID ID to validate
     * @returns true if ID is a number and is non-negative
     */
    static isValidWordID(wordID) {
        return typeof wordID === 'number' && wordID >= 0;
    }

    /**
     * Validates if a word string is valid
     * @param {*} word Word to validate
     * @returns true if word is a non-empty string
     */
    static isValidWord(word) {
        return typeof word === 'string' && word.trim() !== '';
    }

    /**
     * Validates if a definition is valid
     * @param {*} definition Definition to validate
     * @returns true if definition is a non-empty string
     */
    static isValidDefinition(definition) {
        return typeof definition === 'string' && definition.trim() !== '';
    }

    /**
     * Validates if an example is valid
     * @param {*} example Example to validate
     * @returns true if example is a string
     */
    static isValidExample(example) {
        return typeof example === 'string';
    }

    /**
     * Validates if a tag is valid
     * @param {*} tag Tag to validate
     * @returns true if tag is a string
     */
    static isValidTag(tag) {
        return typeof tag === 'string';
    }

    /**
     * Validates if a difficulty level is valid
     * @param {*} difficulty Difficulty to validate
     * @returns true if difficulty is one of: 'easy', 'medium', 'hard'
     */
    static isValidDifficulty(difficulty) {
        const validDifficulties = ['easy', 'medium', 'hard'];
        return typeof difficulty === 'string' && validDifficulties.includes(difficulty.toLowerCase());
    }

    /**
     * Sets word ID to a numeric non-zero value.
     * @param {*} wordID id of word
     * @returns true if ID is a number and is greater than 0.
     */
    setWordID(wordID) {
        if (Word.isValidWordID(wordID)) {
            this.wordID = wordID;
            return true;
        }
        return false;
    }
    /**
     * Getter method for word ID.
     * @returns word ID
     */
    getWordID() {
        return this.wordID;
    }
    /**
     * Setter method for word.
     * @param {*} word word
     * @returns true if word is string and is not an empty string.
     */
    setWord(word) {
        if (Word.isValidWord(word)) {
            this.word = word;
            return true;
        }
        return false;
    }
    /**
     * Getter method for word.
     * @returns word
     */
    getWord() {
        return this.word;
    }
    /**
     * Setter method for tags.
     * @param {*} tag word tag
     * @returns true if tag is a String value.
     */
    setTag(tag) {
        if (Word.isValidTag(tag)) {
            this.tag = tag;
            return true;
        }
        return false;
    }
    /**
     * Getter method for tags.
     * @returns word tag
     */
    getTag() {
        return this.tag;
    }
    /**
     * Setter method for word definition.
     * @param {*} definition word definition
     * @returns true if word definition is set correctly.
     */
    setDefinition(definition) {
        if (Word.isValidDefinition(definition)) {
            this.definition = definition;
            return true;
        }
        return false;
    }
    /**
     * Getter method for definition of word.
     * @returns word definition
     */
    getDefinition() {
        return this.definition;
    }
    /**
     * Sets example sentence of word.
     * @param {*} example example of words in sentence
     * @returns true if operation is correctly implemented
     */
    setExample(example) {
        if (Word.isValidExample(example)) {
            this.example = example;
            return true;
        }
        return false;
    }
    /**
     * Getter method for example sentences of word.
     * @returns example of word in a sentence.
     */
    getExample() {
        return this.example;
    }
    /**
     * Sets word difficulty.
     * @param {*} difficulty 
     * @returns true if difficulty is set correctly.
     */
    // Difficulty methods
    setDifficulty(difficulty) {
        if (Word.isValidDifficulty(difficulty)) {
            this.difficulty = difficulty.toLowerCase();
            return true;
        }
        return false;
    }
    /**
     * Getter method for word difficulty.
     * @returns difficulty of word
     */
    getDifficulty() {
        return this.difficulty;
    }
    /**
     * Adds word to wordlist if it is not on list and updates existing word.
     * @param {*} word 
     * @returns true if word is added to wordlist.
     */
    static addWord(word) {
        if (word instanceof Word) {
            const existingIndex = Word.wordList.findIndex(w => w.wordID === word.wordID);
            if (existingIndex !== -1) {
                Word.wordList[existingIndex] = word; // Update existing word
            } else {
                Word.wordList.push(word); // Add new word
            }
            return true;
        }
        return false;
    }
    /**
     * Delete word method.
     * @param {*} wordID ID of word.
     * @returns true if word is deleted.
     */
    static deleteWord(wordID) {
        const initialLength = Word.wordList.length;
        Word.wordList = Word.wordList.filter(word => word.wordID !== wordID);
        return Word.wordList.length !== initialLength; // Return true if a word was deleted
    }
    /**
     * Getter method for geting words through word ID.
     * @param {*} wordID ID of word
     * @returns words with a specific word ID
     */
    static getWordByID(wordID) {
        return Word.wordList.find(word => word.wordID === wordID) || null;
    }
    /**
     * Searches words by tag, word, or definition.
     * @param {*} searchTerm search phrases used to filter words.
     * @returns list of words filtered by tag, word, and definition.
     */
    static searchWords(searchTerm) {
        if (!searchTerm) return [];
        const term = searchTerm.toLowerCase();
        return Word.wordList.filter(word => 
            (word.word && word.word.toLowerCase().includes(term)) || 
            (word.definition && word.definition.toLowerCase().includes(term)) ||
            (word.tag && word.tag.toLowerCase().includes(term))
        );
    }
    /**
     * Getter method for words ranked by tag.
     * @param {*} tag word tag
     * @returns list of words filtered by tag.
     */
    static getWordsByTag(tag) {
        if (!tag) return [];
        
        const tagLower = tag.toLowerCase();
        return Word.wordList.filter(word => 
            word.tag && word.tag.toLowerCase() === tagLower
        );
    }
    /**
     * Returns list of word filtered by difficulty level.
     * @param {*} difficulty word difficulty
     * @returns list of words ranked by difficulty level.
     */
    static getWordsByDifficulty(difficulty) {
        if (!difficulty) return [];
        const difficultyLower = difficulty.toLowerCase();
        return Word.wordList.filter(word => 
            word.difficulty && word.difficulty.toLowerCase() === difficultyLower
        );
    }
    /**
     * Getter method for a random word on wordlist.
     * @returns random word from wordlist
     */
    static getRandomWord() {
        if (Word.wordList.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * Word.wordList.length);
        return Word.wordList[randomIndex];
    }
    /**
     * Getter method for random word of the day.
     * @returns random word of the day
     */
    static getWordOfTheDay() {
        // For production, use a date-based seed or pre-determined list.
        return Word.getRandomWord();
    }
    /**
     * Method to update an existing word by ID.
     * @param {*} wordID ID of word
     * @param {*} updatedData updated data for word
     * @returns true if existingw ord is successfully updated.
     */
    static updateWord(wordID, updatedData) {
        const wordToUpdate = Word.getWordByID(wordID);
        if (!wordToUpdate) return false;
        
        const { word, definition, example, tag, difficulty } = updatedData;
        
        let success = true;
        
        if (word !== undefined) {
            success = success && wordToUpdate.setWord(word);
        }
        if (definition !== undefined) {
            success = success && wordToUpdate.setDefinition(definition);
        }
        if (example !== undefined) {
            success = success && wordToUpdate.setExample(example);
        }
        if (tag !== undefined) {
            success = success && wordToUpdate.setTag(tag);
        }
        if (difficulty !== undefined) {
            success = success && wordToUpdate.setDifficulty(difficulty);
        }
        
        return success; // Return overall success status
    }
}
/**
 * Exports class for module-based environments.
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Word;
}