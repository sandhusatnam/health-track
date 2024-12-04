import axios from "@/lib/axios";

import { AppUser } from "../types";
import { UserAPI } from "../urls";

export const fetchUserByEmail = async (email: string) => {
  try {
    const { data } = await axios.get<AppUser>(
      `${UserAPI.GET_USER_BY_EMAIL}${email}`,
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const createUser = async (email: string) => {
  try {
    const { data } = await axios.post<AppUser>(UserAPI.CREATE_USER, { email });

    return data;
  } catch (error) {
    return null;
  }
};
