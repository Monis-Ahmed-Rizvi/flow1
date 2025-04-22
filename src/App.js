import React, { useState } from 'react';
import LandingPage from './components/landing/LandingPage';
import DataAnalysisScreen from './components/analysis/DataAnalysisScreen';
import DashboardView from './components/dashboard/DashboardView';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [csvData, setCsvData] = useState(null);
  
  // Handle file upload from landing page
  const handleFileUpload = (data) => {
    setCsvData(data);
    setCurrentScreen('analysis');
  };
  
  // Handle continue from analysis to dashboard
  const handleContinueToDashboard = () => {
    setCurrentScreen('dashboard');
  };
  
  // Handle reset to start over
  const handleReset = () => {
    setCsvData(null);
    setCurrentScreen('landing');
  };
  
  // Render the current screen
  const renderScreen = () => {
    switch(currentScreen) {
      case 'landing':
        return <LandingPage onFileUpload={handleFileUpload} />;
      case 'analysis':
        return <DataAnalysisScreen csvData={csvData} onContinue={handleContinueToDashboard} />;
      case 'dashboard':
        return <DashboardView onReset={handleReset} />;
      default:
        return <LandingPage onFileUpload={handleFileUpload} />;
    }
  };
  
  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;