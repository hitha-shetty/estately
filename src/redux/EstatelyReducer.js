import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredList : [],
    activeFilter : '',
}

const EstatelyReducer = createSlice({
    name : 'estately',
    initialState,
    reducers : {

       filteredList : (state,action)=>{
            state.filteredList = action.payload
       },
       activeFilter : (state,action) =>{
            state.activeFilter = action.payload
       }
    }
})

export default EstatelyReducer.reducer
export const {filteredList, activeFilter} = EstatelyReducer.actions