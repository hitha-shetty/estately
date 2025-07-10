import '../Styles/EMICalculator.css'
import img from '../assets/emi.gif'
import { TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import { useState } from 'react';

function EMICalculator() {

  const [amt, setAmt] = useState();
  const [tenure, setTenure] = useState();
  const [bank, setBank] = useState();
  const [display, setDisplay] = useState(false)
  const [emi, setEMI] = useState()

  const calculate = () => {

    setEMI(amt / (tenure * 12))
    if (bank === "SBI") setEMI(prev => prev + (amt * 0.30)/(tenure*12))
    else if (bank === "HDFC") setEMI(prev => prev + (amt * 0.22)/(tenure*12))
    else if (bank === "ICICI") setEMI(prev => prev + (amt * 0.13)/(tenure*12))
    else if (bank === "Axis") setEMI(prev => prev + (amt * 0.09)/(tenure*12))
    else if (bank === "PNB") setEMI(prev => prev + (amt * 0.05)/(tenure*12))
    setDisplay(true)

  }


  return (

    <div className='emi_container'>

      <div className="gif">
        <img src={img} alt="loading.." />
      </div>

      <div className="emi_calc">

        <h2>EMI CALCULATOR</h2>

        <TextField type="number" label="Loan Amount" variant="standard"
          onChange={(e) => setAmt(e.target.value)}
          onClick={()=>setDisplay(false)}
        />
        <TextField type="number" label="Tenure (yrs)" variant="standard"
          onChange={(e) => setTenure(e.target.value)}
          onClick={()=>setDisplay(false)}
        />

        <FormControl style={{ marginTop: '1rem' }} onClick={()=>setDisplay(false)}>
          <InputLabel id="bank-label">Bank</InputLabel>
          <Select
            labelId="bank-label"
            id="locality"
            label="Bank"
            variant='standard'
            onChange={(e) => setBank(e.target.value)}
          >
            <MenuItem value="SBI" >State Bank of India</MenuItem>
            <MenuItem value="HDFC" >HDFC Bank</MenuItem>
            <MenuItem value="ICICI" >ICICI Bank</MenuItem>
            <MenuItem value="Axis" >Axis Bank</MenuItem>
            <MenuItem value="PNB" >Punjab National Bank</MenuItem>
          </Select>
        </FormControl>

        <Button variant='contained' sx={{ marginTop: '2rem', backgroundColor: 'rgb(5, 5, 92)' }}
          onClick={calculate}
        >
          Calculate
        </Button>

        {display &&
          <div className='worth'>
            Emi : {parseInt(emi)} / month
          </div>
        }


      </div>

    </div>
  )
}

export default EMICalculator
