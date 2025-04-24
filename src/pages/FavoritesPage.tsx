import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { getFavorites, removeFavorite } from '../firestoreFavorites';

import { FaStar as RawFaStar, FaVolumeUp as RawFaVolumeUp, FaSearch as RawFaSearch, FaSort as RawFaSort, FaSortAlphaDown as RawFaSortAlphaDown, FaSortAlphaUp as RawFaSortAlphaUp } from 'react-icons/fa';
const FaStar = RawFaStar as unknown as React.FC;
const FaVolumeUp = RawFaVolumeUp as unknown as React.FC;
const FaSearch = RawFaSearch as unknown as React.FC;
const FaSort = RawFaSort as unknown as React.FC;
const FaSortAlphaDown = RawFaSortAlphaDown as unknown as React.FC;
const FaSortAlphaUp = RawFaSortAlphaUp as unknown as React.FC;

import { useAuth } from '../hooks/useAuth';

// Types
interface FavoriteWord {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  dateAdded: string;
  lastViewed?: string;
}

// Styled components
const FavoritesContainer = styled.div`
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

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SortButton = styled.button`
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
  
  &.active {
    background-color: #e3f2fd;
    color: #212529;
  }
`;

const ResultsInfo = styled.div`
  color: #6c757d;
  font-size: 0.875rem;
`;

const WordsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const WordCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const WordInfo = styled.div`
  flex: 1;
`;

const WordHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const WordTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const PartOfSpeech = styled.span`
  color: #6c757d;
  font-style: italic;
  font-size: 0.875rem;
`;

const WordDefinition = styled.p`
  margin-bottom: 0.5rem;
`;

const WordDate = styled.div`
  color: #6c757d;
  font-size: 0.75rem;
`;

const WordActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  
  &:hover {
    color: #212529;
  }
  
  &.favorite {
    color: #ffc107;
    
    &:hover {
      color: #e0a800;
    }
  }
`;

const ViewMoreButton = styled(Link)`
  background-color: #f8f9fa;
  color: #495057;
  text-decoration: none;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e9ecef;
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
  margin-bottom: 1.5rem;
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #212529;
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
  font-weight: 500;
  
  &:hover {
    background-color: #495057;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ $isActive?: boolean }>`
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.$isActive ? '#0070f3' : '#dee2e6'};
  border-radius: 0.25rem;
  background-color: ${props => props.$isActive ? '#e3f2fd' : 'white'};
  color: ${props => props.$isActive ? '#0070f3' : '#495057'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$isActive ? '#e3f2fd' : '#f8f9fa'};
  }
  
  &:disabled {
    background-color: #f8f9fa;
    color: #adb5bd;
    cursor: not-allowed;
  }
