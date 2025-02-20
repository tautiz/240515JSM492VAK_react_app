import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import UserPage from './UsersPage';

describe('UserPage Component', () => {
  const renderWithRouter = (userId) => {
    return render(
      <MemoryRouter initialEntries={[`/user/${userId}`]}>
        <Routes>
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders user page title', () => {
    renderWithRouter('123');
    const titleElement = screen.getByText(/User Page/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('displays correct user ID from URL params', () => {
    const testUserId = '123';
    renderWithRouter(testUserId);
    const userIdText = screen.getByText(new RegExp(testUserId));
    expect(userIdText).toBeInTheDocument();
  });

  test('displays user information text', () => {
    renderWithRouter('123');
    const infoText = screen.getByText(/Rodymas informacijos apie vartotoją su ID/i);
    expect(infoText).toBeInTheDocument();
  });

  test('handles different user IDs', () => {
    const testUserId = '456';
    renderWithRouter(testUserId);
    const userIdText = screen.getByText(new RegExp(testUserId));
    expect(userIdText).toBeInTheDocument();
  });

  test('component structure matches snapshot', () => {
    const { container } = renderWithRouter('123');
    expect(container.firstChild).toMatchSnapshot();
  });
});
