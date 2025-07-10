import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import '../Styles/Single.css';
import { BsCake2 } from "react-icons/bs";
import { FaRegCompass, FaRegBuilding, FaCar } from "react-icons/fa";
import { GiStairs } from "react-icons/gi";
import { BiSolidArea } from "react-icons/bi";

function SingleOne() {
  const { id } = useParams(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:5000/buy')
      .then((response) => {
        setData(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []); 

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error loading data: {error.message}</p>; 


  const item = data.find(element => element.pID === parseInt(id));

  if (!item) return <p>Property not found</p>; 

  return (
    <div className='single-p'>
      <h2>{item.bhk} BHK {item.type} for sale in {item.place}</h2>

      <div className="img-flex">
        <img alt="property" src={item.img} />
        <div className='desc'>
          <h3 id="des">Description</h3>
          <p id="para">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit culpa nihil sunt officia illo fugit vero dolore ratione, possimus esse distinctio autem architecto veritatis impedit cupiditate ex, reprehenderit labore blanditiis accusamus consequuntur magnam.
          </p>
          <h3 id="des">Price</h3>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>{item.price}</p>
          <button id="contact">Contact owner</button>
          <h3 id="des" style={{ cursor: 'pointer' }} onClick={() => navigate('/emi')}>Calculate EMI?</h3>
        </div>
      </div>

      <div className="overview">
        <span><BsCake2 color='grey' size={25} /> Age of property - {item.age} </span>
        <span><FaRegCompass color='grey' size={25} /> Facing - {item.facing} </span>
        <span><GiStairs color='grey' size={25} /> Floor - {item.floor} </span>
      </div>

      <div className="overview2">
        <span><BiSolidArea color='grey' size={25} /> Carpet Area - {item.area} </span>
        <span><FaRegBuilding color='grey' size={25} /> Number of bedrooms - {item.bhk} </span>
        <span><FaCar color='grey' size={25} /> Parking - Yes </span>
      </div>
    </div>
  );
}

export default SingleOne;










