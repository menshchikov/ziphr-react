import {getPhotos} from '../services/photo-api.ts';
import {useFetchData} from "./useFetchData.ts";
import {Photo} from "../model/photo.ts";

export function usePhotos(albumId: string = '', title: string = '', page: number = 1, pageSize?: number) {
    return useFetchData<Photo>(['photos', albumId], () => getPhotos(albumId), title, page, pageSize);
}