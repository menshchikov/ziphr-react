import {User} from "../model/user";
import {API_URL} from "./consts.ts";

export async function getUserById(id: string): Promise<User> {
    const url = API_URL + '/users/';
    const res = await fetch(url + id);
    return await res.json();
}
