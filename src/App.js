import { useState, useEffect } from 'react';
import SonineJuosta from './components/SonineJuosta'
import AboutMe from './components/AboutMe';
import Greeting from './components/Greeting';
import ContactCard from './components/ContactCard';
import Hobbies from './components/Hobbies';
import Counter from './components/Counter';
import UserList from './components/UserList';
import Header from './components/Header';
import Footer from './components/Footer';
import { ButtonClick, InputChange, FormSubmit, InlineEvents, MultipleEvents } from './components/events';

function App() {
  const users = [
    { name: "Jonas", age: 25, city: "Vilnius", phone: "123456789", email: "jonas@example.com" },
    { name: "Petras", age: 30, city: "Kaunas", phone: "987654321", email: "petras@example.com" },
    { name: "Ona", age: 22, city: "Klaipėda", phone: "555555555", email: "ona@example.com" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-gray-100 dark:from-background-dark dark:to-gray-900 transition-all duration-300">
      <Header/>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <SonineJuosta />
          </aside>
          <main className="lg:col-span-9 space-y-8 animate-fade-in">
            <AboutMe />
            <Greeting />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {users.map(user => (
                <ContactCard key={user.email} {...user} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card"><Hobbies /></div>
              <div className="card"><Counter /></div>
              <div className="card"><UserList users={users} /></div>
            </div>

            <div className="space-y-6">
              <ButtonClick />
              <InputChange />
              <FormSubmit />
              <InlineEvents />
              <MultipleEvents />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
