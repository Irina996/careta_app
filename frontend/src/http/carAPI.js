import {$authHost, $host} from "./index"; 
 
export const createCar = async (car) => { 
    const {data} = await $authHost.get('api/', {car}) 
    return data 
} 
 
export const fetchCar = async () => { 
    const {data} = await $host.get('api/') 
    return data
} 

export const fetchOneCar = async (id) => { 
    const {data} = await $host.get('api/' + id) 
    return data
} 

