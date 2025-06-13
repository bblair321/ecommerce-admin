import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductProvider } from '../src/context/ProductContext';
import ProductPage from '../src/pages/ProductPage';

describe('ProductPage', () => {
  test('renders products and allows editing price', async () => {
    render(
      <ProductProvider>
        <ProductPage />
      </ProductProvider>
    );

    const productTitle = await screen.findByText(/Vanilla bean/i);
    expect(productTitle).toBeInTheDocument();

    const editButtons = screen.getAllByRole('button', { name: /edit price/i });
    await userEvent.click(editButtons[0]);

    const priceInput = await screen.findByDisplayValue('10.00');
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, '15');

    const saveButton = screen.getByRole('button', { name: /save/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
    expect(
      screen.getByText((text) => text.includes('Price: $15.00'))
    ).toBeInTheDocument();
    });
  });
});
