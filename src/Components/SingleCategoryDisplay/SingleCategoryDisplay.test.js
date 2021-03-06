import React from 'react';
import SingleCategoryDisplay from './SingleCategoryDisplay';
import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getItemsInCategory, getItem } from '../../helpers/apiCalls';
import '@testing-library/jest-dom';
jest.mock('../../helpers/apiCalls');

describe('SingleCategoryDisplay Component', () => {
  it('Should have the correct content when rendered', async () => {
    const mockChangePageTitle = jest.fn();
    const mockItemsInCategory = [
      {
        index: 'arrow',
        name: 'Arrow',
      },
      {
        index: 'blowgun-needle',
        name: 'Blowgun needle',
      },
      {
        index: 'crossbow-bolt',
        name: 'Crossbow bolt',
      },
    ];

    getItemsInCategory.mockResolvedValueOnce(mockItemsInCategory);

    const mockArrow = {
      index: 'arrow',
      name: 'Arrow',
      cost: {
        quantity: 10,
        unit: 'gp',
      },
    };
    const mockBlowgunNeedle = {
      index: 'blowgun-needle',
      name: 'Blowgun Needle',
      cost: {
        quantity: 2,
        unit: 'cp',
      },
    };
    const mockCrossbowBolt = {
      index: 'crossbow-bolt',
      name: 'Crossbow Bolt',
      cost: {
        quantity: 5,
        unit: 'sp',
      },
    };

    getItem.mockResolvedValueOnce(mockArrow);
    getItem.mockResolvedValueOnce(mockBlowgunNeedle);
    getItem.mockResolvedValueOnce(mockCrossbowBolt);
    render(
      <MemoryRouter>
        <SingleCategoryDisplay changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    const arrowCardCost = await waitFor(() => screen.getByText('Cost: 10 gp'));
    const blowgunTitle = screen.getByRole('heading', { name: 'Blowgun Needle' });
    const allButtons = screen.getAllByRole('button', { name: 'Add to Cart Item floating in hand' });

    expect(arrowCardCost).toBeInTheDocument();
    expect(blowgunTitle).toBeInTheDocument();
    expect(allButtons.length).toEqual(3);
  });

  it('Should show a Loading message until the data comes in', () => {
    const mockChangePageTitle = jest.fn();
    const mockItemsInCategory = [
      {
        index: 'arrow',
        name: 'Arrow',
      },
    ];

    getItemsInCategory.mockResolvedValueOnce(mockItemsInCategory);

    const mockArrow = {
      index: 'arrow',
      name: 'Arrow',
      cost: {
        quantity: 10,
        unit: 'gp',
      },
    };

    getItem.mockResolvedValueOnce(mockArrow);
    render(
      <MemoryRouter>
        <SingleCategoryDisplay changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    const loadingMessage = screen.getByRole('heading', { name: 'Loading...' });

    expect(loadingMessage).toBeInTheDocument();
  });

  it('Should call setError on a bad fetch call', async () => {
    const mockChangePageTitle = jest.fn();
    getItemsInCategory.mockRejectedValueOnce({ error: 'fail' });
    const mockSetError = jest.fn();
    mockSetError.mockResolvedValueOnce('bingo');

    render(
      <MemoryRouter>
        <SingleCategoryDisplay setError={mockSetError} changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    await waitFor(() => expect(mockSetError).toBeCalledTimes(1));
    expect(mockSetError).toBeCalledWith('Bandits have blocked this trade route. Ill get my best sellswords on it');
  });

  it('Should call changePageTitle on load', () => {
    const mockChangePageTitle = jest.fn();
    getItemsInCategory.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <SingleCategoryDisplay changePageTitle={mockChangePageTitle} />
      </MemoryRouter>
    );

    expect(mockChangePageTitle).toBeCalledTimes(1);
  });
});
