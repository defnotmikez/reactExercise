import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form } from './Presentation/Components/Form';
import { MarmotaContextProvider } from './Infrastructure/Context/MarmotaContext';
import { MarmotaTable } from './Presentation/Components/MarmotaTable';





function App() {
  return (
    <MarmotaContextProvider> 
    <Form />
    <MarmotaTable />
    </MarmotaContextProvider>
  );
}

export default App;
 