import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './slices/accountSlice'


export default configureStore({
    reducer: { 
        account: accountSlice
    },
})