

import { Route, Routes } from 'react-router-dom';
import { Button, Dashboard, FactorAnalysis, Navigation } from '@heelix/shared';

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/factor-analysis" element={<FactorAnalysis />} />
      </Routes>
    </div>
  );
}

export default App;
