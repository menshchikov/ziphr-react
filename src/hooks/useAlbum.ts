import {useQuery} from "@tanstack/react-query";
import {getAlbumById} from "../services/album-api.ts";

export function useAlbum(id: string | undefined) {
    return useQuery({
        queryKey: ['album', id],
        queryFn: () => getAlbumById(id || '0')
    });
}