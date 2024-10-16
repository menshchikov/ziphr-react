import React from 'react';
import { useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getPhotoById} from "../../services/photo-api";
import classNames from "classnames";

export const Photo = () => {
    const {id} = useParams();
    const [showImg, setShowImg] = React.useState(false);

    useQueryClient();
    const query = useQuery({queryKey: ['photo', id], queryFn: () => getPhotoById(id || '0')});

    if(query.isPending){
        return <div>Loading...</div>
    }
    if(query.isError) {
        return <div className="p-2">
            {'An error has occurred: '+ query.error}
        </div>
    }

    if (!query.data) {
        return <div className="p-2">
            <h1>Photo not found</h1>
        </div>
    }
    return <div className="p-2">
        <ol className="flex flex-row gap-2">
            <li className="">
                <a className="text-blue-600 visited:text-purple-600"
                   href="/dashboard">Dashboard</a>
            </li>
            <li>/</li>
            <li className="" aria-current="page">
                <a
                    className="text-blue-600 visited:text-purple-600"
                    href="/photos">Photos</a>
            </li>
            <li>/</li>
            <li className="font-bold text-blue-700" aria-current="page">{id}</li>
        </ol>
        <h1>{query.data.title}</h1>
        <a className="text-blue-600 visited:text-purple-600" href={"/albums/" + query.data.albumId}>View Album</a>
        <img src={query.data.url}
             alt={query.data.url.split('/').pop()}
             onLoad={() => setShowImg(true)}
             onError={() => setShowImg(true)}
             className={classNames([
                 "w-auto bg-gray-200 rounded-lg h-[300px] md:h-[600px] object-cover m-auto",
            ])}
        />
        {!showImg && <div>Loading...</div>}
    </div>
}