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
        isFlipped:false
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
                false
            )
        };
    });
    beforeEach(()=>{
        flashcard=new Flashcard();
    });
    describe('Mastery Functionality', () => {
        test('TC1: Five or more correct attempts and zero incorrect attempts', () => {
            const result = Flashcard.hasMastered(5, 0);
            expect(result).toBe("You successfully mastered this word!");
        });

        test('TC2: Less than five correct attempts', () => {
            const result = Flashcard.hasMastered(3, 0);
            expect(result).toBe("Tou still need more correct attempts to achieve mastery!");
        });

        test('TC3: One or more incorrect attempts', () => {
            const result = Flashcard.hasMastered(6, 1);
            expect(result).toBe("You need to practice more to achieve mastery!");
        });

        test('TC4: Less than five correct attempts and more than zero incorrect attempts', () => {
            const result = Flashcard.hasMastered(4, 2);
            expect(result).toBe("You need more correct attempts and less incorrect attempts to master this word!");
        });
    });
    test('TC5: Flipped Functionality', () => {
        const result = Flashcard.flip(
            true
        );
        expect(result).toBe("Flashcard is flipped!");
    });
    test('TC6: Flipped Functionality', () => {
        const result = Flashcard.flip(
            false
        );
        expect(result).toBe("Click on the card to flip it. Use the buttons below to navigate.");
    });
    test('TC7: Reset Functionality', () => {
        const result = Flashcard.reset(
            0,
            0,
            false
        );
        expect(result).toBe("Flashcard attempts is successfully reset!");
    });
    test('TC8: Correct attempts count is not reset', () => {
        const result = Flashcard.reset(
            3,
            0,
            false
        );
        expect(result).toBe("Flashcard attempts is not successfully reset!");
    });
    test('TC9: Incorrect attempts count is not reset', () => {
        const result = Flashcard.reset(
            0,
            4,
            false
        );
        expect(result).toBe("Flashcard attempts is not successfully reset!");
    });
    test('TC10: Flipped is true', () => {
        const result = Flashcard.reset(
            0,
            0,
            true
        );
        expect(result).toBe("Flashcard attempts is not successfully reset!");
    });
    test('TC11: Flipped is true and correct and incorrect attempts are nonzero', () => {
        const result = Flashcard.reset(
            9,
            7,
            true
        );
        expect(result).toBe("Flashcard attempts is not successfully reset!");
    });
    test('TC12: Correct and incorrect attempts are nonzero.', () => {
        const result = Flashcard.reset(
            1,
            1,
            false
        );
        expect(result).toBe("Flashcard attempts is not successfully reset!");
    });
    test('TC13: Flipped is true and correct attempts is nonzero', () => {
        const result = Flashcard.reset(
            8,
            0,
            true
        );
        expect(result).toBe("Flashcard attempts is not successfully reset!");
    });
    test('TC14: Flipped is true amd incorrect attempts is non zero.', () => {
        const result = Flashcard.reset(
            0,
            23,
            true
        );
        expect(result).toBe("Flashcard attempts is not successfully reset!");
    });
});
