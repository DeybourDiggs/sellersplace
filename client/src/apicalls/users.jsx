import { axiosInstance } from "./axiosInstance";

// register user

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5000/api/users/register",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Login User

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5000/api/users/login",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get current user
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:5000/api/users/get-current-user"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all users
export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:5000/api/users/get-all-users"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update users status

export const UpdateUserStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `http://localhost:5000/api/users/update-user-status/${id}`,
      {status}
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
