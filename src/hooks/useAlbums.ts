import {useFetchData} from "./useFetchData.ts";
import {Photo} from "../model/photo.ts";
import {getPhotos} from "../services/photo-api.ts";

export function useAlbums(userId: string = '', title: string = '', page: number = 1, pageSize?: number) {
    return useFetchData<Photo>(['albums', userId], () => getPhotos(userId), title, page, pageSize);
}