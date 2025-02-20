import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// "Mock'iname" komponentus, kad galėtume lengvai identifikuoti, kuris iš jų yra atvaizduotas.
jest.mock('./pages/Greeting', () => () => <div data-testid="greeting">Greeting Component</div>);
jest.mock('./pages/AboutMe', () => () => <div data-testid="about-me">About Me Component</div>);
jest.mock('./pages/UsersPage', () => () => <div data-testid="user-page">User Page Component</div>);
jest.mock('./pages/LessonPage', () => () => <div data-testid="lesson-page">Lesson Page Component</div>);
jest.mock('./components/Header', () => () => <div data-testid="header">Header Component</div>);
jest.mock('./components/Footer', () => () => <div data-testid="footer">Footer Component</div>);

describe('App komponento testai', () => {
  test('Pagrindinio puslapio route rodo Greeting komponentą', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('greeting')).toBeInTheDocument();
  });

  test('About puslapio route rodo AboutMe komponentą', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('about-me')).toBeInTheDocument();
  });

  test('User puslapio route rodo UserPage komponentą', () => {
    render(
      <MemoryRouter initialEntries={['/user/123']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('user-page')).toBeInTheDocument();
  });

  test('Pamokos route rodo LessonPage komponentą (naudojant "/pamoka/" maršrutą)', () => {
    render(
      <MemoryRouter initialEntries={['/pamoka/intro']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('lesson-page')).toBeInTheDocument();
  });

  test('Pamokos route rodo LessonPage komponentą (naudojant "/pamokos/" maršrutą)', () => {
    render(
      <MemoryRouter initialEntries={['/pamokos/intro']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('lesson-page')).toBeInTheDocument();
  });

  test('Header ir Footer komponentai visada rodomi', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
