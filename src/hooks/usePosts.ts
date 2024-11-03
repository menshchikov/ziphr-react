import {useQuery} from "@tanstack/react-query";
import {getPosts} from "../services/post-api.ts";
import {filterArrayByTitle, paginateArray} from "../services/utils.ts";

export function usePosts(userId: string = '', title: string = '', page: number = 1, pageSize?: number) {
    const {isPending, data, isError, error} = useQuery({
        queryKey: ['posts', userId],
        queryFn: () => getPosts(userId),
    });

    let posts = data || [];
    if (title) {
        posts = filterArrayByTitle(posts, title);
    }
    let pages = 1;
    if(pageSize) {
        pages = Math.ceil(posts.length / pageSize);
        posts = paginateArray(posts, page, pageSize)
    }
    return {isPending, isError, error, posts, pages};
}