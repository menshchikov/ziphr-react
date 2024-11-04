import {Album} from '../model/album';
import {API_URL} from './consts.ts';

export async function getAlbumById(id: string): Promise<Album> {
    const url = API_URL + '/albums/';
    const res = await fetch(url + id);
    return await res.json();
}

export async function getAlbums(userId?: string): Promise<Album[]> {
    let url = API_URL + '/albums';
    if (userId) {
        url += '?userId=' + userId;
    }
    const res = await fetch(url);
    return await res.json();
}