import React from 'react';
import {useParams} from 'react-router-dom';
import {Loader} from '../Loader';
import {usePhoto} from '../../hooks/usePhoto.ts';

export const Photo = () => {
    const {id} = useParams();
    const [showImg, setShowImg] = React.useState(false);

    const query = usePhoto(id);

    if(query.isPending){
        return <Loader/>
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
                <a className="link"
                    href="/dashboard">Dashboard</a>
            </li>
            <li>/</li>
            <li className="" aria-current="page">
                <a
                    className="link"
                    href="/photos">Photos</a>
            </li>
            <li>/</li>
            <li className="font-bold text-blue-700" aria-current="page">{id}</li>
        </ol>
        <h1>{query.data.title}</h1>
        <a className="link" href={'/albums/' + query.data.albumId}>View Album</a>
        {!showImg && (<div><Loader/></div>)}
        <img src={query.data.url}
            alt={query.data.url.split('/').pop()}
            onLoad={() => setShowImg(true)}
            onError={() => setShowImg(true)}
            className="w-auto bg-gray-200 rounded-lg h-[300px] md:h-[600px] object-cover m-auto"
        />
    </div>
}