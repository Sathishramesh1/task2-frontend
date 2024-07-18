import React, { useContext, useEffect } from "react";
import "./homePage.css";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Container/dataSlice";
import { addToCart } from "../Container/cartSlice";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { handleAddToCartApi } from "../utilites/globalApi";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product_data);
  const cart = useSelector((state) => state.cart);
  const { loggedIn } = useSelector((state) => state.product_data);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const res = await response.json();
        console.log(res.products, "home products");
        dispatch(setProducts(res.products));
      } catch (error) {
        console.log(error, "error occured");
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddToCart = async (id) => {
    if (loggedIn) {
      const selectedProduct = product.products.find((ele) => ele.id == id);
      const { thumbnail, title, price, description, rating } = selectedProduct;

      const data = {
        product: {
          id,
          image: thumbnail,
          title,
          price,
          description,
          rating,
        },
      };

      dispatch(addToCart({ ...selectedProduct, qty: 1 }));
      console.log(cart);
      const res=await handleAddToCartApi(data,1);

      console.log(res,"from home handel add to cart")
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home_page">
      <div className="product_container">
        {product.products.map((ele) => {
          return (
            <div key={ele.id} className="card">
              <div className="card_top">
                <img src={ele.thumbnail} alt={ele.title} />
              </div>
              <div className="card_bottom">
                <div>
                  <b>{ele.title}</b>
                </div>

                <div></div>

                <div>Price:${ele.price}</div>

                <div>
                  {/* <Button
                    variant="contained"
                    sx={{
                      marginTop: "16px",
                      border: "none",
                      outline: "none",
                      "&:focus": {
                        border: "none",
                        outline: "none",
                      },
                      "&:active": {
                        border: "none",
                        outline: "none",
                      },
                    }}
                    onClick={() => {
                      handleAddToCart(ele.id);
                    }}
                  >
                    Add to Cart
                  </Button> */}
                  <button className="button-63" role="button"
                   onClick={() => {
                      handleAddToCart(ele.id);
                    }}
                  >Add to Cart</button>
                </div>

                <div>
                  <Rating
                    name="read-only"
                    sx={{ marginTop: "16px" }}
                    value={ele.rating}
                    readOnly
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="home_page_footer">@2023 E-cart Pvt Limited</div>
    </div>
  );
}

export default HomePage;
