import { createSlice } from "@reduxjs/toolkit";

//creating cartslice
export const cartSlice = createSlice({
  name: "cart",
  initialState: { total: 0, products: [], quantity: 0 },

  reducers: {
    //method for add product to cart
    addToCart: (state, action) => {
      (state.quantity = state.quantity + 1),
        state.products.push(action.payload);
      state.total += action.payload.price * action.payload.qty;
    },

    //method for remove product to cart
    removeFromCart: (state, action) => {
      //             state,
      //            state.quantity= state.quantity-1,
      //  state.products= state.products.filter((e)=>e.payload.id!=action.payload.id),
      //   state.total=state.products.map((e,index)=>e?.payload.price*action.payload.tot[index]).reduce((acc,curr)=>acc+curr,0);

      const productId = action.payload.id;
      const productIndex = state.products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        const productQty = state.products[productIndex].qty;

        // Update state
        state.quantity -= 1;
        state.total -= state.products[productIndex].price * productQty;

        // Remove product from the cart
        state.products.splice(productIndex, 1);
      }
    },

    //get data from db
    getProducts: (state, action) => {
      state, (state.products = action.payload);
      const ans = state.products.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );
      state.total = ans.toFixed(2);
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  totalPrice,
  removeFromHome,
  getProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
