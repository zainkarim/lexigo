import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch as RawFaSearch, FaVolumeUp as RawFaVolumeUp, FaStar as RawFaStar } from 'react-icons/fa';

const FaSearch = RawFaSearch as unknown as React.FC;
const FaVolumeUp = RawFaVolumeUp as unknown as React.FC;
const FaStar = RawFaStar as unknown as React.FC;
import WordClass from '../Word';

import { useAuth } from '../hooks/useAuth';

// Types for dictionary data
interface WordDefinition {
  definition: string;
  example?: string;
}

interface DictionaryWordData {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definitions: WordDefinition[];
  audioUrl?: string;
}

// Styled components
const DictionaryContainer = styled.div`
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #212529;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: #212529;
    box-shadow: 0 0 0 0.2rem rgba(73, 80, 87, 0.48);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  font-size: 1.25rem;
`;

const RecentSearches = styled.div`
  margin-top: 1rem;
`;

const RecentSearchesTitle = styled.h4`
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

const RecentSearchTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SearchTag = styled.button`
  background-color: #f1f3f5;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #495057;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
`;

const ResultCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  color: #212529;
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

// Sample data for search results
const mockWordData: DictionaryWordData = {
  word: 'Software',
  pronunciation: '/ˈsɔːftweə/',
  partOfSpeech: 'noun',
  definitions: [
    {
      definition: 'The programs and other operating information used by a computer.',
      example: 'The report stated that a "software issue" was causing the custody images to be captured at a lower than recommended minimum size.'
    },
    {
      definition: 'Anything that is not hardware but is used with hardware, especially audiovisual materials, as film, tapes, records, etc.',
      example: 'Screen captures of travel data found on a hard drive belonging to cell leader Roussev were from airline industry software known as "Amadeus".'
    }
  ]
};

// Sample recent searches
const mockRecentSearches = ['Algorithm', 'Code', 'Engineer', 'Software', 'Programming'];

const DictionaryPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<DictionaryWordData | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(mockRecentSearches);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);

    const lengthError = WordClass.checkWord_Length(searchTerm);
    if (lengthError !== "Word is valid") {
      setError("Word must be between 1 and 50 characters");
      setLoading(false);
      return;
    }

    const specialCharError = WordClass.checkSpecialCharacters(searchTerm);
    if (specialCharError) {
      setError("Invalid characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
      if (!response.ok) throw new Error('Word not found');
  
      const data = await response.json();
      const entry = data[0];
      const meanings = entry.meanings[0]; // Just grabbing the first meaning for simplicity
      const phonetic = entry.phonetic || entry.phonetics?.[0]?.text || '';
      const audioUrl = entry.phonetics?.find((p: any) => p.audio)?.audio;
  
      const wordData: DictionaryWordData = {
        word: entry.word,
        pronunciation: phonetic,
        partOfSpeech: meanings.partOfSpeech,
        definitions: meanings.definitions.map((d: any) => ({
          definition: d.definition,
          example: d.example,
        })),
        audioUrl,
      };
  
      setSearchResult(wordData);
  
      // Update recent searches
      if (!recentSearches.includes(term)) {
        const updatedSearches = [term, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
      }
    } catch (error: any) {
      console.error(error);
      setSearchResult(null);
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };
  
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    handleSearch(term);
  };
  
  const toggleFavorite = () => {
    if (user) {
      setIsFavorite(!isFavorite);
    }
  };
  
  const playPronunciation = () => {
    if (searchResult?.audioUrl) {
      const audio = new Audio(searchResult.audioUrl);
      audio.play();
    }
  };  
  
  return (
    <DictionaryContainer>
      <PageTitle>Dictionary</PageTitle>
      
      <SearchContainer>
        <form onSubmit={handleSubmit}>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search for a word..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        
        {recentSearches.length > 0 && (
          <RecentSearches>
            <RecentSearchesTitle>Recent Searches</RecentSearchesTitle>
            <RecentSearchTags>
              {recentSearches.map((term, index) => (
                <SearchTag
                  key={index}
                  onClick={() => handleRecentSearchClick(term)}
                >
                  {term}
                </SearchTag>
              ))}
            </RecentSearchTags>
          </RecentSearches>
        )}
      </SearchContainer>
      
      <ResultContainer>
      {loading ? (
        <EmptyState>
          <EmptyStateTitle>Searching…</EmptyStateTitle>
          <EmptyStateText>Hang tight while we look that up for you.</EmptyStateText>
        </EmptyState>
      ) : error ? (
        <EmptyState>
          <EmptyStateTitle>Oops!</EmptyStateTitle>
          <EmptyStateText>{error}</EmptyStateText>
        </EmptyState>
      ) : searchResult ? (
        <ResultCard>
          <WordHeader>
            <WordTitle>
              <Word>{searchResult.word}</Word>
              <Pronunciation>{searchResult.pronunciation}</Pronunciation>
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

          <PartOfSpeech>{searchResult.partOfSpeech}</PartOfSpeech>

          <DefinitionsList>
            {searchResult.definitions.map((def, index) => (
              <DefinitionItem key={index}>
                <Definition>{index + 1}. {def.definition}</Definition>
                {def.example && <Example>{def.example}</Example>}
              </DefinitionItem>
            ))}
          </DefinitionsList>
        </ResultCard>
      ) : (
        <EmptyState>
          <EmptyStateTitle>Looking for a word?</EmptyStateTitle>
          <EmptyStateText>
            Type a word in the search box above to see its definition.
          </EmptyStateText>
        </EmptyState>
      )}

      </ResultContainer>
    </DictionaryContainer>
  );
};

export default DictionaryPage; 
