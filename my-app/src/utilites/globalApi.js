import axios from 'axios';

const baseUrl='http://localhost:3000'

export const handleAddToCartApi = async (product,qty=1) => {
    try {
       console.log(product,"from apifn")
        const response = await axios.post(`${baseUrl}/api/products/v1/addtocart`, {
            ...product,
            quantity: qty
        },
        {
            withCredentials: true, 
        }
    );
        
        // console.log("Updated Cart:", response.data);
        return response;
       
    } catch (error) {
        console.error("Error from addToCartApi:", error);
       
    }
};


export const handleRegisterApi = async (user) => {
    try {
       
        const response = await axios.post(`${baseUrl}/api/user/v1/register`, {
           ...user
        });
        
        console.log("Registration success:", response.data);
       
    } catch (error) {
        console.error("unable to Register new user:", error);
       
    }
};


export const handleLoginApi = async (user) => {
    try {
       
        const response = await axios.post(`${baseUrl}/api/user/v1/login`, {
           ...user
        },
        {
            withCredentials: true 
        }
    );
        
        console.log("Login success:", response.data);
        return response
       
    } catch (error) {
        console.error("unable to Login:", error);
       
    }
};


export const getCartApi = async () => {
    try {
       
        const response = await axios.get(`${baseUrl}/api/products/v1/getcart`,
        {
            withCredentials: true 
        }
    );
        
        console.log("Cart data:", response.data);
        return response
       
    } catch (error) {
        console.error("unable to Login:", error);
       
    }
};



export const RemoveFromCartApi = async (itemId) => {
    try {
       
        const response = await axios.delete(`${baseUrl}/api/products/v1/remove`,
            {
                itemId:itemId
            },
        {
            withCredentials: true 
        }
    );
        
        // console.log("Cart data:", response.data);
        return response
       
    } catch (error) {
        console.error("unable to Login:", error);
       
    }
};



export const CompleteOrderApi = async () => {
    try {
       
        const response = await axios.post(`${baseUrl}/api/order/v1/placeorder`,
            {},
           
        {
            withCredentials: true 
        }
    );
        
        console.log("CompleteOrderapi ", response.data);
        return response
       
    } catch (error) {
        console.error("unable to Login:", error);
       
    }
};

