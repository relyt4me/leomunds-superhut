import React from 'react';
import ErrorPage from './ErrorPage';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('ErrorPage Component', () => {
  it('Should have the correct content when rendered', () => {
    render(
      <MemoryRouter>
        <ErrorPage error={'This is an Error Message'} />
      </MemoryRouter>
    );

    const errorMessage = screen.getByRole('heading', { name: 'This is an Error Message' });
    const diceRoll = screen.getByAltText('Red 20 sided dice set on fire with a rolled number of 1');
    const returnHomeButton = screen.getByRole('button', { name: 'Return Home' });

    expect(errorMessage).toBeInTheDocument();
    expect(diceRoll).toBeInTheDocument();
    expect(returnHomeButton).toBeInTheDocument();
  });

  it('Should fire the setError function when returning to home', () => {
    mockSetError;
  });
});
