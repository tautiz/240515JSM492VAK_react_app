import React from 'react';
import SonineJuosta from './components/SonineJuosta'
import AboutMe from './pages/AboutMe';
import Greeting from './pages/Greeting';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import UserPage from './pages/UsersPage';
import LessonPage from './pages/LessonPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-gray-100 dark:from-background-dark dark:to-gray-900 transition-all duration-300">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <main className="lg:col-span-12 space-y-8 animate-fade-in">
            <Routes>
              {/* Pagrindiniai puslapiai */}
              <Route path="/" element={<Greeting />} />
              <Route path="/about" element={<AboutMe />} />
              
              {/* Dinaminis maršrutas */}
              <Route path="/user/:id" element={<UserPage />} />

              {/* Nested maršrutai */}
              <Route path="/pamoka/*" element={<LessonPage />} />
            </Routes>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
