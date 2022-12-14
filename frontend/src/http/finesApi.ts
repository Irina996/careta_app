import { $host } from ".";

export interface IFinesList {
  baby_seat_amount: boolean;
  brand_name: string;
  car_cost: number;
  car_id: number;
  car_group_id: number;
  class_name: string;
  client_name: string;
  creation_year: number;
  email: string;
  fine_cost: number;
  fine_id: number;
  fuel_consumption: number;
  gearbox: string;
  group_id: number;
  image: string;
  is_driver: boolean;
  model_name: string;
  rent_cost: number;
  seats_number: number;
  surname: string;
}

interface IResponse<T> {
  data: T;
  message: "successful";
  success: true;
}

export const fetchAdminFinesList = async (token?: string) => {
  const { data } = await $host.get<IResponse<Array<IFinesList>>>(
    "admin/fine/",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const addAdminFine = async (
  input: { fine_cost: number; car_id: number },
  token?: string
) => {
  const { data } = await $host.post(
    "admin/fine/add/",
    { ...input, fine_date: new Date().toISOString().split("T")[0] },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// KARINA
export const fetchFinesList = async (token?: string) => {
  const { data } = await $host.get<IResponse<Array<IFinesList>>>("fines/", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteFines = async (input: { id: number }, token?: string) => {
  const { data } = await $host.post("admin/fine/delete/", input, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// export const badRent = async (input: { id: number }, token?: string) => {
//   const { data } = await $host.post("admin/history/add_bad", input, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
//   return data;
// };
