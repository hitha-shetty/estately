import React from 'react'
import '../Styles/ListProperty.css'

import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsBuildings } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from 'react-router';

function ListPropertyCard() {

    const navigate = useNavigate();
    
    const nav = ()=>{
        navigate('/listing')
    }

    return (

        <>
           <h1 className='plan-heading'>CHOOSE YOUR PLAN</h1>

            <div className="plans">

                <div className="monthly">
                    <HiOutlineBuildingStorefront color='grey' size={40} />
                    <div className="price"><FaIndianRupeeSign size={20} /> 99</div>
                    <div className="heading">MONTHLY PLAN</div>
                    <span>List upto 5 properties a month</span>
                    <span>Get upto 10 contacts a day</span>
                    <button onClick={nav}>Get started</button>
                </div>

                <div className="yearly">
                    <BsBuildings color='white' size={45} />
                    <div className="price"><FaIndianRupeeSign size={20} /> 600 </div>
                    <p style={{ color: 'white' }}><FaIndianRupeeSign size={10} /> 50 / month</p>
                    <div className="heading" style={{ color: 'white' }}>YEARLY PLAN</div>
                    <span>List upto 100 properties a month</span>
                    <span>Get unlimited contacts</span>
                    <button id='yearly-btn' onClick={nav}>Get started</button>
                </div>

                <div className="quarterly">
                    <HiOutlineOfficeBuilding color='grey' size={40} />
                    <div className="price" ><FaIndianRupeeSign size={20} /> 225</div>
                    <p ><FaIndianRupeeSign size={10} /> 75 / month</p>
                    <div className="heading">QUARTERLY PLAN</div>
                    <span>List upto 50 properties a month</span>
                    <span>Get upto 50 contacts a day</span>
                    <button onClick={nav}>Get started</button>
                </div>

            </div>
        </>

    )
}

export default ListPropertyCard
