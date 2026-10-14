import { useState } from 'react';
import './App.css';
import { FullCameraARExperience } from './components/FullCameraARExperience';

export function App() {
  const [arFullscreenActive] = useState<boolean>(true);

  return (
    <div className="ar-app-wrapper">
      {arFullscreenActive && <FullCameraARExperience />}
    </div>
  );
}

export default App;
