import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getPhotos} from "../../services/photo-api";
import React from "react";

export function AlbumPhotos(props: { albumId: number }) {
    useQueryClient()
    const {isPending, isError, data, error} = useQuery({
        queryKey: ['photos', props.albumId],
        queryFn: () => getPhotos(props.albumId.toString()),
    });
    if (isPending) {
        return <div className="m-auto w-[10rem]">Loading...</div>
    }
    if (isError) {
        return <div className="p-2">{'Error: ' + error}</div>
    }
    return <div className="p-2 grid grid-cols-4 gap-2">
        {data?.slice(0, 4).map(photo => <a href={"/photos/" + photo.id} key={photo.id}>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl.split('/').pop()}
                     className="w-full h-[4rem] object-cover"/>
                {/*<div className="line-clamp-1 p-1">{photo.title}</div>*/}
            </div>
        </a>)}
    </div>;
}