import {useFetchData} from "./useFetchData.ts";
import {Post} from "../model/post.ts";
import {getPosts} from "../services/post-api.ts";

export function usePosts(userId: string = '', title: string = '', page: number = 1, pageSize?: number) {
    return useFetchData<Post>(['posts', userId], () => getPosts(userId), title, page, pageSize);
}