import { configureStore } from '@reduxjs/toolkit'
import CategorySlice from './Features/Category/CategorySlice';
import ContractSlice from './Features/Contract/ContractSlice';
import UserProfileSlice from './Features/Authenticate/UserProfileSlice';

const Store = configureStore({
    reducer: {
        category: CategorySlice,
        contract: ContractSlice,
        userProfile: UserProfileSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default Store;

