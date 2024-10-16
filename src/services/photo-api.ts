import {Photo} from "../model/photo";

export function getPhotoById(id: string):Promise<Photo> {
    const url = 'https://jsonplaceholder.typicode.com/photos/';
    return fetch(url + id).then(res => res.json())
}

export function getPhotos(options?:{albumId?: string, title?: string}){
    let url = 'https://jsonplaceholder.typicode.com/photos';
    if(options?.albumId){
        url += '?albumId=' + options?.albumId;
    }
    return fetch(url)
        .then(res => res.json())
        .then(photos => {
            let titleFilter = options?.title || '';
            if(titleFilter?.length > 0){
                return photos.filter((photo:Photo) => photo.title.indexOf(titleFilter) > -1);
            }
            return photos;
        })
}