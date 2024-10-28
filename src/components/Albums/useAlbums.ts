import {useQuery} from "@tanstack/react-query";
import {filterArrayByTitle, paginateArray} from "../../services/utils.ts";
import {getAlbums} from "../../services/album-api.ts";

export function useAlbums(filterType: string, filter: string, page: number, pageSize: number) {
    const userId = filterType === 'userId' ? filter : '';
    const {isPending, data, isError, error} = useQuery({
        queryKey: ['posts', userId],
        queryFn: () => getAlbums(userId),
    });

    let result = data || [];
    if (filterType === 'title') {
        if (filter) {
            result = filterArrayByTitle(result, filter);
        }
    }
    const pages = Math.ceil(result.length / pageSize);
    result = paginateArray(result, page, pageSize)
    return {isPending, isError, error, result, pages};
}