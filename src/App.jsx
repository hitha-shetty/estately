import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import ImageSlider from './Components/ImageSlider'
import SearchBar from './Components/SearchBar'
import FindWorth from './pages/FindWorth'
import EMICalculator from './pages/EMICalculator'
import Buyers from './pages/Buyers'
import Tenants from './pages/Tenants'
import ListPropertyCard from './pages/ListPropertyCard'
import SingleOne from './pages/SingleOne'
import SingleTwo from './pages/SingleTwo'
import ListPropertyForm from './pages/ListPropertyForm'
import '../src/App.css'

import { useState} from 'react'
import crown from './assets/crown.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

//Material UI imports 
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import { useDispatch } from 'react-redux'
import { filteredList } from './redux/EstatelyReducer'


function App(){


  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const container = window.document.body;
  const navItems = [
    {name:'Properties for sale',link:'buy'}, 
    {name: 'Properties for rent', link:'rent'},
    {name: 'FAQ', link: 'faq'},
    {name: 'Articles', link: 'https://www.99acres.com/articles/real-estate-market-updates.html'},
    {name: 'About us', link:'about'}, 
    {name: 'Contact us', link: 'contact'}
    ]

  const handleDrawer = () => {
    setDrawerOpen(prevState => !prevState)
  }

  const handleNavigation = (url) => {
    if (url.includes('https')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/${url}`);
    }
  };

  const drawer = (
    <Box onClick={handleDrawer} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'var(--green)', fontWeight: 600, cursor: 'pointer' }}>
        LOGIN / REGISTER
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding >
            <ListItemButton sx={{ textAlign: 'left', ml: 2 }}>
              <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '15px' }} onClick={()=>{handleNavigation(item.link); dispatch(filteredList([]))}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>

        <AppBar sx={{ backgroundColor: 'var(--green)', display: 'flex',justifyContent: 'space-between' }} >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

              <h1 style={{ cursor: 'pointer' }} onClick={()=>navigate('/')}>estately.</h1>
              <h3 className='h3' onClick={()=>{navigate('/buy'); dispatch(filteredList([])) }}>For Buyers</h3>
              <h3 className='h3' onClick={()=>{navigate('/rent'); dispatch(filteredList([])) }}>For tenants</h3>

              <Button className='silver-button' variant="contained"
                sx={{ fontWeight: 500 }} onClick={()=>navigate('/list_property')}
              > List your property <img className='crown' src={crown} />
              </Button>
          
              <IconButton color="inherit" sx={{ml:22}}>
                <CgProfile size='30' />
              </IconButton>


              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawer}
                sx={{ mr: 2 }}
              >
                <GiHamburgerMenu size='30' />
              </IconButton>

              <Drawer
                container={container}
                open={drawerOpen}
                onClose={handleDrawer}
                variant='temporary'
                anchor='right'
                sx={{ '& .MuiDrawer-paper': { width: '300px' } }}
              >
                {drawer}
              </Drawer>
          </Toolbar>
        </AppBar>
     




      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image_slider" element={<ImageSlider />} />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/find_worth" element={<FindWorth />} />
        <Route path="/emi" element={<EMICalculator />} />
        <Route path="/buy" element={<Buyers />} />
        <Route path="/rent" element={<Tenants />} />
        <Route path="/list_property" element={<ListPropertyCard />} />
        <Route path="/buy/:id" element={<SingleOne />} />
        <Route path="/rent/:id" element={<SingleTwo />} />
        <Route path="/listing" element={<ListPropertyForm/>} />
      </Routes>

    </>
  )
}

export default App
