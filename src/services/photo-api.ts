import {Photo} from "../model/photo";

export function getPhotoById(id: string): Promise<Photo> {
    const url = 'https://jsonplaceholder.typicode.com/photos/';
    return fetch(url + id).then(res => res.json())
}

export function getPhotos(filterType: string, filterValue: string) {
    let url = 'https://jsonplaceholder.typicode.com/photos';
    if (filterType === 'albumId' && filterValue) {
        url += '?albumId=' + filterValue;
    }
    return fetch(url)
        .then(res => res.json())
}