import '../Styles/Footer.css'
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Button } from '@mui/material';

function Footer() {
  return (
    <div className='footer'>
      
      <div>
         <h1>estately.</h1>
         <p style={{marginLeft:0}}>Helping you take a step towards your dream home</p>
      </div>

      <div>
        <p>About us</p>
        <p>Contact us</p>
        <p>Careers</p>
        <p>T&C</p>
        <p>Report a problem</p> 
        <p>Reviews</p>
      </div>

      <div>
        <p style={{marginLeft:0}}>Get in touch</p>
        <div className="socials">
          <FaLinkedin size={25} />
          <FaTwitter size={25}/>
          <FaSquareInstagram size={25} />
        </div>

        <div className='subs'>
          <input type="email" placeholder='enter email' />
          <Button 
            variant='contained'
            sx={{backgroundColor:'var(--green)',borderRadius:'1.5rem'}}
          >Subscribe</Button>
        </div>
      </div>



    </div>
  )
}

export default Footer
