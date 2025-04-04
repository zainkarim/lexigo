import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SVGProps } from 'react';
import { useAuth } from '../hooks/useAuth';

import {
  FaTrophy as RawFaTrophy,
  FaClock as RawFaClock,
  FaRedo as RawFaRedo
} from 'react-icons/fa';

const FaTrophy = RawFaTrophy as unknown as React.FC<SVGProps<SVGSVGElement>>;
const FaClock = RawFaClock as unknown as React.FC;
const FaRedo = RawFaRedo as unknown as React.FC;

// Types
interface QuizQuestion {
  id: string;
  word: string;
  options: string[];
  correctAnswer: string;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  date: string;
}

// Styled components
const QuizContainer = styled.div`
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #212529;
`;

const QuizCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 0 auto 2rem;
`;

const QuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const QuizProgress = styled.div`
  font-size: 1rem;
  color: #6c757d;
`;

const QuizTimer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #6c757d;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const OptionButton = styled.button<{ 
  $isSelected?: boolean; 
  $isCorrect?: boolean; 
  $isIncorrect?: boolean; 
  $isDisabled?: boolean;
}>`
  padding: 1rem;
  border: 1px solid ${props => {
    if (props.$isCorrect) return '#28a745';
    if (props.$isIncorrect) return '#dc3545';
    if (props.$isSelected) return '#0070f3';
    return '#dee2e6';
  }};
  background-color: ${props => {
    if (props.$isCorrect) return '#d4edda';
    if (props.$isIncorrect) return '#f8d7da';
    if (props.$isSelected) return '#e3f2fd';
    return 'white';
  }};
  border-radius: 0.25rem;
  text-align: left;
  font-size: 1rem;
  cursor: ${props => props.$isDisabled ? 'default' : 'pointer'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => {
      if (props.$isDisabled) {
        if (props.$isCorrect) return '#d4edda';
        if (props.$isIncorrect) return '#f8d7da';
        if (props.$isSelected) return '#e3f2fd';
        return 'white';
      }
      return '#f1f3f5';
    }};
  }
`;

const NextButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  
  &:hover {
    background-color: #0051a8;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const QuizTypesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const QuizTypeCard = styled.button`
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #0070f3;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const QuizTypeTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #212529;
`;

const QuizTypeDescription = styled.p`
  color: #6c757d;
  margin-bottom: 1rem;
`;

const QuizStatsContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 2rem auto;
  text-align: center;
`;

const ResultTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #212529;
`;

const ResultScore = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #0070f3;
  margin-bottom: 1.5rem;
`;

const ResultStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #212529;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #0051a8;
  }
