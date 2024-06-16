import { createSlice } from "@reduxjs/toolkit";

const ContractSlice = createSlice({
    name:"contractSlice",
    initialState:{
        contract: null,
        profileContract: null,
        address: null,
    },
    reducers:{
        setContract : (state,action)=>{
            state.contract = action.payload
        },
        setProfileContract : (state,action)=>{
            state.profileContract = action.payload
        },
        setAddress : (state,action)=>{
            state.address = action.payload
        }
        
    }

})

export const {setContract,setAddress,setDisconnect,setProfileContract}  = ContractSlice.actions;
export default ContractSlice.reducer;