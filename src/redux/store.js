import { configureStore } from "@reduxjs/toolkit";
import EstatelyReducer from './EstatelyReducer'

const store = configureStore({
    reducer:{
        estately : EstatelyReducer
       }
})

export default store