`;

// Sample quiz questions
const mockQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    word: 'Ephemeral',
    options: ['Lasting for a short time', 'Very important', 'Extremely loud', 'Deeply moving'],
    correctAnswer: 'Lasting for a short time'
  },
  {
    id: '2',
    word: 'Ubiquitous',
    options: ['Very rare', 'Found everywhere', 'Extremely large', 'Highly toxic'],
    correctAnswer: 'Found everywhere'
  },
  {
    id: '3',
    word: 'Serendipity',
    options: ['Pure luck', 'Deep sadness', 'Finding something good without looking for it', 'A type of tropical flower'],
    correctAnswer: 'Finding something good without looking for it'
  },
  {
    id: '4',
    word: 'Mellifluous',
    options: ['Full of hatred', 'Sweet-sounding', 'Extremely difficult', 'Causing nausea'],
    correctAnswer: 'Sweet-sounding'
  },
  {
    id: '5',
    word: 'Cacophony',
    options: ['A type of instrument', 'Pleasant melody', 'A harsh mixture of sounds', 'A religious ceremony'],
    correctAnswer: 'A harsh mixture of sounds'
  }
];

// Quiz types
const quizTypes = [
  {
    id: 'vocab',
    title: 'Vocabulary Basics',
    description: 'Test your knowledge of fundamental vocabulary words.',
    questions: 10
  },
  {
    id: 'advanced',
    title: 'Advanced Words',
    description: 'Challenge yourself with advanced and uncommon words.',
    questions: 15
  },
  {
    id: 'synonyms',
    title: 'Synonyms & Antonyms',
    description: 'Test your knowledge of word relationships.',
    questions: 12
  }
];

// Format time function
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [activeQuizType, setActiveQuizType] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  
  // Start timer when quiz begins
  useEffect(() => {
    if (quizStarted && !quizFinished) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      setTimerInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [quizStarted, quizFinished]);
  
  // Start a quiz
  const handleStartQuiz = (quizTypeId: string) => {
    setQuizStarted(true);
    setActiveQuizType(quizTypeId);
    setQuestions(mockQuizQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setShowAnswer(false);
    setScore(0);
    setTimer(0);
  };
  
  // Handle option selection
  const handleOptionSelect = (option: string) => {
    if (!showAnswer) {
      setSelectedOption(option);
    }
  };
  
  // Check answer and show result
  const handleCheckAnswer = () => {
    setShowAnswer(true);
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };
  
  // Move to next question or finish quiz
  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      // Finish quiz
      if (timerInterval) clearInterval(timerInterval);
      setQuizFinished(true);
      
      // Create result object
      const result: QuizResult = {
        score,
        totalQuestions: questions.length,
        timeSpent: timer,
        date: new Date().toISOString()
      };
      setQuizResult(result);
    } else {
      // Next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
      setShowAnswer(false);
    }
  };
  
  // Restart quiz with same settings
  const handleRestartQuiz = () => {
    setQuizFinished(false);
    setQuestions(mockQuizQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setShowAnswer(false);
    setScore(0);
    setTimer(0);
  };
  
  // Go back to quiz selection
  const handleNewQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setActiveQuizType('');
  };
  
  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <QuizContainer>
      <PageTitle>Quizzes</PageTitle>
      
      {!quizStarted ? (
        // Quiz selection screen
        <QuizTypesContainer>
          {quizTypes.map(quizType => (
            <QuizTypeCard 
              key={quizType.id}
              onClick={() => handleStartQuiz(quizType.id)}
            >
              <QuizTypeTitle>{quizType.title}</QuizTypeTitle>
              <QuizTypeDescription>{quizType.description}</QuizTypeDescription>
              <QuizTypeDescription>{quizType.questions} questions</QuizTypeDescription>
            </QuizTypeCard>
          ))}
        </QuizTypesContainer>
      ) : !quizFinished ? (
        // Active quiz
        <QuizCard>
          <QuizHeader>
            <QuizProgress>
              Question {currentQuestionIndex + 1} of {questions.length}
            </QuizProgress>
            <QuizTimer>
              <FaClock /> {formatTime(timer)}
            </QuizTimer>
          </QuizHeader>
          
          <QuestionText>{currentQuestion.word}</QuestionText>
          
          <OptionsList>
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={index}
                $isSelected={selectedOption === option}
                $isCorrect={showAnswer && option === currentQuestion.correctAnswer}
                $isIncorrect={showAnswer && selectedOption === option && option !== currentQuestion.correctAnswer}
                $isDisabled={showAnswer}
                onClick={() => handleOptionSelect(option)}
                disabled={showAnswer}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsList>
          
          {showAnswer ? (
            <NextButton onClick={handleNextQuestion}>
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </NextButton>
          ) : (
            <NextButton 
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
            >
              Check Answer
            </NextButton>
          )}
        </QuizCard>
      ) : (
        // Quiz results
        <QuizStatsContainer>
          <ResultTitle>Quiz Results</ResultTitle>
          <ResultScore>
            {score}/{quizResult?.totalQuestions}
          </ResultScore>
          
          <ResultStats>
            <StatItem>
              <StatValue>{Math.round((score / quizResult!.totalQuestions) * 100)}%</StatValue>
              <StatLabel>Accuracy</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{formatTime(quizResult!.timeSpent)}</StatValue>
              <StatLabel>Time Spent</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>
                <FaTrophy style={{ color: '#ffc107' }} />
              </StatValue>
              <StatLabel>
                {score === quizResult?.totalQuestions ? 'Perfect Score!' : 
                  score >= quizResult!.totalQuestions * 0.8 ? 'Great Job!' : 
                  score >= quizResult!.totalQuestions * 0.6 ? 'Good Effort!' : 
                  'Keep Practicing!'}
              </StatLabel>
            </StatItem>
          </ResultStats>
          
          <div>
            <ActionButton onClick={handleRestartQuiz} style={{ marginRight: '1rem' }}>
              <FaRedo /> Try Again
            </ActionButton>
            <ActionButton onClick={handleNewQuiz}>
              New Quiz
            </ActionButton>
          </div>
        </QuizStatsContainer>
      )}
    </QuizContainer>
  );
};

export default QuizPage; 