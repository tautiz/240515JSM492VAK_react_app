import React from 'react';
import AboutMe from './pages/AboutMe';
import Greeting from './pages/Greeting';
import Header from './components/Header';
import Footer from './components/Footer';
import UserPage from './pages/UsersPage';
import LessonPage from './pages/LessonPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ModalProvider } from './contexts/ModalContext';
import ModalContainer from './components/common/ModalContainer/ModalContainer';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-background-light to-gray-100 dark:from-background-dark dark:to-gray-900 transition-all duration-300">
            <Header />
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <main className="lg:col-span-12 space-y-8 animate-fade-in">
                  <TransitionGroup>
                    <CSSTransition key={location.pathname} classNames="fade-slide" timeout={300}>
                      <Routes location={location}>
                        {/* Pagrindiniai puslapiai */}
                        <Route path="/" element={<Greeting />} />
                        <Route path="/about" element={<AboutMe />} />
                        
                        {/* Dinaminis maršrutas */}
                        <Route path="/user/:id" element={<UserPage />} />

                        {/* Nested maršrutai */}
                        <Route path="/pamoka/*" element={<LessonPage />} />
                        <Route path="/pamokos/*" element={<LessonPage />} />
                      </Routes>
                    </CSSTransition>
                  </TransitionGroup>
                </main>
              </div>
            </div>
            <Footer />
            <ModalContainer />
          </div>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
