import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import WordOfDay from '../components/home/WordOfDay';

import {
  FaBook as RawFaBook,
  FaStar as RawFaStar,
  FaLayerGroup as RawFaLayerGroup,
  FaQuestionCircle as RawFaQuestionCircle
} from 'react-icons/fa';

const FaBook = RawFaBook as unknown as React.FC;
const FaStar = RawFaStar as unknown as React.FC;
const FaLayerGroup = RawFaLayerGroup as unknown as React.FC;
const FaQuestionCircle = RawFaQuestionCircle as unknown as React.FC;


const HomeContainer = styled.div`
  padding: 2rem 0;
`;

const Greeting = styled.div`
  margin-bottom: 2rem;
`;

const GreetingText = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #212529;
`;

const GreetingSubtext = styled.p`
  color: #6c757d;
  margin-bottom: 1rem;
`;

const LoginPrompt = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const LoginButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #212529;
  color: white;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color: #495057;
  }
`;

const SignupButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #212529;
  background-color: transparent;
  color: #212529;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color:rgba(149, 150, 150, 0.54);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FeatureCard = styled(Link)<{ $locked?: boolean }>`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: ${props => props.$locked ? '#adb5bd' : '#212529'};
  position: relative;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: ${props => props.$locked ? 'none' : 'translateY(-5px)'};
  }
`;

const FeatureLockIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #adb5bd;
  font-size: 1.25rem;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #212529;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #6c757d;
`;

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState<string>('');
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, []);
  
  return (
    <HomeContainer>
      <Greeting>
        <GreetingText>
          Good {timeOfDay}{user ? `, ${user.firstName}.` : '.'}
        </GreetingText>
        <GreetingSubtext>
          {user 
            ? 'Continue expanding your vocabulary with Lexigo.'
            : 'Welcome to Lexigo, your dictionary and vocabulary learning app.'}
        </GreetingSubtext>
        
        {!user && (
          <LoginPrompt>
            <LoginButton to="/login">Log in</LoginButton>
            <SignupButton to="/signup">Sign up</SignupButton>
          </LoginPrompt>
        )}
      </Greeting>
      
      <WordOfDay />
      
      <FeaturesGrid>
        <FeatureCard to="/dictionary">
          <FeatureIcon>
            <FaBook />
          </FeatureIcon>
          <FeatureTitle>Dictionary</FeatureTitle>
          <FeatureDescription>
            Look up any word and discover its definition, pronunciation, and usage examples.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard 
          to={user ? "/favorites" : "/login"} 
          $locked={!user}
        >
          <FeatureIcon>
            <FaStar />
          </FeatureIcon>
          <FeatureTitle>Favorites</FeatureTitle>
          <FeatureDescription>
            Save words you want to remember and review them anytime.
          </FeatureDescription>
          {!user && <FeatureLockIcon>🔒</FeatureLockIcon>}
        </FeatureCard>
        
        <FeatureCard 
          to={user ? "/flashcards" : "/login"} 
          $locked={!user}
        >
          <FeatureIcon>
            <FaLayerGroup />
          </FeatureIcon>
          <FeatureTitle>Flashcards</FeatureTitle>
          <FeatureDescription>
            Practice with flashcards to help memorize new words and their meanings.
          </FeatureDescription>
          {!user && <FeatureLockIcon>🔒</FeatureLockIcon>}
        </FeatureCard>
        
        <FeatureCard 
          to={user ? "/quiz" : "/login"} 
          $locked={!user}
        >
          <FeatureIcon>
            <FaQuestionCircle />
          </FeatureIcon>
          <FeatureTitle>Quizzes</FeatureTitle>
          <FeatureDescription>
            Test your knowledge with quizzes and track your vocabulary progress.
          </FeatureDescription>
          {!user && <FeatureLockIcon>🔒</FeatureLockIcon>}
        </FeatureCard>
      </FeaturesGrid>
    </HomeContainer>
  );
};

export default HomePage; 