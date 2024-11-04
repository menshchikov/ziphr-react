import {Photo} from '../model/photo';
import {API_URL} from './consts.ts';

export async function getPhotoById(id: string): Promise<Photo> {
    const url = API_URL + '/photos/';
    let res = await fetch(url + id);
    return await res.json();
}

export async function getPhotos(albumId?: string): Promise<Photo[]> {
    let url = API_URL + '/photos';
    if (albumId) {
        url += '?albumId=' + albumId;
    }
    let res = await fetch(url);
    return await res.json();
}