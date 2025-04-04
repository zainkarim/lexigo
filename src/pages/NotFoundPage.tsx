import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';

// Styled components
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const StatusCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: #0070f3;
  margin: 0;
  line-height: 1;
  
  @media (max-width: 576px) {
    font-size: 6rem;
  }
`;

const NotFoundTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #212529;
  margin: 1rem 0 2rem;
  
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

const NotFoundDescription = styled.p`
  font-size: 1.1rem;
  color: #6c757d;
  max-width: 600px;
  margin-bottom: 2.5rem;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

// Define TypeScript interface for the custom props
interface ActionButtonProps {
  $isPrimary?: boolean;
}

const ActionButton = styled(Link)<ActionButtonProps>`
  display: inline-flex;
  align-items: center;
  background-color: ${props => props.$isPrimary ? '#0070f3' : '#f8f9fa'};
  color: ${props => props.$isPrimary ? 'white' : '#495057'};
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.$isPrimary ? '#0051a8' : '#e9ecef'};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <StatusCode>404</StatusCode>
      <NotFoundTitle>Page Not Found</NotFoundTitle>
      <NotFoundDescription>
        Oops! The page you're looking for doesn't exist or has been moved. 
        It might have been mistyped, or perhaps you were searching for a word 
        that's not in our dictionary yet.
      </NotFoundDescription>
      
      <ActionContainer>
        <ActionButton to="/" $isPrimary>
          <FaHome />
          Go to Home
        </ActionButton>
        <ActionButton to="/dictionary">
          <FaSearch />
          Search Dictionary
        </ActionButton>
        <ActionButton to="/favorites">
          <FaBook />
          Browse Favorites
        </ActionButton>
      </ActionContainer>
    </NotFoundContainer>
  );
};

export default NotFoundPage; 