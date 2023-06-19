import { axiosInstance } from "./axiosInstance";

// add products

export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5000/api/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products
export const GetProducts = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:5000/api/products/get-products");
    return response.data;
  } catch (error) {
    return error.message
  }
};
