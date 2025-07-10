import '../Stylesheets/Input.css'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import '../Stylesheets/Password.css'

import { useState } from 'react';


function Input({label,state,setState,placeholder}) {

    const [show, setShow] = useState(false)

    return (

        <div className='input-wrapper'>
            <p className='label-input'>{label}</p>

            <div className='password-input'>
                <input
                    type={show ? "text" : "password"}
                    value={state}
                    placeholder={placeholder}
                    className='custom-input'
                    onChange={(e) => setState(e.target.value)}
                />
                <div onClick={() => setShow(!show)}>
                    {
                        show == true ? <FaRegEyeSlash color='grey' size={20} /> : 
                        <FaRegEye color='grey' size={20} />
                    }
                </div>
            </div>

        </div>
    )
}

export default Input
