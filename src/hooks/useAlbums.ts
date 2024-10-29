import {useQuery} from "@tanstack/react-query";
import {filterArrayByTitle, paginateArray} from "../services/utils.ts";
import {getAlbums} from "../services/album-api.ts";

export function useAlbums(userId: string = '', title: string = '', page: number = 1, pageSize?: number) {
    const {isPending, data, isError, error} = useQuery({
        queryKey: ['albums', userId],
        queryFn: () => getAlbums(userId),
    });

    let albums = data || [];
    if (title) {
        albums = filterArrayByTitle(albums, title);
    }
    let pages = 1;
    if(pageSize) {
        pages = Math.ceil(albums.length / pageSize);
        albums = paginateArray(albums, page, pageSize)
    }
    return {isPending, isError, error, albums, pages};
}