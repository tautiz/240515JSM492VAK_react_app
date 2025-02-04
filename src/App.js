import React, { useState } from 'react';
import SonineJuosta from './components/SonineJuosta'
import AboutMe from './pages/AboutMe';
import Greeting from './pages/Greeting';
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
import DynamicForm from './components/Forms/DynamicForm';
import NameList from './components/Forms/NameList';
import StyledCard1 from './components/Cards/StyledCard1';
import ThemedCard from './components/Cards/StledCadr2';
import CountDown from './components/CountDown';
import { DynamicFields, LoginForm, MouseMoveBackground, ValidationForm } from './components/cssTasks';
import Posts from './components/Posts';
import Posts2 from './components/Posts2';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DynamicQuery, SearchFilter, CreatePost, Pagination, PostWithComments } from './components/APIintegracijos';
import UnifiedComponent from './components/UnifiedComponent';
import Card from './components/Cards/Card';
import PostsWithAbort from './components/PostsWithAbort';
import { Route, Routes } from 'react-router-dom';
import UserPage from './pages/UsersPage';

function App() {
  const queryClient = new QueryClient();

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

  function submitHandler(formData) {
    // formData bus objektas su visais duomenimis, pvz.:
    // {
    //   vardas: "...",
    //   email: "...",
    // }
    console.log("Forma pateikta, gauti duomenys:", formData);
  }

  const formSchema = [
    {
      label: "Jūsų vardas",
      name: "vardas",
      id: "vardas-777",
      className: "text-blue-700",
      type: "text"
    },
    {
      label: "El. paštas",
      name: "email",
      type: "email",
      placeholder: "įrašykite el. pašto adresą",
      // ir t.t.
    }
  ];

  const [theme, setTheme] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-gray-100 dark:from-background-dark dark:to-gray-900 transition-all duration-300">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 height-full">
            <SonineJuosta />
          </aside>
          <main className="lg:col-span-9 space-y-8 animate-fade-in">

            <Routes>
              {/* Pagrindiniai puslapiai */}
              <Route path="/" element={<Greeting />} />
              <Route path="/about" element={<AboutMe />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
              {/* Dinaminis maršrutas */}
              <Route path="/user/:id" element={<UserPage />} />
            </Routes>

            <Hr text="API integracija" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <Card span={2}>
                <PostsWithAbort/>
              </Card>
              <Card span={2}>
                <UnifiedComponent />
              </Card>
              <Card>
                <DynamicQuery />
              </Card>
              <Card>
                <SearchFilter />
              </Card>
              <Card>
                <CreatePost />
              </Card>
              <Card>
                <Pagination />
              </Card>
              <Card>
                <PostWithComments />
              </Card>
              <Card>
                <Posts />
              </Card>
              <Card>
                <QueryClientProvider client={queryClient}>
                  <Posts2 />
                </QueryClientProvider>
              </Card>
            </div>

            <Hr text="Darbas su CSS" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <CountDown />
              <div className='card'>
                <LoginForm />
              </div>
              <div className='card'>
                <DynamicFields />
              </div>
              <div className='card'>
                <ValidationForm />
              </div>
              <div className='card flex flex-col h-full'>
                <MouseMoveBackground />
              </div>

              <div className='card'>
                <NameList />
              </div>
              <StyledCard1>
                Bandomas korteles tekstas
                <button onClick={() => setTheme(!theme)}>Change</button>
              </StyledCard1>
              <ThemedCard theme={theme}> Tekstas ...</ThemedCard>
            </div>

            <Hr text="Formos pavyzdžiai" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className='card'>
                <h2>Dinamiškai generuojama forma</h2>
                <DynamicForm
                  formElements={formSchema}
                  onSubmit={submitHandler}
                />
              </div>
              <div className='card'>
                <h2>Kontroliuojama forma `useState()`</h2>
                <RegistrationForm />
              </div>
              <div className='card'>
                <h2>Nekontroliuojama forma `useRef()`</h2>
                <UncontrolledForm />
              </div>
              <div className='card'>
                <h2>Formos validacija</h2>
                <RegistrationWithValidation />
              </div>
            </div>

            <Hr text="Advanced Salygos ir React gyvavymo ciklas useEffect" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <UserDashboard />
              <div className='card'>
                <Clock />
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

          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
