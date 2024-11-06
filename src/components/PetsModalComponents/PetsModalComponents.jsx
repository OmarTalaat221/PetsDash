import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box} from '@mui/material';
import './style.css';
import Datos from './Datos/Datos'
import Domicilio from './Domicilio/Domicilio';
import Salud from './Salud/Salud';
import Foto from './Foto/Foto';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function PetsModalComponents() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleNext = () => {
      setValue((prevValue) => (prevValue < 3 ? prevValue + 1 : prevValue));
    };
  
    const handlePrevious = () => {
      setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : prevValue));
    };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Datos" />
          <Tab label="Domicilio" />
          <Tab label="Salud" />
          <Tab label="Foto" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Datos setValue={setValue}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Domicilio setValue={setValue}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Salud setValue={setValue}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
         <Foto setValue={setValue}/>
      </TabPanel>
    </div>
  );
}
