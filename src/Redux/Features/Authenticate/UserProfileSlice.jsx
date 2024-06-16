import { createSlice } from "@reduxjs/toolkit";

const UserProfileSlice = createSlice({
    name:'userProfile',
    initialState:{
        profileData:{},
        yourCampaign:[],
        statistics : {},
        isAccountActive:null,
        isLoading:false,
        error: null
    },
    reducers:{
        addProfileData: (state,action)=>{
            state.profileData = action.payload
            state.isAccountActive = action.payload?.profileStatus
        },
        addYourCampaignData: (state,action)=>{
            state.yourCampaign = action.payload
        },
        addStatisticsData: (state,action)=>{
            state.statistics = action.payload
        },
        resetProfile:(state)=>{
            state.profileData = {},
            state.yourCampaign= [],
            state.statistics = {}
            state.isAccountActive = null,
            state.isLoading = false,
            state.error = null
        }
    },
    
})

export const {addProfileData,resetProfile,addYourCampaignData,addStatisticsData} = UserProfileSlice.actions;
export default UserProfileSlice.reducer;