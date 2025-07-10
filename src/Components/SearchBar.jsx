import { useState, useEffect } from 'react';
import { Button, Divider } from '@mui/material';
import '../Styles/SearchBar.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdKeyboardVoice } from "react-icons/md";
import { filteredList } from '../redux/EstatelyReducer';
import axios from 'axios';

function SearchBar() {
  const [buy, setBuy] = useState([]);
  const [rent, setRent] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/buy')
      .then((response) => {setBuy(response.data); console.log(buy)})
      .catch((error) => console.error('Error fetching buy data:', error));
  }, [buy]);

  useEffect(() => {
    axios.get('http://localhost:5000/rent')
      .then((response) => {setRent(response.data); console.log(rent)})
      .catch((error) => console.error('Error fetching rent data:', error));
  }, [rent]);

  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState('');
  const dispatch = useDispatch();
  
  const searchProperty = () => {
    if (!active) return; 
    const filtered = active === 'buy'
      ? buy.filter(d => d.type.toLowerCase().includes(searchParam) || d.place.toLowerCase().includes(searchParam))
      : rent.filter(d => d.type.toLowerCase().includes(searchParam) || d.place.toLowerCase().includes(searchParam));

    dispatch(filteredList(filtered));
    console.log(filtered)
    navigate(`/${active}`);
  };

  return (
    <div className="search-container">
      <div className='searchbar'>
        <div>
          <span
            onClick={() => setActive("buy")}
            className={active === "buy" ? "green-border" : ""}
          >
            Buy
          </span>
          <span
            onClick={() => setActive("rent")}
            className={active === "rent" ? "green-border" : ""}
          >
            Rent
          </span>
        </div>
        <Divider />
        <div className='bar'>
          <input
            type="text"
            className='search-ip'
            placeholder='Search by property type or location'
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
          <FaLocationCrosshairs color='var(--green)' size={25} />
          <MdKeyboardVoice color='var(--green)' size={25} />
          <Button
            className='search-btn'
            variant="contained"
            sx={{ backgroundColor: 'var(--green)' }}
            onClick={searchProperty}
            disabled={!active}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
