import React from 'react';
import {useParams} from "react-router-dom";
import {PHOTOS_MOCK} from "../../mocks/photos.mock";

export const Photo = () => {
    const {id} = useParams();
    const photoId = Number.parseInt(id || "0");
    const photo = PHOTOS_MOCK.find(item => item.id === photoId);
    if (!photo) {
        return <div className="p-2">
            <h1>Photo not found</h1>
        </div>
    }
    return <div className="p-2">
        <h1>{photo.title}</h1>
        <a className="text-blue-600 visited:text-purple-600" href={"/albums/" + photo.albumId}>View Album</a>
        <img src={photo.url} alt={photo.url.split('/').pop()}
             className="w-full bg-gray-200 rounded-lg h-[300px] md:h-[600px] max-w-[600px] m-auto"/>
    </div>
}