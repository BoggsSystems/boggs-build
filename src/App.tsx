import React from 'react';
import { AboutMediaHubPage } from './components/AboutMediaHubPage';

export const App: React.FC = () => {
  return (
    <AboutMediaHubPage
      onStart={() => {
        window.location.href = 'mailto:jeff@boggs.build?subject=Boggs%20Systems%20Inquiry';
      }}
      onNavigateHome={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onNavigatePricing={() => {
        window.open('https://opportunity-system.com/pricing', '_blank');
      }}
      onNavigatePrivacy={() => {
        window.open('https://opportunity-system.com/privacy', '_blank');
      }}
      onNavigateTerms={() => {
        window.open('https://opportunity-system.com/terms', '_blank');
      }}
    />
  );
};

export default App;
