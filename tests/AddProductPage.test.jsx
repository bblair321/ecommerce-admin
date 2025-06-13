import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductProvider } from "../src/context/ProductContext";
import AddProductPage from "../src/pages/AddProductPage";

describe('AddProductPage', () => {
  test('renders form inputs and submits data', async () => {
    render(
      <ProductProvider>
        <AddProductPage />
      </ProductProvider>
    );

    await userEvent.type(screen.getByLabelText(/Name/i), 'Test Coffee');
    await userEvent.type(screen.getByLabelText(/Description/i), 'Test Description');
    await userEvent.type(screen.getByLabelText(/Origin/i), 'Test Origin');
    await userEvent.type(screen.getByLabelText(/Price/i), '20');

    await userEvent.click(screen.getByRole('button', { name: /add product/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toHaveValue('');
    });
  });
});
