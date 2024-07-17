import { createSlice } from "@reduxjs/toolkit";



export const dataSlice=createSlice({
    name:"product_data",
    initialState:{
        user:{},
        loggedIn:JSON.parse(localStorage.getItem("isLoggedIn")) || false,
        products:[],

    },

    reducers:{
      
        setUser(state, action) {
            state.user = action.payload;
          },
          setProducts(state, action) {
            
            state.products = action.payload;
          },
          setLoggedIn(state, action) {
            
            state.loggedIn = action.payload; 
            localStorage.setItem("isLoggedIn", JSON.stringify(action.payload));
          },

        
    
    },
});
export const {setUser,setProducts,setLoggedIn}=dataSlice.actions;
export default dataSlice.reducer;