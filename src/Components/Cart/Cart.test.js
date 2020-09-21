import React from 'react';
import Cart from './Cart';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Cart Component', () => {
  it('Should have the correct content when rendered', () => {
    const mockCart = [
      { currency: 'sp', cost: 1, name: 'Blowgun needle', index: 'blowgun-needle' },
      { currency: 'cp', cost: 3, name: 'Crossbow bolt', index: 'crossbow-bolt' },
      { currency: 'gp', cost: 400, name: 'Breastplate', index: 'breastplate' },
    ];

    render(
      <MemoryRouter>
        <Cart cartItems={mockCart} />
      </MemoryRouter>
    );

    const cartItemHeaderTitle = screen.getByRole('heading', { name: 'Name' });
    const cartItemHeaderCost = screen.getByText('Cost');
    const clearCartButton = screen.getByRole('button', { name: 'Clear Cart' });
    const blowGunItem = screen.getByText('Blowgun needle');
    const crossbowItem = screen.getByText('Crossbow bolt');
    const breastplateItem = screen.getByText('Breastplate');
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
    const cartListTotalItems = screen.getByRole('heading', { name: '3 items in your cart' });
    const cartTotal = screen.getByRole('heading', { name: 'Total Cost: 400 gp, 1 sp, 3 cp' });
    const priceModifyLabel = screen.getByText('Price Modify: 0 %');
    const priceModifySlider = screen.getByRole('slider');
    const modifiedTotal = screen.getByRole('heading', { name: 'Modified Total: 400 gp, 1 sp, 3 cp' });

    expect(cartItemHeaderTitle).toBeInTheDocument();
    expect(cartItemHeaderCost).toBeInTheDocument();
    expect(clearCartButton).toBeInTheDocument();
    expect(blowGunItem).toBeInTheDocument();
    expect(crossbowItem).toBeInTheDocument();
    expect(breastplateItem).toBeInTheDocument();
    expect(removeButtons.length).toEqual(3);
    expect(cartListTotalItems).toBeInTheDocument();
    expect(cartTotal).toBeInTheDocument();
    expect(priceModifyLabel).toBeInTheDocument();
    expect(priceModifySlider).toBeInTheDocument();
    expect(modifiedTotal).toBeInTheDocument();
  });

  // it('Should show a stand in card while the fetch calls', () => {
  //   const mockArrow = {
  //     index: 'arrow',
  //     name: 'Arrow',
  //     cost: {
  //       quantity: 10,
  //       unit: 'gp',
  //     },
  //   };

  //   getItem.mockResolvedValueOnce(mockArrow);
  //   const mockItem = { index: 'arrow' };
  //   render(
  //     <MemoryRouter>
  //       <Cart item={mockItem} />
  //     </MemoryRouter>
  //   );

  //   const cost = screen.getByText('Cost: 0 Gold');
  //   const title = screen.getByRole('heading', { name: 'New Item' });
  //   const button = screen.getByRole('button', { name: 'Add to Cart Item floating in hand' });
  //   const buttonImage = screen.getByAltText('Item floating in hand');

  //   expect(cost).toBeInTheDocument();
  //   expect(title).toBeInTheDocument();
  //   expect(button).toBeInTheDocument();
  //   expect(buttonImage).toBeInTheDocument();
  // });

  // it('Should call setError on a bad fetch call', async () => {
  //   getItem.mockResolvedValueOnce(null);
  //   const mockSetError = jest.fn();
  //   mockSetError.mockResolvedValueOnce('bingo');

  //   render(
  //     <MemoryRouter>
  //       <Cart setError={mockSetError} item={{ index: 'arrow' }} />
  //     </MemoryRouter>
  //   );

  //   await waitFor(() => expect(mockSetError).toBeCalledTimes(1));
  //   expect(mockSetError).toBeCalledWith('One of the items must have become possessed come back once we have dispelled this curse');
  // });

  // it('Should call addItemToCart when the add button is clicked', async () => {
  //   const mockArrow = {
  //     index: 'arrow',
  //     name: 'Arrow',
  //     cost: {
  //       quantity: 10,
  //       unit: 'gp',
  //     },
  //   };
  //   const mockArrowItem = {
  //     currency: 'gp',
  //     cost: 10,
  //     name: 'Arrow',
  //     index: 'arrow',
  //   };

  //   getItem.mockResolvedValueOnce(mockArrow);

  //   const mockItem = { index: 'arrow' };
  //   const mockAddItemToCart = jest.fn();

  //   render(
  //     <MemoryRouter>
  //       <Cart item={mockItem} addItemToCart={mockAddItemToCart} />
  //     </MemoryRouter>
  //   );

  //   const button = await waitFor(() => screen.getByRole('button', { name: 'Add to Cart Item floating in hand' }));

  //   fireEvent.click(button);

  //   expect(mockAddItemToCart).toBeCalledTimes(1);
  //   expect(mockAddItemToCart).toBeCalledWith(mockArrowItem);
  // });
});
