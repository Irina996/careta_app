import {$authHost, $host} from "./index"; 
 
export const registration = async (client_name, surname, client_address, phone, email, password) => { 
    const response = await $host.post('client/register', {client_name, surname, client_address, phone, email, password, role: 'ADMIN'}) 
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
