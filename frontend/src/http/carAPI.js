import {$authHost, $host} from "./index"; 
 
export const createCar = async (car) => { 
    const {data} = await $authHost.get('admin/car', {car}) 
    return data 
} 
 
export const fetchCar = async () => { 
    const {data} = await $host.get('admin/car') 
    return data.data
} 

export const fetchOneCar = async (id) => { 
    const {data} = await $host.get('admin/car' + id) 
    return data
} 

