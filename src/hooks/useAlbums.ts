import {useFetchData} from "./useFetchData.ts";
import {Album} from "../model/album.ts";
import {getAlbums} from "../services/album-api.ts";

export function useAlbums(userId: string = '', title: string = '', page: number = 1, pageSize?: number) {
    return useFetchData<Album>(['albums', userId], () => getAlbums(userId), title, page, pageSize);
}