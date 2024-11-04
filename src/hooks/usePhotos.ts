import {useQuery} from '@tanstack/react-query';
import {filterArrayByTitle, paginateArray} from '../services/utils.ts';
import {getPhotos} from '../services/photo-api.ts';

export function usePhotos(albumId: string ='', title: string = '', page: number = 1, pageSize?: number) {
    const {isPending, data, isError, error} = useQuery({
        queryKey: ['photos', albumId],
        queryFn: () => getPhotos(albumId),
    });

    let photos = data || [];
    if (title) {
        photos = filterArrayByTitle(photos, title);
    }
    let pages = 1;
    if(pageSize){
        pages = Math.ceil(photos.length / pageSize);
        photos = paginateArray(photos, page, pageSize)
    }
    return {isPending, isError, error, photos, pages};
}