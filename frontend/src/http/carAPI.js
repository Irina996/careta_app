import {$authHost, $host} from "./index"; 
 
export const createCar = async (car) => { 
    const {data} = await $authHost.get('home', {car}) 
    return data 
} 
 
export const fetchCar = async () => { 
    const {data} = await $host.get('home') 
    return data
} 

export const fetchOneCar = async (car_id) => { 
    const {data} = await $host.get('home/car?' + car_id) 
    return data
} 

