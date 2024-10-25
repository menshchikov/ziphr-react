import {useQuery, useQueryClient} from "@tanstack/react-query";
import {filterArrayByTitle, getSlicedArray} from "../../services/utils.ts";
import {getPhotos} from "../../services/photo-api.ts";

export function usePhotos(filterType: string, filter: string, page: number, pageSize: number) {
    useQueryClient();
    const albumId = filterType === 'albumId' ? filter : '';
    const {isPending, data, isError, error} = useQuery({
        queryKey: ['photos', albumId],
        queryFn: () => getPhotos(albumId),
    });

    let photos = data || [];
    if (filterType === 'title') {
        if (filter) {
            photos = filterArrayByTitle(photos, filter);
        }
    }
    const pages = Math.ceil(photos.length / pageSize);
    photos = getSlicedArray(photos, page, pageSize)
    return {isPending, isError, error, photos, pages};
}