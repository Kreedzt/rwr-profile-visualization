import { request } from "./request";
import { Person } from "../models/person";
import { Profile } from "../models/profile";

export const PERSON_API_PREFIX = "person";

export const PersonService = {
  queryAll: async () => {
    return (await request("GET", `${PERSON_API_PREFIX}/query_all`)) as Promise<
      // 第一项为存档 ID, 第二项才是存档信息, 第三项为用户信息
      Array<[number, Person, Profile]>
    >;
  },
};
