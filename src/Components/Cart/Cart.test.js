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

  it('Should modify the price as the slider changes', () => {
    const mockCart = [{ currency: 'gp', cost: 100, name: 'Breastplate', index: 'breastplate' }];

    render(
      <MemoryRouter>
        <Cart cartItems={mockCart} />
      </MemoryRouter>
    );

    const priceModifySlider = screen.getByRole('slider');

    fireEvent.change(priceModifySlider, { target: { value: '0.1' } });

    const priceModifyLabel = screen.getByText('Price Modify: 10 %');
    const modifiedTotal = screen.getByRole('heading', { name: 'Modified Total: 110 gp, 0 sp, 0 cp' });

    expect(priceModifyLabel).toBeInTheDocument();
    expect(modifiedTotal).toBeInTheDocument();
  });

  it('Should call clearCart when the clear button is clicked', () => {
    const mockClearCart = jest.fn();

    render(
      <MemoryRouter>
        <Cart clearCart={mockClearCart} cartItems={[]} />
      </MemoryRouter>
    );

    const clearCartButton = screen.getByRole('button', { name: 'Clear Cart' });

    fireEvent.click(clearCartButton);

    expect(mockClearCart).toBeCalledTimes(1);
  });

  it('Should call removeItem when the remove is clicked', () => {
    const mockCart = [{ currency: 'gp', cost: 100, name: 'Breastplate', index: 'breastplate' }];
    const mockRemoveItem = jest.fn();

    render(
      <MemoryRouter>
        <Cart cartItems={mockCart} removeItem={mockRemoveItem} />
      </MemoryRouter>
    );

    const removeButton = screen.getByRole('button', { name: 'Remove' });

    fireEvent.click(removeButton);

    expect(mockRemoveItem).toBeCalledTimes(1);
    expect(mockRemoveItem).toBeCalledWith('breastplate');
  });
});
