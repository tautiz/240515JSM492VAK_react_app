import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiIntegrationPage from './ApiIntegrationPage';
import CssWorkPage from './CssWorkPage';
import FormExamplesPage from './FormExamplesPage';
import LifecyclePage from './LifecyclePage';
import EventExamplesPage from './EventExamplesPage';
import ComponentWorkPage from './ComponentWorkPage';

export default function LessonRoutes() {
  return (
    <Routes>
      <Route path="api-integration" element={<ApiIntegrationPage />} />
      <Route path="css-work" element={<CssWorkPage />} />
      <Route path="forms" element={<FormExamplesPage />} />
      <Route path="lifecycle" element={<LifecyclePage />} />
      <Route path="events" element={<EventExamplesPage />} />
      <Route path="components" element={<ComponentWorkPage />} />
    </Routes>
  );
}