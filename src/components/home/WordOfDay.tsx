import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaStar as RawFaStar, FaVolumeUp as RawFaVolumeUp } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
// @ts-ignore
import wordPool from '../../data/word_pool.json';

const FaStar = RawFaStar as unknown as React.FC;
const FaVolumeUp = RawFaVolumeUp as unknown as React.FC;

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
  audioUrl?: string;
}

// Styled components
const WordCard = styled.div`background: white; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);`;
const CardHeader = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;`;
const CardTitle = styled.h3`font-size: 1.25rem; font-weight: 600; color: #212529;`;
const CardDate = styled.span`color: #6c757d; font-size: 0.875rem;`;
const WordHeader = styled.div`display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;`;
const WordTitle = styled.div`display: flex; align-items: center;`;
const Word = styled.h2`font-size: 2rem; font-weight: 700; margin-right: 0.75rem;`;
const Pronunciation = styled.span`color: #6c757d; font-style: italic; margin-right: 0.5rem;`;
const AudioButton = styled.button`background: none; border: none; color: #0070f3; cursor: pointer; font-size: 1.25rem;`;
const Actions = styled.div`display: flex; align-items: center;`;
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
const PartOfSpeech = styled.div`color: #6c757d; font-style: italic; margin-bottom: 1rem;`;
const DefinitionsList = styled.div`margin-top: 1rem;`;
const DefinitionItem = styled.div`margin-bottom: 1rem;`;
const Definition = styled.p`margin-bottom: 0.5rem;`;
const Example = styled.p`
  color: #6c757d;
  font-style: italic;
  margin-left: 1rem;
  &::before { content: '"'; }
  &::after { content: '"'; }
`;

const WordOfDay: React.FC = () => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [wordData, setWordData] = useState<WordOfDayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const selectedWord = wordPool[dayOfYear % wordPool.length];

      const cacheKey = `wordOfTheDay-${today.toDateString()}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setWordData(JSON.parse(cached));
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`);
        if (!res.ok) throw new Error('Failed to fetch word');

        const data = await res.json();
        const entry = data[0];
        const meanings = entry.meanings[0];
        const phonetic = entry.phonetic || entry.phonetics?.[0]?.text || '';
        const audioUrl = entry.phonetics?.find((p: any) => p.audio)?.audio;

        const formatted: WordOfDayData = {
          word: entry.word,
          pronunciation: phonetic,
          partOfSpeech: meanings.partOfSpeech,
          definitions: meanings.definitions.map((d: any) => ({
            definition: d.definition,
            example: d.example,
          })),
          date: today.toDateString(),
          audioUrl,
        };

        localStorage.setItem(cacheKey, JSON.stringify(formatted));
        setWordData(formatted);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchWordOfTheDay();
  }, []);

  const toggleFavorite = () => {
    if (user) {
      setIsFavorite(!isFavorite);
    }
  };

  const playPronunciation = () => {
    if (wordData?.audioUrl) {
      new Audio(wordData.audioUrl).play();
    } else if (wordData?.word && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      alert('No pronunciation audio available for this word.');
    }
  };

  if (loading) {
    return (
      <WordCard>
        <CardHeader>
          <CardTitle>Word of the Day</CardTitle>
          <CardDate>Loading...</CardDate>
        </CardHeader>
      </WordCard>
    );
  }

  if (error || !wordData) {
    return (
      <WordCard>
        <CardHeader>
          <CardTitle>Word of the Day</CardTitle>
          <CardDate>Unavailable</CardDate>
        </CardHeader>
        <p>{error || 'Unable to fetch the word for today.'}</p>
      </WordCard>
    );
  }

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
          <AudioButton
            onClick={playPronunciation}
            title={wordData?.audioUrl ? "Listen to pronunciation" : "Speak pronunciation"}
          >
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
