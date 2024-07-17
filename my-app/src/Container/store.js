import { configureStore } from "@reduxjs/toolkit";
import  dataSlice  from './dataSlice'
import cartSlice from './cartSlice'

export default configureStore({
    reducer:{
     product_data:dataSlice,
     cart:cartSlice
    }

});