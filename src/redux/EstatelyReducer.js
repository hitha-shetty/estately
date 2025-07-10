import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredList : []
}

const EstatelyReducer = createSlice({
    name : 'estately',
    initialState,
    reducers : {

       filteredList : (state,action)=>{
             state.filteredList = action.payload
        }
    }
})

export default EstatelyReducer.reducer
export const {filteredList} = EstatelyReducer.actions