`;

// Sample favorite words data
const mockFavoriteWords: FavoriteWord[] = [
  // Sample data would be here
];

// Format date string to readable format
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  const [favoriteWords, setFavoriteWords] = useState<FavoriteWord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'dateAdded' | 'lastViewed'>('dateAdded');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 5;
  
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const favorites = await getFavorites(user.id);
        setFavoriteWords(favorites);
      }
    };
    fetchFavorites();
  }, [user]);

  // Filter words based on search term
  const filteredWords = favoriteWords.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort words based on sort criteria
  const sortedWords = [...filteredWords].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return sortDirection === 'asc' 
        ? a.word.localeCompare(b.word)
        : b.word.localeCompare(a.word);
    } else if (sortBy === 'dateAdded') {
      return sortDirection === 'asc'
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    } else {
      // Sort by last viewed, putting words without lastViewed at the end
      if (!a.lastViewed && !b.lastViewed) return 0;
      if (!a.lastViewed) return 1;
      if (!b.lastViewed) return -1;
      
      return sortDirection === 'asc'
        ? new Date(a.lastViewed).getTime() - new Date(b.lastViewed).getTime()
        : new Date(b.lastViewed).getTime() - new Date(a.lastViewed).getTime();
    }
  });
  
  // Paginate words
  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = sortedWords.slice(indexOfFirstWord, indexOfLastWord);
  const totalPages = Math.ceil(sortedWords.length / wordsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Handle sort change
  const handleSortChange = (sortCriteria: 'alphabetical' | 'dateAdded' | 'lastViewed') => {
    if (sortBy === sortCriteria) {
      // Toggle direction if clicking the same criteria
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new criteria and reset direction
      setSortBy(sortCriteria);
      setSortDirection('desc');
    }
  };
  
  // Handle removing from favorites
  const handleRemoveFavorite = async (id: string) => {
    if (user) {
      await removeFavorite(user.id, id);
      setFavoriteWords(prev => prev.filter(word => word.id !== id));
    }
  };
  
  // Handle playing pronunciation
  const playPronunciation = (word: string) => {
    console.log('Playing pronunciation for:', word);
  };
  
  // Render pagination controls
  const renderPagination = () => {
    const pageNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageButton
          key={i}
          $isActive={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }
    
    return (
      <Pagination>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </PageButton>
        {pageNumbers}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </PageButton>
      </Pagination>
    );
  };
  
  return (
    <FavoritesContainer>
      <PageTitle>Your Favorite Words</PageTitle>
      
      {favoriteWords.length > 0 ? (
        <>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search your favorite words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          
          <ControlBar>
            <div>
              <SortButton
                className={sortBy === 'alphabetical' ? 'active' : ''}
                onClick={() => handleSortChange('alphabetical')}
              >
                {sortBy === 'alphabetical' && sortDirection === 'asc' ? (
                  <FaSortAlphaDown />
                ) : sortBy === 'alphabetical' && sortDirection === 'desc' ? (
                  <FaSortAlphaUp />
                ) : (
                  <FaSort />
                )}
                Alphabetical
              </SortButton>
              <SortButton
                className={sortBy === 'dateAdded' ? 'active' : ''}
                onClick={() => handleSortChange('dateAdded')}
                style={{ marginLeft: '0.5rem' }}
              >
                <FaSort />
                Date Added
              </SortButton>
              <SortButton
                className={sortBy === 'lastViewed' ? 'active' : ''}
                onClick={() => handleSortChange('lastViewed')}
                style={{ marginLeft: '0.5rem' }}
              >
                <FaSort />
                Last Viewed
              </SortButton>
            </div>
            
            <ResultsInfo>
              Showing {indexOfFirstWord + 1}-{Math.min(indexOfLastWord, sortedWords.length)} of {sortedWords.length} words
            </ResultsInfo>
          </ControlBar>
          
          <WordsList>
            {currentWords.map(word => (
              <WordCard key={word.id}>
                <WordInfo>
                  <WordHeader>
                    <WordTitle>{word.word}</WordTitle>
                    <PartOfSpeech>{word.partOfSpeech}</PartOfSpeech>
                  </WordHeader>
                  <WordDefinition>{word.definition}</WordDefinition>
                  <WordDate>
                    Added on {formatDate(word.dateAdded)}
                    {word.lastViewed && ` • Last viewed on ${formatDate(word.lastViewed)}`}
                  </WordDate>
                </WordInfo>
                
                <WordActions>
                  <ActionButton onClick={() => playPronunciation(word.word)} title="Listen to pronunciation">
                    <FaVolumeUp />
                  </ActionButton>
                  <ActionButton 
                    className="favorite"
                    onClick={() => handleRemoveFavorite(word.id)}
                    title="Remove from favorites"
                  >
                    <FaStar />
                  </ActionButton>
                  <ViewMoreButton to={`/dictionary?word=${encodeURIComponent(word.word)}`}>
                    View
                  </ViewMoreButton>
                </WordActions>
              </WordCard>
            ))}
          </WordsList>
          
          {totalPages > 1 && renderPagination()}
        </>
      ) : (
        <EmptyState>
          <EmptyStateTitle>No favorite words yet</EmptyStateTitle>
          <EmptyStateText>
            Start exploring the dictionary and add words to your favorites.
          </EmptyStateText>
          <ExploreButton to="/dictionary">
            Explore Dictionary
          </ExploreButton>
        </EmptyState>
      )}
    </FavoritesContainer>
  );
};

export default FavoritesPage; 