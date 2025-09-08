import axios from "./axios.customize.ts";
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}
export interface AccessTokenRes {
  EC?: number;
  accessToken?: string;
}
const createUserApi = (name: string, email: string, password: string) => {
  const URL_API = "v1/api/register";
  const data = { name, email, password };
  return axios.post(URL_API, data);
};
const loginApi = (email?: string, password?: string) => {
  const URL_API = "v1/api/login";
  type ResType = {
    EC?: number;
    accessToken?: string;
  };
  const data = { email, password };
  return axios.post<ResType>(URL_API, data);
};
const getUserApi = () => {
  const URL_API = "/v1/api/user";
  return axios.get<User[]>(URL_API);
};
export { createUserApi, loginApi, getUserApi };
