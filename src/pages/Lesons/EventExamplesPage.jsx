import React from 'react';
import { ButtonClick, InputChange, FormSubmit, InlineEvents, MultipleEvents } from '../../components/events';
import DataTable from '../../components/DataTable';
import Hr from '../../components/Hr';

export default function EventExamplesPage() {
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
    <>
      <Hr text="Įvykių Pavyzdžiai" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <ButtonClick />
        <InputChange />
        <FormSubmit />
        <InlineEvents />
        <MultipleEvents />
        <DataTable data={users} filterBy="name,age,phone" />
      </div>
    </>
  );
}