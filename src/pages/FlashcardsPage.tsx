import React, { useState } from 'react';
import { SVGProps } from 'react';
import styled from 'styled-components';

import { FaStar as RawFaStar, FaRandom as RawFaRandom, FaRedo as RawFaRedo } from 'react-icons/fa';
const FaStar = RawFaStar as unknown as React.FC<SVGProps<SVGSVGElement>>;
const FaRandom = RawFaRandom as unknown as React.FC;
const FaRedo = RawFaRedo as unknown as React.FC;

import { useAuth } from '../hooks/useAuth';

// Types
interface Flashcard {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  isFavorite: boolean;
}

// Styled components
const FlashcardsContainer = styled.div`
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #212529;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ControlGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ControlButton = styled.button`
  background-color: #f8f9fa;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #495057;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const SelectDeck = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: white;
  font-size: 0.875rem;
`;

const FlashcardWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FlashcardContainer = styled.div`
  perspective: 1000px;
  margin-bottom: 2rem;
`;

const FlashcardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 300px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  cursor: pointer;
`;

const FlashcardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FlashcardFront = styled(FlashcardSide)`
  background-color: white;
`;

const FlashcardBack = styled(FlashcardSide)`
  background-color: white;
  transform: rotateY(180deg);
`;

const FlashcardWord = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const FlashcardPartOfSpeech = styled.p`
  color: #6c757d;
  font-style: italic;
  margin-bottom: 1rem;
`;

const FlashcardDefinition = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const FlashcardExample = styled.p`
  color: #6c757d;
  font-style: italic;
  
  &::before {
    content: '"';
  }
  
  &::after {
    content: '"';
  }
`;

const FlashcardInstructions = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 2rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto;
`;

const NavButton = styled.button`
  background-color: #212529;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #495057;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: #6c757d;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #212529;
`;

const EmptyStateText = styled.p`
  margin-bottom: 1rem;
`;

// Sample flashcard data
const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    word: 'Ephemeral',
    partOfSpeech: 'adjective',
    definition: 'Lasting for a very short time.',
    example: 'The ephemeral nature of fashion trends means what is popular today may be forgotten tomorrow.',
    isFavorite: false
  },
  {
    id: '2',
    word: 'Juxtapose',
    partOfSpeech: 'verb',
    definition: 'Place or deal with close together for contrasting effect.',
    example: 'The film juxtaposes images of great wealth with those of extreme poverty.',
    isFavorite: true
  },
  {
    id: '3',
    word: 'Ubiquitous',
    partOfSpeech: 'adjective',
    definition: 'Present, appearing, or found everywhere.',
    example: 'Smartphones have become ubiquitous in modern society.',
    isFavorite: false
  },
  {
    id: '4',
    word: 'Serendipity',
    partOfSpeech: 'noun',
    definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
    example: 'Finding that rare book was pure serendipity.',
    isFavorite: false
  },
  {
    id: '5',
    word: 'Cacophony',
    partOfSpeech: 'noun',
    definition: 'A harsh, discordant mixture of sounds.',
    example: 'The cacophony of the city rush hour traffic was overwhelming.',
    isFavorite: false
  }
];

// Available flashcard decks
const flashcardDecks = [
  { id: 'all', name: 'All Words' },
  { id: 'favorites', name: 'Favorites' },
  { id: 'common', name: 'Common Words' },
  { id: 'advanced', name: 'Advanced Words' }
];

const FlashcardsPage: React.FC = () => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);
  const [currentDeck, setCurrentDeck] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReset, setResetCards] = useState(false);
  const [isShuffled, setisShuffled] = useState(false);
  
  // Get current flashcard
  const currentFlashcard = flashcards[currentIndex];
  
  // Handle flipping the card
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Navigate to next card
  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };
  
  // Navigate to previous card
  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };
  
  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setisShuffled(true);

    // Hide the reset message after 2 seconds
    setTimeout(() => {
      setisShuffled(false);
    }, 2000);
  };
  
  // Reset cards
  const resetCards = () => {
    setFlashcards(mockFlashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setResetCards(true);

    // Hide the reset message after 2 seconds
    setTimeout(() => {
      setResetCards(false);
    }, 2000);
  };
  
  // Toggle favorite for current card
  const toggleFavorite = (id: string) => {
    const updatedFlashcards = flashcards.map(card => 
      card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
    );
    setFlashcards(updatedFlashcards);
  };
  
  // Handle deck change
  const handleDeckChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDeck(e.target.value);
    setCurrentIndex(0);
    setIsFlipped(false);
  };
  
  return (
    <FlashcardsContainer>
      <PageTitle>Flashcards</PageTitle>
      
      <ControlBar>
        <SelectDeck value={currentDeck} onChange={handleDeckChange}>
          {flashcardDecks.map(deck => (
            <option key={deck.id} value={deck.id}>
              {deck.name}
            </option>
          ))}
        </SelectDeck>
        
        <ControlGroup>
          <ControlButton onClick={shuffleCards}>
            <FaRandom /> Shuffle
          </ControlButton>
          <ControlButton onClick={resetCards}>
            <FaRedo /> Reset
          </ControlButton>
        </ControlGroup>
      </ControlBar>
      
      {flashcards.length > 0 ? (
        <>
          <FlashcardInstructions>
            {!isFlipped ? <div> Click on the card to flip it. Use the buttons below to navigate. </div> :
                          <div> Flashcard is flipped! </div> }
            {isReset && <div>Flashcards are successfully reset!</div>}
            {isShuffled && <div>Flashcards are shuffled!</div>}
            
          </FlashcardInstructions>
          
          <FlashcardWrapper>
            <FlashcardContainer onClick={flipCard}>
              <FlashcardInner $isFlipped={isFlipped}>
                <FlashcardFront>
                  <FlashcardWord>{currentFlashcard.word}</FlashcardWord>
                  <FlashcardPartOfSpeech>{currentFlashcard.partOfSpeech}</FlashcardPartOfSpeech>
                </FlashcardFront>
                <FlashcardBack>
                  <FlashcardDefinition>{currentFlashcard.definition}</FlashcardDefinition>
                  {currentFlashcard.example && (
                    <FlashcardExample>{currentFlashcard.example}</FlashcardExample>
                  )}
                </FlashcardBack>
              </FlashcardInner>
            </FlashcardContainer>
            
            <NavigationButtons>
              <NavButton 
                onClick={prevCard} 
                disabled={currentIndex === 0}
              >
                Previous
              </NavButton>
              <ControlButton 
                onClick={() => toggleFavorite(currentFlashcard.id)}
              >
                <FaStar color={currentFlashcard.isFavorite ? '#ffc107' : '#adb5bd'} /> 
                {currentFlashcard.isFavorite ? 'Favorited' : 'Add to Favorites'}
              </ControlButton>
              <NavButton 
                onClick={nextCard} 
                disabled={currentIndex === flashcards.length - 1}
              >
                Next
              </NavButton>
            </NavigationButtons>
          </FlashcardWrapper>
        </>
      ) : (
        <EmptyState>
          <EmptyStateTitle>No flashcards available</EmptyStateTitle>
          <EmptyStateText>
            There are no flashcards in the selected deck. Try selecting a different deck or creating new flashcards.
          </EmptyStateText>
        </EmptyState>
      )}
    </FlashcardsContainer>
  );
};

export default FlashcardsPage; 