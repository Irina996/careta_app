import { useAuthContext } from "../contexts";
import { $authHost, $host } from "./index";

export interface ICar {
  group_id: number;
  brand_name: string;
  model_name: string;
  image: string;
  car_cost: number;
}

interface IResponse<T> {
  data: T;
  message: "successful";
  success: true;
}

export enum EUrlKeys {
  BRAND = "brand",
  MODEL = "model",
  START_YEAR = "year_start",
  END_YEAR = "year_finish",
  SEATS = "seats_number",
  END_DATE = "end_date",
  START_DATE = "start_date",
  GEARBOX = "gearbox_type",
  CLASS = 'class_name',
}

export type ICarQueryParams = Partial<Record<EUrlKeys, string>>;

// export const createCar = async (car) => {
//   const { data } = await $authHost.get("home", { car });
//   return data;
// };

export const fetchCar = async (props?: { params: ICarQueryParams }) => {
  const { data } = await $host.get<IResponse<Array<ICar>>>("home", {
    params: props?.params,
  });
  return data;
};

export const fetchOneCar = async (id: string) => {
  const { data } = await $host.get("home/car?id=" + id);
  return data;
};

export const createBook = async (input: { car_group_id: number, start_date: string, end_date: string, baby_seat_amount: number, is_driver: boolean } , props: {
  onSuccess?: () => void;
  token:string
}) => { 
  // const { token } = useAuthContext() 
  const response = await $host.post('booking/create', input, {
    headers: {
      authorization: `Bearer ${props.token}`
    },
  })

  props.onSuccess && props.onSuccess()
  return response  
}  

export const useGetBookings = async () => { 
  const { token } = useAuthContext() 
  const response = await $host.get('booking/list/headers', {
    headers: {
      authorization: `Bearer ${token}`
    }
  })  
  return response  
}  