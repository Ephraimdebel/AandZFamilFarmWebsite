import {protectedAxios} from "../../utils/axios/index"

export const getAllUsers = async () =>{
    try{
        const response = await protectedAxios.get("/users");
        return response.data
        }catch(error){
        return { success: false, error: error.response?.data?.message || "get all users failed " };
        }
}

export const deleteUser = async (userId) =>{
    try{
        const response  = await protectedAxios.delete(`/users/${userId}`)
        return response
    }catch(error){
        return { success: false, error: error.response?.data?.message || " delete users failed " };
    }
}

export const updateUserRole = async (id,role) =>{
    try{
        const response  = await protectedAxios.put('/users/role',{id,role})
        return response
    }catch(error){
        return { success: false, error: error.response?.data?.message || "update users failed " };
    }
}