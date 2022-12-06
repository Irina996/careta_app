import {$authHost, $host} from "./index"; 
 
export const registration = async (email, password) => { 
    const response = await $host.post('user/registration', {email, password, role: 'ADMIN'}) 
    return response 
} 
 
export const login = async (email, password) => { 
    const response = await $host.post('user/login', {email, password}) 
    return response 
} 
 
export const check = async () => { 
    const response = await $authHost.get('user/auth' )  
    return response 
}
