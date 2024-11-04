import {useQuery} from "@tanstack/react-query";
import {getPostById} from "../services/post-api.ts";

export function usePost(id: string | undefined) {
    return useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostById(id || '0'),
    });
}