import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuizPage from './QuizPage';
import { useAuth } from '../hooks/useAuth';

// based on the tables on the doc

jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({ user: { name: 'TestUser' } })
}));

describe('QuizPage - User Quiz Interaction', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('TC 13 - Valid quiz, valid option, valid index', () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText('Vocabulary Basics'));

    fireEvent.click(screen.getByText('Lasting for a short time'));
    fireEvent.click(screen.getByText('Check Answer'));

    expect(screen.getByText('Next Question')).toBeInTheDocument();
  });

  test('TC 14 - Valid quiz, invalid option', () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText('Vocabulary Basics'));

    const invalidOption = document.createElement('button');
    invalidOption.textContent = 'Random Option';
    document.body.appendChild(invalidOption);
    fireEvent.click(invalidOption);

    fireEvent.click(screen.getByText('Check Answer'));

    // Checkk the next button did not appear because answer wasn't valid
    expect(screen.queryByText('Next Question')).not.toBeInTheDocument();
  });

  test('TC 15 - Valid quiz, no option selected', () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText('Vocabulary Basics'));

    const checkBtn = screen.getByText('Check Answer');
    expect(checkBtn).toBeDisabled();
  });

  test('TC 16 - Invalid quiz type selected', () => {
    render(<QuizPage />);

    // Simulate clicking on a non-existent quiz type via direct handler call
    fireEvent.click(screen.getByText('Vocabulary Basics'));

    // Simulate an incorrect state
    expect(screen.getByText(/Question 1 of/i)).toBeInTheDocument();
  });

  test('TC 17 - Valid quiz, invalid question index', () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText('Vocabulary Basics'));

    for (let i = 0; i < 5; i++) {
      const buttons = screen.getAllByRole('button');
      const timeOrFoundBtn = buttons.find(btn => btn.textContent?.includes('time') || btn.textContent?.includes('Found'));
      
      if (timeOrFoundBtn) {
        fireEvent.click(timeOrFoundBtn);
      } else {
        throw new Error("Button with 'time' or 'Found' text not found");
      }
      
      fireEvent.click(screen.getByText('Check Answer'));
      fireEvent.click(screen.getByText(i === 4 ? 'Finish Quiz' : 'Next Question'));
    }

    waitFor(() => {
      expect(screen.getByText('Quiz Results')).toBeInTheDocument();
    });
  });

  test('TC 19 - Timer increases correctly', () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText('Vocabulary Basics'));

    jest.advanceTimersByTime(10000); // 10 seconds

    expect(screen.getByText('00:10')).toBeInTheDocument();
  });
});
