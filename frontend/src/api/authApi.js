import {publicAxios} from "../../utils/axios/index"

export async function loginApi(identifier, password) {
  try {
    // const response = await axios.post(`${API_URL}/login`, { identifier, password });
    const response = await publicAxios.post("/auth/login",{ identifier, password });
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "Login failed" };
  }
}

export async function signupApi(data) {
  try {
    const response = await publicAxios.post('/auth/signup',data);
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "Signup failed" };
  }
}
