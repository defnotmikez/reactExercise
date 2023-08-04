import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form } from './Presentation/Components/Form';
import { MarmotaContextProvider } from './Infrastructure/Context/MarmotaContext';
import { MarmotaTable } from './Presentation/Components/MarmotaTable';
import { MarmotaView } from './Presentation/Components/MarmotaView';





function App() {
  return (
    <MarmotaContextProvider> 
    <MarmotaView />
    </MarmotaContextProvider>
  );
}

export default App;
 