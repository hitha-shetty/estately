import React from 'react'
import ImageSlider from '../Components/ImageSlider'
import SearchBar from '../Components/SearchBar'
import CardComponent from '../Components/CardComponent'

import img1 from '../assets/find_worth.jpeg'
import img2 from '../assets/emi.avif'

import '../Styles/Home.css'
import Reviews from '../Components/Reviews'
import Footer from '../Components/Footer'
import { Typography } from '@mui/material'


function Home() {
  return (
    <>

      <ImageSlider />
      <SearchBar />
      <div className='card-flex'>

        <CardComponent img={img1} text="Find the worth of your property" link="find_worth" />
        <CardComponent img={img2} text="EMI Calculator" link="emi" />

      </div>
      
      <Typography variant='h5' sx={{margin:'1rem',color:'grey'}}>
        Client Testimonials
      </Typography>
      <div className="reviews">
        <Reviews />
      </div>
      <Footer />

    </>
  )
}

export default Home
