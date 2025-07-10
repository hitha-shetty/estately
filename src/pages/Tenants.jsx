import React from 'react'
import { Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import '../Styles/Buyers.css'
import { GoSortDesc } from "react-icons/go";
import { GoSortAsc } from "react-icons/go";
import { FaBuilding } from "react-icons/fa";
import { BiSolidArea } from "react-icons/bi";
import { FaStairs } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { filteredList } from '../redux/EstatelyReducer';
import { useNavigate } from 'react-router';
import axios from 'axios'

function Tenants() {

    const [data, setData] = useState([])
    const [asc, setAsc] = useState(true)
    const [properties, setProperties] = useState([]);
    const list = useSelector((state) => state.estately.filteredList)
    const [results, setResults] = useState(list?.length || data?.rent?.length)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //filtering system
    const [localities, setLocalities] = useState([]);
    const [type, setType] = useState([]);
    const [bhk, setBhk] = useState([]);

    const [showLocalities, setShowLocalities] = useState(false);
    const [showType, setShowType] = useState(false);
    const [showBhk, setShowBhk] = useState(false);

    useEffect(() => {
        console.log(list)
        if (list.length > 0) {
            setProperties(list);
        } else {
            axios.get('http://localhost:5000/rent')
            .then((response) => {
                setData(response.data);  
                setProperties(response.data);  
                setResults(response.data.length);  
            })
            .catch((error) => console.error('Error fetching data:', error));
        }
    }, [list,dispatch]);


    const filterProperties = () => {
        let updatedList = list.length>0 ? list : data;

        if (localities.length) {
            updatedList = updatedList.filter(p => localities.includes(p.place));
        }
        if (type.length) {
            updatedList = updatedList.filter(p => type.includes(p.type));
        }
        if (bhk.length) {
            updatedList = updatedList.filter(p => bhk.includes(p.bhk));
        }
        setProperties(updatedList);
        setResults(updatedList.length);
    };

    useEffect(() => {
        filterProperties();
    }, [localities, type, bhk]);


    const convertPrice = (price) => {
        const number = parseFloat(price.replace(/,/g, ''));
        return number;
    };

    const sortProperties = () => {
        const sortedProperties = [...properties].sort((a, b) => {
            const priceA = convertPrice(a.price);
            const priceB = convertPrice(b.price);
            return asc ? priceA - priceB : priceB - priceA;
        });
        setProperties(sortedProperties);
        setAsc(!asc);
    };


    const handleLocalities = () => {
        setShowLocalities(!showLocalities);
        setShowBhk(false)
        setShowType(false)
    }

    const handleBhk = () => {
        setShowLocalities(false);
        setShowBhk(!showBhk)
        setShowType(false)
    }

    const handleType = () => {
        setShowLocalities(false);
        setShowBhk(false)
        setShowType(!showType)
    }

    const insertLocalities = (locality) => {
        setLocalities(prevLocalities => {
            if (prevLocalities.includes(locality)) {
                return prevLocalities.filter(loc => loc !== locality);
            } else {
                return [...prevLocalities, locality];
            }
        });
    }

    const insertType = (type) => {
        setType(prevType => {
            if (prevType.includes(type)) {
                return prevType.filter(t => t !== type)
            } else {
                return [...prevType, type]
            }
        })
    }

    const insertBhk = (bhk) => {
        setBhk(prevBhk => {
            if (prevBhk.includes(bhk)) {
                return prevBhk.filter(b => b.bhk !== bhk)
            } else {
                return [...prevBhk, bhk]
            }
        })
    }

    return (

        <div className='buyers'>
            <Typography variant='h5'>
                {results} Results | Properties for rent in Bangalore
            </Typography>

            <div className='filter-sort'>
                <div className= 'filters' >
                    <h3>Filters: </h3>

                    <div className="parent">
                        <button className='filter-btn ' onClick={handleLocalities}>
                            Top Localities
                        </button>
                        {
                            showLocalities &&
                            <div className='menu'>
                                <button onClick={() => insertLocalities("Malleshwaram")}>Malleshwaram</button>
                                <button onClick={() => insertLocalities("Yeshwanthpur")}>Yeshwanthpur</button>
                                <button onClick={() => insertLocalities("Koramangala")}>Koramangala</button>
                            </div>

                        }
                    </div>


                    <div className="parent">
                        <button className='filter-btn' onClick={handleType}>
                            Property Type
                        </button>
                        {
                            showType &&
                            <div className='menu'>
                                <button onClick={() => insertType("villa")}>villa</button>
                                <button onClick={() => insertType("apartment")}>apartment</button>
                            </div>

                        }
                    </div>

                    <div className="parent">
                        <button className='filter-btn' onClick={handleBhk}>
                            BHK
                        </button>
                        {
                            showBhk &&
                            <div className='menu'>
                                <button onClick={() => insertBhk(1)}>1 BHK</button>
                                <button onClick={() => insertBhk(2)}>2 BHK</button>
                                <button onClick={() => insertBhk(3)}>3 BHK</button>
                                <button onClick={() => insertBhk(4)}>4 BHK</button>
                                <button onClick={() => insertBhk(5)}>5 BHK</button>
                                <button onClick={() => insertBhk(6)}>6 BHK</button>
                                <button onClick={() => insertBhk(7)}>7 BHK</button>
                            </div>
                        }
                    </div>

                </div>
                <button className='sort-btn' onClick={sortProperties}>
                    Sort by price
                    {asc == true ? <GoSortAsc color='grey' size={25} /> : <GoSortDesc color='grey' size={25} />}
                </button>
            </div>


            <div className='properties'>

                {
                    properties.map(p => (

                        <div className='p-card' key={p.pID} onClick={()=>navigate(`/rent/${p.pID}`)} >

                            <img src={p.img} alt="property image" className='p-image' />

                            <div className='info'>
                                <h3 style={{ color: 'black' }}>{p.bhk} BHK {p.type} for rent in {p.place}</h3>

                                <div className="p-icons">
                                    <p> <BiSolidArea color='grey' size={30} style={{ marginRight: '10px' }} />
                                        {p.area}
                                    </p>
                                    <p> <FaBuilding color='grey' size={30} style={{ marginRight: '10px' }} />
                                        {p.status}
                                    </p>
                                    <p> <FaStairs color='grey' size={30} style={{ marginRight: '10px' }} />
                                        {p.floor} Floor
                                    </p>
                                </div>
                            </div>

                            <div className='price-others'>
                                <span><MdCurrencyRupee />{p.price}</span>
                                <button className='contact-owner'>Contact Owner</button>
                            </div>
                        </div>

                    ))
                }
            </div>



        </div>
    )
}

export default Tenants













