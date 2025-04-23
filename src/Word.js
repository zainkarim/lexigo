class Word {
    static MIN_LENGTH_WORD = 1;
    static MAX_LENGTH_WORD = 50;
    
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

    static checkWord_Length(word){
        //Check if the userID length is greater than 1 and less than 50

        if (word.length < this.MIN_LENGTH_WORD){
            return "Word must be at least 1 character";
        }
        else if(word.length > this.MAX_LENGTH_WORD){
            return "Word is too long";
        }
        return "Word is valid"
    }

    static checkSpecialCharacters(word) {
        // Check if the word contains special characters
        return /[^a-zA-Z0-9]/.test(word);
    }
    

    /**
     * Sets word ID to a numeric non-zero value.
     * @param {*} wordID id of word
     * @returns true if ID is a number and is greater than 0.
     */
    setWordID(wordID) {
        if (typeof wordID === 'number' && wordID >= 0) {
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
        if (typeof word === 'string' && word.trim() !== '') {
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
        if (typeof tag === 'string') {
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
        if (typeof definition === 'string' && definition.trim() !== '') {
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
        if (typeof example === 'string') {
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
        const validDifficulties = ['easy', 'medium', 'hard'];
        if (validDifficulties.includes(difficulty.toLowerCase())) {
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
            return {
                success: true,
                message: 'Successfully added word'
            };

        }
        else if (word === '') {
            return {
                success: false,
                message: 'Failed to add word'
            };
        }
        else {
            return {
                success: false,
                message: 'Please enter a valid word'
            };
        }

    }
    /**
     * Delete word method.
     * @param {*} wordID ID of word.
     * @returns true if word is deleted.
     */
    static deleteWord(wordID) {
        const initialLength = Word.wordList.length;
        Word.wordList = Word.wordList.filter(word => word.wordID !== wordID);
        if (Word.wordList.length !== initialLength) {
            return {
              success: true,
              message: 'Deleted word successfully'
            };
        }
        else if (wordID === '') {
            return {
                success: false,
                message: 'Word not found'
            };
        }
        else {
            return {
                success: false,
                message: 'Please enter a valid word'
            };
        }

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
        if (searchTerm === '') {
            return {
                success: false,
                message: 'Failed to search for word'
            };
        }
        else if (typeof searchTerm !== 'string' || searchTerm.length <= 2 || !/^[a-zA-Z]+$/.test(searchTerm)) {
            return {
                success: false,
                message: 'Please enter a valid word'
            };
        }
        else {
            const term = searchTerm.toLowerCase();
            const matchedWords = Word.wordList.filter(word =>
                (word.word && word.word.toLowerCase().includes(term)) ||
                (word.definition && word.definition.toLowerCase().includes(term)) ||
                (word.tag && word.tag.toLowerCase().includes(term))
            );
            return {
                success: true,
                message: `Successfully found word: ${searchTerm}`,
                words: matchedWords
            };
        }
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
        if (word !== undefined) wordToUpdate.setWord(word);
        if (definition !== undefined) wordToUpdate.setDefinition(definition);
        if (example !== undefined) wordToUpdate.setExample(example);
        if (tag !== undefined) wordToUpdate.setTag(tag);
        if (difficulty !== undefined) wordToUpdate.setDifficulty(difficulty);
        return true; // Successfully updated
    }
}
/**
 * Exports class for module-based environments.
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Word;
}

export default Word;
