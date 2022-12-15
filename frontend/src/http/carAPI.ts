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
  CLASS = "class_name",
}

export enum ECarFields {
  BRAND = "brand",
  MODEL = "model",
  CLASS = "car_class",
  YEAR = "creation_year",
  GEARBOX = "gearbox",
  SEATS = "seats_number",
  CONSUMPTION = "fuel_consumption",
  NUMBER = "car_number",
  COLOR = "color",
  COST = "cost",
  IMAGE = "image",
}

export interface IAdminFullCar {
  brand: string;
  car_class: string;
  car_id: number;
  car_number: string;
  color: string;
  cost: number;
  creation_year: number;
  fuel_consumption: number;
  gearbox: string;
  image: string;
  model: string;
  seats_number: number;
}


export interface IBookingList {
  baby_seat_amount: number;
  booking_date: string;
  brand_name: string;
  booking_id: number;
  car_cost: number;
  class_name: string;
  creation_year: number;
  fuel_consumption: number;
  gearbox: string;
  image: string;
  is_driver: boolean;
  model_name: string;
  seats_number: number;
  type_name: string;
}

export interface IPaymentBooking {
  booking_id: number;
  payment_purpose: string;
  payment_method_id: number; //?
  payment_intent_id: number; //?
}

export type ICreateCar = Record<
  Exclude<ECarFields, "image">,
  string | number
> & {
  [ECarFields.IMAGE]: File | null;
};
export type ICarQueryParams = Partial<Record<EUrlKeys, string>>;

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

export const createCar = async (car: ICreateCar, token?: string) => {
  const input = new FormData();
  for (var key in car) {
    // @ts-ignore
    input.append(key, car[key]);
  }
  const { data } = await $host.post("/admin/car/add", input, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const fetchAdminCar = async (token?: string) => {
  const { data } = await $host.get<IResponse<Array<ICar>>>("admin/car/", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteCar = async (input: { id: number }, token?: string) => {
  const { data } = await $host.post("/admin/car/delete/", input, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const editCar = async (car: ICreateCar & { id: number }, token?: string) => {
  const input = new FormData();
  for (var key in car) {
    // @ts-ignore
    input.append(key, car[key]);
  }
  const { data } = await $host.post("/admin/car/edit", input, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
}

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

export const fetchAdminOneCar = async (id: number, token?: string) => {
  const { data } = await $host.get<IResponse<IAdminFullCar>>(
    `admin/car/info/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};



// KARINA
 
export const fetchBookingList = async (token?: string) => {
  const { data } = await $host.get<
    IResponse<
    Array<IBookingList>
    >
  >("booking/list/", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteBooking = async (input: { id: number }, token?: string) => {
  const { data } = await $host.post("booking/delete/", input, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const postPaymentBooking = async (input: { id: number }, token?: string) => {
  const { data } = await $host.post("payment/pay/", input, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};
