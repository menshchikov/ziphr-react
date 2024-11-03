import {Photo} from "../model/photo";
import {API_URL} from "./consts.ts";

export function getPhotoById(id: string): Promise<Photo> {
    const url = API_URL + '/photos/';
    return fetch(url + id).then(res => res.json())
}

export function getPhotos(albumId?: string): Promise<Photo[]> {
    let url = API_URL + '/photos';
    if (albumId) {
        url += '?albumId=' + albumId;
    }
    return fetch(url)
        .then(res => res.json())
}