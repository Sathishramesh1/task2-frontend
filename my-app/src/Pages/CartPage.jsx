import React, { useEffect } from "react";
import "./cartPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartApi, RemoveFromCartApi } from "../utilites/globalApi";
import { getProducts } from "../Container/cartSlice";
import Button from "@mui/material/Button";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

function CartPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const data = async () => {
      const res = await getCartApi();
      dispatch(getProducts(res.data.items));
      
    };
data();

  }, []);

  const handleRemove = async (itemId) => {
    const res = await RemoveFromCartApi(itemId);
    // console.log(res);
  };

  return (
    <div className="cart_page">
      <h2>shopping cart</h2>
      <div className="cart_page_products">
        { cart.products.length>0 && cart.products.map((ele,i) => {
            return (
              <div key={ele?.product?.id } className="cart_page_items">
                <div className="cart_page_item_image">
                  <img src={ele?.product?.image||" "} alt={ele?.product?.title || "title"} />
                </div>

                <div className="cart_page_item_body">
                  <div className="cart_page_item_details">
                    <h3>{ele?.product?.title ||"product title"}</h3>
                    <div>
                      <b>Price:${ele?.product?.price || "10"}</b>
                    </div>
                    <div>
                      <Rating
                        name="read-only"
                        sx={{ marginTop: "16px" }}
                        value={+ele?.product?.rating ||1}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="cart_remove_button">
                    <div>Quantity:{ele?.quantity || 1}</div>
                    <Button
                      variant="contained"
                      sx={{
                        outline: "none",
                        border: "none",
                        "&:focus": { outline: "none" },
                        "&:active": { outline: "none" },
                      }}
                      onClick={() => handleRemove(ele.product.id)}
                      startIcon={<ShoppingCartRounded />}
                    >
                      Remove Item
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="cart_page_price">
        <b>TotalPrice: ${cart.total ||0}</b>
      </div>

      <Button variant="outlined" onClick={() => navigate("/checkout")}>
        checkOut
      </Button>
    </div>
  );
}

export default CartPage;
