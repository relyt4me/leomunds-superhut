import React from 'react';
import ItemCard from './ItemCard';
import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getItem } from '../../helpers/apiCalls';
import '@testing-library/jest-dom';
jest.mock('../../helpers/apiCalls');

describe('ItemCard Component', () => {
  it('Should have the correct content when rendered', async () => {
    const mockArrow = {
      index: 'arrow',
      name: 'Arrow',
      cost: {
        quantity: 10,
        unit: 'gp',
      },
    };

    getItem.mockResolvedValueOnce(mockArrow);

    const mockItem = { index: 'arrow' };
    render(
      <MemoryRouter>
        <ItemCard item={mockItem} />
      </MemoryRouter>
    );

    const cost = await waitFor(() => screen.getByText('Cost: 10 gp'));
    const title = screen.getByRole('heading', { name: 'Arrow' });
    const button = screen.getByRole('button', { name: 'Add to Cart Item floating in hand' });
    const buttonImage = screen.getByAltText('Item floating in hand');

    expect(cost).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(buttonImage).toBeInTheDocument();
  });

  // it('Should show a Loading message until the data comes in', () => {
  //   const mockItemsInCategory = [
  //     {
  //       index: 'arrow',
  //       name: 'Arrow',
  //     },
  //   ];

  //   getItemsInCategory.mockResolvedValueOnce(mockItemsInCategory);

  //   const mockArrow = {
  //     index: 'arrow',
  //     name: 'Arrow',
  //     cost: {
  //       quantity: 10,
  //       unit: 'gp',
  //     },
  //   };

  //   getItem.mockResolvedValueOnce(mockArrow);
  //   render(
  //     <MemoryRouter>
  //       <ItemCard />
  //     </MemoryRouter>
  //   );

  //   const loadingMessage = screen.getByRole('heading', { name: 'Loading...' });

  //   expect(loadingMessage).toBeInTheDocument();
  // });

  // it('Should call setError on a bad fetch call', async () => {
  //   getItemsInCategory.mockResolvedValueOnce(null);
  //   const mockSetError = jest.fn();
  //   mockSetError.mockResolvedValueOnce('bingo');

  //   render(
  //     <MemoryRouter>
  //       <ItemCard setError={mockSetError} />
  //     </MemoryRouter>
  //   );

  //   await waitFor(() => expect(mockSetError).toBeCalledTimes(1));
  //   expect(mockSetError).toBeCalledWith('Bandits have blocked this trade route. Ill get my best sellswords on it');
  // });
});
