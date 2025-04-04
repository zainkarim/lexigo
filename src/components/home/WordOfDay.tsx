import React, { useState } from 'react';
import styled from 'styled-components';

import { FaStar as RawFaStar, FaVolumeUp as RawFaVolumeUp } from 'react-icons/fa';
const FaStar = RawFaStar as unknown as React.FC;
const FaVolumeUp = RawFaVolumeUp as unknown as React.FC;

import { useAuth } from '../../hooks/useAuth';

// Types for word data
interface WordDefinition {
  definition: string;
  example?: string;
}

interface WordOfDayData {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definitions: WordDefinition[];
  date: string;
}

// Styled components
const WordCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
`;

const CardDate = styled.span`
  color: #6c757d;
  font-size: 0.875rem;
`;

const WordHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const WordTitle = styled.div`
  display: flex;
  align-items: center;
`;

const Word = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-right: 0.75rem;
`;

const Pronunciation = styled.span`
  color: #6c757d;
  font-style: italic;
  margin-right: 0.5rem;
`;

const AudioButton = styled.button`
  background: none;
  border: none;
  color: #0070f3;
  cursor: pointer;
  font-size: 1.25rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$isFavorite ? '#ffc107' : '#adb5bd'};
  cursor: pointer;
  font-size: 1.25rem;
  
  &:hover {
    color: ${props => props.$isFavorite ? '#e0a800' : '#6c757d'};
  }
`;

const PartOfSpeech = styled.div`
  color: #6c757d;
  font-style: italic;
  margin-bottom: 1rem;
`;

const DefinitionsList = styled.div`
  margin-top: 1rem;
`;

const DefinitionItem = styled.div`
  margin-bottom: 1rem;
`;

const Definition = styled.p`
  margin-bottom: 0.5rem;
`;

const Example = styled.p`
  color: #6c757d;
  font-style: italic;
  margin-left: 1rem;
  
  &::before {
    content: '"';
  }
  
  &::after {
    content: '"';
  }
`;

// Sample data for word of the day
const mockWordOfDay: WordOfDayData = {
  word: 'Ephemeral',
  pronunciation: '/ɪˈfɛm(ə)rəl/',
  partOfSpeech: 'adjective',
  definitions: [
    {
      definition: 'Lasting for a very short time.',
      example: 'Ephemeral pleasures.'
    },
    {
      definition: '(of a plant) Having a very short life cycle.'
    }
  ],
  date: 'Wednesday, March 26'
};

const WordOfDay: React.FC = () => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [wordData] = useState<WordOfDayData>(mockWordOfDay);
  
  const toggleFavorite = () => {
    if (user) {
      setIsFavorite(!isFavorite);
    }
  };
  
  const playPronunciation = () => {
    console.log('Playing pronunciation for:', wordData.word);
  };
  
  return (
    <WordCard>
      <CardHeader>
        <CardTitle>Word of the Day</CardTitle>
        <CardDate>{wordData.date}</CardDate>
      </CardHeader>
      
      <WordHeader>
        <WordTitle>
          <Word>{wordData.word}</Word>
          <Pronunciation>{wordData.pronunciation}</Pronunciation>
          <AudioButton onClick={playPronunciation} title="Listen to pronunciation">
            <FaVolumeUp />
          </AudioButton>
        </WordTitle>
        
        <Actions>
          <FavoriteButton 
            onClick={toggleFavorite} 
            $isFavorite={isFavorite}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            disabled={!user}
          >
            <FaStar />
          </FavoriteButton>
        </Actions>
      </WordHeader>
      
      <PartOfSpeech>{wordData.partOfSpeech}</PartOfSpeech>
      
      <DefinitionsList>
        {wordData.definitions.map((def, index) => (
          <DefinitionItem key={index}>
            <Definition>{index + 1}. {def.definition}</Definition>
            {def.example && <Example>{def.example}</Example>}
          </DefinitionItem>
        ))}
      </DefinitionsList>
    </WordCard>
  );
};

export default WordOfDay; 