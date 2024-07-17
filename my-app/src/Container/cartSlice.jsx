import { createSlice } from "@reduxjs/toolkit";



//creating cartslice
export const cartSlice=createSlice({

    name:"cart",
    initialState:{total:0,products:[],quantity:0},

    reducers:{
       //method for add product to cart
        addToCart:(state,action)=>{
           
            
            state.quantity=state.quantity+1,
            state.products.push(action.payload);
            state.total += action.payload.price * (action.payload.qty);
            
        },



        
 //method for remove product to cart
        removeFromCart:(state,id)=>{
            state,
           state.quantity= state.quantity-1,
 state.products= state.products.filter((e)=>e.payload.id!=id.payload.id),
  state.total=state.products.map((e,index)=>e?.payload.price*id.payload.tot[index]).reduce((acc,curr)=>acc+curr,0);
    
        },


        totalPrice:(state,tot)=>{
            state,
            state.products.forEach((e,index)=>{e=e.payload.qty=tot.payload.tot[index]}),
         state.total=state.products.map((e)=>e?.payload.price*e.payload.qty).reduce((acc,curr)=>acc+curr,0);
        
            },

        //remove button from homepage
         removeFromHome:(state,id)=>{
                       state,
                       state.quantity=state.quantity-1,
                      state.products= state.products.filter((e)=>e.payload.id!==id.payload.productid),
                      console.log(state.products)

         } ,  


         //get data from db
         getProducts:(state,action)=>{
           state,
           state.products=action.payload;

           const ans=state.products.reduce((acc,curr)=>acc+curr.totalPrice,0);
          state.total=ans.toFixed(2);
               
         },

    },
});
export const  {addToCart,removeFromCart,totalPrice,removeFromHome,getProducts} = cartSlice.actions;
export default cartSlice.reducer;