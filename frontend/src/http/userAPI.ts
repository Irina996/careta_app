import { $authHost, $host } from "./index";

export const registration = async (
  client_name: string,
  surname: string,
  client_address: string,
  phone: string,
  email: string,
  password: string
) => {
  const response = await $host.post("client/register", {
    client_name,
    surname,
    client_address,
    phone,
    email,
    password,
    role: "ADMIN",
  });
  return response;
};

export const login = async (email: string, password: string) => {
  const response = await $host.post("user/login", { email, password });
  return response;
};

export const check = async () => {
  const response = await $authHost.get("user/auth");
  return response;
};

export const createCheckoutSession = async (
  input: { id: number, payment_purpose: 'rent' | 'fine' },
  token: string
) => {
  const { data } = await $host.post("payment/create-checkout-session", input, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  window.location.href = data.url

  console.log(data)
};
