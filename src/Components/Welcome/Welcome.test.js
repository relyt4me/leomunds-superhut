import React from 'react';
import Welcome from './Welcome';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Welcome Component', () => {
  it('Should have the correct content when rendered', () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );

    const welcomeTitle = screen.getByRole('heading', { name: "Welcome to Leomund's Superhut" });
    const welcomeMessage = screen.getByText('To assist Dungeon Masters in running', { exact: false });
    const getStartedButton = screen.getByRole('button', { name: 'Get Started at the Storefront' });

    expect(welcomeTitle).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
  });
});
