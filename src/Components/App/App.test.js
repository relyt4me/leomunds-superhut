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
  beforeEach(() => {
    const mockArrow = {
      index: 'arrow',
      name: 'Arrow',
      cost: {
        quantity: 10,
        unit: 'gp',
      },
    };
    const mockSword = {
      index: 'sword',
      name: 'Sword',
      cost: {
        quantity: 5,
        unit: 'sp',
      },
    };
    getCategories.mockResolvedValue([
      {
        index: 'adventuring-gear',
        name: 'Adventuring Gear',
        url: '/api/equipment-categories/adventuring-gear',
      },
    ]);
    getItemsInCategory.mockResolvedValue([
      {
        index: 'arrow',
        name: 'Arrow',
      },
      {
        index: 'sword',
        name: 'Sword',
      },
    ]);
    getItem.mockResolvedValueOnce(mockArrow);
    getItem.mockResolvedValueOnce(mockSword);
  });

  it('should allow a user to move from welcome page to the storefront', async () => {
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
    const newPageTitle = screen.getByRole('heading', { name: 'adventuring-gear' });

    expect(arrowCard).toBeInTheDocument();
    expect(newPageTitle).toBeInTheDocument();
  });

  it('should allow a user to click on their cart to navigate to the cart page', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const cartButton = await waitFor(() => screen.getByRole('button', { name: 'My Cart Horse pulling a cart 0' }));

    fireEvent.click(cartButton);

    const newPageTitle = screen.getByRole('heading', { name: 'Cart Checkout' });
    const priceModifyLabel = screen.getByText('Price Modify: 0 %');

    expect(priceModifyLabel).toBeInTheDocument();
    expect(newPageTitle).toBeInTheDocument();
  });
});
