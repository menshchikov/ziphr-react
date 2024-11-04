import {useFetchData} from "./useFetchData.ts";
import {Photo} from "../model/photo.ts";
import {getPhotos} from "../services/photo-api.ts";

export function usePosts(userId: string = '', title: string = '', page: number = 1, pageSize?: number) {
    return useFetchData<Photo>(['posts', userId], () => getPhotos(userId), title, page, pageSize);
}