import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { getItem, getItemsInCategory, getCategories } from '../../helpers/apiCalls';
import '@testing-library/jest-dom';
jest.mock('../../helpers/apiCalls');

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

describe('Integration testing', () => {
  it('should allow a user to move from welcome page to the storefront', async () => {
    getCategories.mockResolvedValueOnce([
      {
        index: 'adventuring-gear',
        name: 'Adventuring Gear',
        url: '/api/equipment-categories/adventuring-gear',
      },
    ]);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const getStartedButton = await waitFor(() => screen.getByRole('button', { name: 'Get Started at the Storefront' }));

    fireEvent.click(getStartedButton);

    const adventureCard = await waitFor(() => screen.getByRole('heading', { name: 'Adventuring Gear' }));

    expect(adventureCard).toBeInTheDocument();
  });

  it('should allow a user to click on a category and see all of the items listed', async () => {
    const mockArrow = {
      index: 'arrow',
      name: 'Arrow',
      cost: {
        quantity: 10,
        unit: 'gp',
      },
    };
    getCategories.mockResolvedValueOnce([
      {
        index: 'adventuring-gear',
        name: 'Adventuring Gear',
        url: '/api/equipment-categories/adventuring-gear',
      },
    ]);
    getItemsInCategory.mockResolvedValueOnce([
      {
        index: 'arrow',
        name: 'Arrow',
      },
    ]);
    getItem.mockResolvedValueOnce(mockArrow);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const getStartedButton = await waitFor(() => screen.getByRole('button', { name: 'Get Started at the Storefront' }));

    fireEvent.click(getStartedButton);

    const adventureCard = await waitFor(() => screen.getByRole('heading', { name: 'Adventuring Gear' }));

    fireEvent.click(adventureCard);

    const arrowCard = await waitFor(() => screen.getByRole('heading', { name: 'Arrow' }));

    expect(arrowCard).toBeInTheDocument();
  });
});
