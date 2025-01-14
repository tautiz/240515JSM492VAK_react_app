import React from 'react';
import SonineJuosta from './components/SonineJuosta'
import AboutMe from './components/AboutMe';
import Greeting from './components/Greeting';
import ContactCard from './components/ContactCard';
import Hobbies from './components/Hobbies';
import Counter from './components/Counter';
import UserList from './components/UserList';
import Header from './components/Header';
import Footer from './components/Footer';
import Hr from './components/Hr';
import { ButtonClick, InputChange, FormSubmit, InlineEvents, MultipleEvents } from './components/events';
import DataTable from './components/DataTable';
import UserDashboard from './components/UserDashboard';
import Clock from './components/Clock';
import RegistrationForm, { UncontrolledForm, RegistrationWithValidation } from './components/RegistrationForm';

function App() {
  const users = [
    { name: "Jonas", age: 25, city: "Vilnius", phone: "123456789", email: "jonas@example.com" },
    { name: "Petras", age: 30, city: "Kaunas", phone: "987654321", email: "petras@example.com" },
    { name: "Ona", age: 22, city: "Klaipėda", phone: "555555555", email: "ona@example.com" },
    { name: "Marija", age: 28, city: "Šiauliai", phone: "111222333", email: "marija@example.com" },
    { name: "Antanas", age: 35, city: "Panevėžys", phone: "444333222", email: "antanas@example.com" },
    { name: "Lina", age: 27, city: "Alytus", phone: "777888999", email: "lina@example.com" },
    { name: "Tomas", age: 32, city: "Marijampolė", phone: "666555444", email: "tomas@example.com" },
    { name: "Greta", age: 24, city: "Utena", phone: "222111000", email: "greta@example.com" }

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

          <Hr text="Advanced Salygos ir React gyvavymo cilkas useEffect()" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className='card'>
                <RegistrationForm/>
              </div>
              <div className='card'>
                <UncontrolledForm/>
              </div>
              <div className='card'>
                <RegistrationWithValidation/>
              </div>
            </div>

          <Hr text="Advanced Salygos ir React gyvavymo cilkas useEffect()" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <UserDashboard />
              <div className='card'>
                <Clock/>
              </div>
            </div>

            <Hr text="Įvykių Pavyzdžiai" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <ButtonClick />
              <InputChange />
              <FormSubmit />
              <InlineEvents />
              <MultipleEvents />
              <DataTable data={users} filterBy="name,age,phone" />
            </div>

            <Hr text="Darbas su Komponentais" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {users.slice(0, 2).map(user => (
                <ContactCard key={user.email} {...user} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card"><Hobbies /></div>
              <div className="card"><Counter /></div>
              <div className="card"><UserList users={users.slice(0, 3)} /></div>
            </div>

            <Hr text="Intro" />

            <AboutMe />
            <Greeting />
            
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
