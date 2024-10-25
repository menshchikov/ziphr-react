import {Post} from "../model/post";
import {API_URL} from "./consts.ts";

export async function getPostById(id: string): Promise<Post> {

    const url = API_URL + '/posts/';
    let res = await fetch(url + id);
    return await res.json();
}

export async function getPosts(userId?: string): Promise<Post[]> {
    let url = API_URL + '/posts';
    if (userId) {
        url += '?userId=' + userId;
    }
    let res = await fetch(url);
    return await res.json();
}