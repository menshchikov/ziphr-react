import {User} from "../model/user";

export async function getUserById(id: string): Promise<User> {
    const url = 'https://jsonplaceholder.typicode.com/users/';
    let res = await fetch(url + id);
    return await res.json();
}
