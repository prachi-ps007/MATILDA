import React, { useState } from 'react';
import axios from 'axios';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { ResultsPage } from './pages/ResultsPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setAnalysisData(response.data.data);
        setCurrentPage('results');
      } else {
        setError(response.data.error || "An unknown error occurred.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to connect to the analysis server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout currentPage={currentPage} navigate={setCurrentPage}>
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-in slide-in-from-top-4">
          {error}
        </div>
      )}
      {currentPage === 'landing' && (
        <LandingPage onAnalyze={handleAnalyze} isLoading={isLoading} />
      )}
      {currentPage === 'results' && (
        <ResultsPage data={analysisData} onReset={() => setCurrentPage('landing')} />
      )}
      {currentPage === 'about' && (
        <AboutPage />
      )}
    </Layout>
  );
}

export default App;
