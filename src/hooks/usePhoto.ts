import {useQuery} from "@tanstack/react-query";
import {getPhotoById} from "../services/photo-api.ts";

export function usePhoto(id: string | undefined) {
    return useQuery({queryKey: ['photo', id], queryFn: () => getPhotoById(id || '0')});
}