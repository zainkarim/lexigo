/**
 * Winston Shih
 * CS 3354 Group 14 Lexigo
 * Phase 5 Flashcard Use Case Class
 */
const Flashcard=require('./Flashcard');
describe('Flashcard System', ()=>{
    let flashcard;
    const validFlashcard={
        id:190012,
        word:"Capitulate",
        definition:"Cease to resist an opponent or an unwelcome demand; surrender.",
        example:"Steve Rogers refused to capitulate to Tony Stark.",
        tag:"verb",
        correctCount:0,
        incorrectCount:0,
        isFlipped:false,
        isShuffled: false
    };
    beforeAll(()=>{
        Flashcard.flashcarddb={
            190012: new Flashcard(
                "Capitulate",
                "Cease to resist an opponent or an unwelcome demand; surrender.",
                "Steve Rogers refused to capitulate to Tony Stark.",
                "verb",
                0,
                0,
                false, 
                false
            )
        };
    });
    beforeEach(()=>{
        flashcard=new Flashcard();
    });
    test('TC1: Correct Shuffle Functionality', () => {
        Flashcard.flashcarddb = {
            1: new Flashcard("Alpha", "First", "Ex", "noun", 0, 0, false, false),
            2: new Flashcard("Beta", "Second", "Ex", "noun", 0, 0, false, false),
            3: new Flashcard("Gamma", "Third", "Ex", "noun", 0, 0, false, false),
        };
    
        const result = Flashcard.shuffle();
        expect(result).toBe("Flashcards successfully shuffled!");
    });
    
    test('TC2: Shuffle With Only One Flashcard (Should Fail Gracefully)', () => {
        Flashcard.flashcarddb = {
            1: new Flashcard("Solo", "Only one", "Ex", "noun", 0, 0, false, false)
        };
    
        const result = Flashcard.shuffle();
        expect(result).toBe("Not enough flashcards to shuffle!");
    });
    
    test('TC3: Flipped Functionality', () => {
        const result = Flashcard.flip(
            true
        );
        expect(result).toBe("Flashcard is flipped!");
    });
    test('TC4: Flipped Functionality', () => {
        const result = Flashcard.flip(
            false
        );
        expect(result).toBe("Click on the card to flip it. Use the buttons below to navigate.");
    });
    test('TC5: Correct Reset Functionality', () => {
        const result = Flashcard.reset(
            0,
            0,
            false
        );
        expect(result).toBe("Flashcards successfully reset!");
    });
    test('TC6: Incorrect Reset Functionality', () => {
        const result = Flashcard.reset(
            3,
            0,
            false
        );
        expect(result).toBe("Flashcards are not successfully reset!");
    });
    
});
