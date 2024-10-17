import {Album} from "../model/album";

export function getAlbumById(id: string): Promise<Album> {
    const url = 'https://jsonplaceholder.typicode.com/albums/';
    return fetch(url + id).then(res => res.json())
}

export function getAlbums(userId?: string): Promise<Album[]> {
    let url = 'https://jsonplaceholder.typicode.com/albums';
    if (userId) {
        url += '?useerId=' + userId;
    }
    return fetch(url)
        .then(res => res.json());
}