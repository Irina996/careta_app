import { $authHost, $host } from "./index";

export interface IRentalList {
  baby_seat_amount: number;
  booking_date: string;
  brand_name: string;
  cost: number;
  class_name: string;
  client_name: string;
  creation_year: number;
  email: string;
  fuel_consumption: number;
  gearbox: string;
  image: string;
  is_driver: boolean;
  model_name: string;
  rent_id: number;
  seats_number: number;
  state_name: string;
  surname: string;
  type_name: string;
}

interface IResponse<T> {
  data: T;
  message: "successful";
  success: true;
}

export const fetchAdminRentalList = async (token?: string) => {
  const { data } = await $host.get<
    IResponse<{
      active: Array<IRentalList>;
      history: [Array<IRentalList>, Array<IRentalList>];
    }>
  >("admin/history/", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// KARINA
export const fetchRentalList = async (token?: string) => {
  const { data } = await $host.get<
    IResponse<Array<IRentalList> >
  >("rent/list/", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const goodRent = async (input: { id: number }, token?: string) => {
  const { data } = await $host.post("admin/history/add_good", input, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const badRent = async (input: { id: number }, token?: string) => {
  const { data } = await $host.post("admin/history/add_bad", input, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};