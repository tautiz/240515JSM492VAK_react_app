import React, { useState } from 'react';
import CountDown from '../../components/CountDown';
import { DynamicFields, LoginForm, MouseMoveBackground, ValidationForm } from '../../components/cssTasks';
import NameList from '../../components/Forms/NameList';
import StyledCard1 from '../../components/Cards/StyledCard1';
import ThemedCard from '../../components/Cards/StledCadr2';
import Hr from '../../components/Hr';

export default function CssWorkPage() {
  const [theme, setTheme] = useState(false);

  return (
    <>
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
    </>
  );
}