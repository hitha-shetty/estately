import React, { useState } from 'react';
import '../Styles/FindWorth.css';
import image from '../assets/find_worth.jpg';
import { TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';

function FindWorth() {
  
  const [area, setArea] = useState();
  const [locality, setLocality] = useState('');
  const [age, setAge] = useState('');
  const [facing, setFacing] = useState('');
  const [worth,setWorth] = useState();

  const [display,setDisplay] = useState(false)

  const calculate = ()=>{

    if(locality==='Indiranagar') setWorth(area*25000)
    else if(locality==='Whitefield') setWorth(area*20000)
    else if(locality==='Koramangala') setWorth(area*15000)
    else if(locality==='Malleshwaram') setWorth(area*10000)
    else if(locality==='Hebbal') setWorth(area*6000)

    if(facing=='North' || facing=='East') setWorth(prev=>prev+1500000)

    if(age==='3-4 years') setWorth(prev=>prev-(prev/10))
    else if(age==='5-6 years') setWorth(prev=>prev-(prev/8))
    else if(age==='7+ years') setWorth(prev=>prev-(prev/5))

    setDisplay(true)

  }


  return (
    <div className='find_worth_container'>
      <div className="find_worth_form">
        <h3>Find the worth of your property</h3>

        <TextField
          variant='filled'
          className='ip'
          label="Carpet area"
          type='number'
          value={area}
          onChange={(e) => setArea(e.target.value)}
          onClick={()=>setDisplay(false)}
        />

        <FormControl fullWidth>
          <InputLabel id="locality-label" shrink >Locality</InputLabel>
          <Select 
            labelId="locality-label"
            id="locality"
            className='ip'
            label="Locality"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            onClick={()=>setDisplay(false)}
          >
            <MenuItem value="Indiranagar">Indiranagar</MenuItem>
            <MenuItem value="Whitefield">Whitefield</MenuItem>
            <MenuItem value="Hebbal">Hebbal</MenuItem>
            <MenuItem value="Malleshwaram">Malleshwaram</MenuItem>
            <MenuItem value="Koramangala">Koramangala</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="facing-label" shrink>Facing</InputLabel>
          <Select
            labelId="facing-label"
            id="facing"
            className='ip'
            label="Facing"
            value={facing}
            onChange={(e) => setFacing(e.target.value)}
            onClick={()=>setDisplay(false)}
          >
            <MenuItem value="North">North</MenuItem>
            <MenuItem value="South">South</MenuItem>
            <MenuItem value="East">East</MenuItem>
            <MenuItem value="West">West</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="age-label" shrink>Property Age</InputLabel>
          <Select
            labelId="age-label"
            id="age"
            className='ip'
            label="Property Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onClick={()=>setDisplay(false)}
          >
            <MenuItem value="1-2 years">1-2 years</MenuItem>
            <MenuItem value="3-4 years">3-4 years</MenuItem>
            <MenuItem value="5-6 years">5-6 years</MenuItem>
            <MenuItem value="7+ years">7+ years</MenuItem>
          </Select>
        </FormControl>

        <Button variant='contained' color='inherit' onClick={calculate}>Calculate</Button>
         
         {display && 
            <div className='worth'>
              Worth of your property : {worth}
            </div>
         }


      </div>

      <div className="find_worth_img">
        <img src={image} alt="Property"/>
      </div>
    </div>
  );
}

export default FindWorth;
