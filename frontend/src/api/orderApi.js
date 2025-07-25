import axios from "axios";

const API_URL = "http://localhost:5000/api/order"; // Change to your backend URL

export async function createOrder(data) {
  try {
    const response = await axios.post(`${API_URL}`,data);
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "create order failed" };
  }
}

export async function getOrder(data) {
  try {
    const response = await axios.get(`${API_URL}`,data);
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "get order failed" };
  }
}