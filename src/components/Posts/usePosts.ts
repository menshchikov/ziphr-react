import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getPosts} from "../../services/post-api.ts";
import {filterArrayByTitle, getSlicedArray} from "../../services/utils.ts";

export function usePosts(filterType: string, filter: string, page: number, pageSize: number) {
    useQueryClient();
    const userId = filterType === 'userId' ? filter : '';
    const {isPending, data, isError, error} = useQuery({
        queryKey: ['posts', userId],
        queryFn: () => getPosts(userId),
    });

    let posts = data || [];
    if (filterType === 'title') {
        if (filter) {
            posts = filterArrayByTitle(posts, filter);
        }
    }
    const pages = Math.ceil(posts.length / pageSize);
    posts = getSlicedArray(posts, page, pageSize)
    return {isPending, isError, error, posts, pages};
}