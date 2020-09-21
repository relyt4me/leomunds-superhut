import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  it('should load with the welcome page and header', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const headerTitle = screen.getByRole('heading', { name: "Leomund's Superhut" });
    const welcomeHeader = screen.getByRole('heading', { name: "Welcome to Leomund's Superhut" });

    expect(headerTitle).toBeInTheDocument();
    expect(welcomeHeader).toBeInTheDocument();
  });
});
