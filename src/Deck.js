import Flashcard from './Flashcard.js'
/**
 * Winston Shih
 * CS 3354 Group 14-Lexigo
 * 4/14/2025
 * Deck class defines methods related to modifying or accessing a card deck in a mobil app.
 */
class Deck{
    /**
     * Constructor of Deck class.
     * @param {*} deckID ID of Deck
     * @param {*} name Name of Deck
     */
    constructor(deckID, name)
    {
        this.deckID=deckID;
        this.name=name;
        this.flashcards=[];
    }
    /**
     * Getter method for Deck
     * @param {*} deckID  ID of Deck
     * @returns  True if the Deck's ID can be found.
     */
    static getDeck(deckID)
    {
        return Deck.flashcards.find(deck => deck.deckID === deckID) || null;
    }
    /**
     * Creates Deck.
     * @param {*} deckID Deck ID
     * @param {*} name Deck name
     */
    createDeck(deckID, name)
    {
        if(Deck.flashcards.find(deck => deck.deckID === deckID))
        {
            console.log("Deck already exists!");
        }
        else
        {
            console.log("Deck successfully created!");
            Deck.flashcards.push(new Deck(deckID, name));
        }
    }
    /**
     * Deletes deck based on its deck id.
     * @param {*} deckID ID of deck
     * @param {*} name name of deck
     */
    deleteDeck(deckID, name)
    {
        const i=Deck.flashcards.find(deck => deck.deckID === deckID);
        if(i!==-1)
        {
            console.log("Deck deleted!");
            Deck.flashcards.splice(1, i)
        }
        else
        {
            console.log("Deck not found!");
        }   
    }
    /**
     * Adds flashcard to flashcards array
     * @param {*} flashcard card to be added to flashcards array.
     */
    addFlashCard(flashcard)
    {
        if(!this.flashcards.includes(flashcard)){
            this.flashcards.push(flashcard);
            console.log("Flashcard successfully added!");
        }
        else{
            console.log("Flashcard is not in deck!");
        }
    }
    /**
     * Deletes flashcard from array flashcards.
     * @param {*} flashcard card to be deleted
     */
    deleteFlashCard(flashcard)
    {
        if(this.flashcards.includes(flashcard)){
            this.flashcards.splice(this.flashcards.indexOf(flashcard), 1);
            console.log("Flashcard successfully removed!");
        }
        else{
            console.log("Flashcard is not in deck!");
        }
    }
}
/**
 * Makes sure the Flashcard class is successfully exported.
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Flashcard;
}
/**
 * Exports methods from Flashcard class.
 */
export default Flashcard;