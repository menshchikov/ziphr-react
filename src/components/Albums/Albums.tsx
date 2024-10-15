import React, {useMemo} from 'react';
import {ALBUMS_MOCK} from "../../mocks/albums.mock";
import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";
import {PHOTOS_MOCK} from "../../mocks/photos.mock";
import {Photo} from "../../model/photo";
import {Album} from "../../model/album";

const PAGE_SIZE = 5;

export interface AlbumWithPhotos extends Album {
    photos: Photo[];
}

export function Albums() {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = useMemo(() => {
        return Number.parseInt(searchParams.get("page") || '1');
    }, [searchParams]);

    const albums: AlbumWithPhotos[] = useMemo(() => {
        let start = (page - 1) * PAGE_SIZE;
        let end = start + PAGE_SIZE;
        return ALBUMS_MOCK.slice(start, end).map(album => ({
            ...album,
            photos: PHOTOS_MOCK.filter(photo => photo.albumId === album.id).slice(0,4) || []
        }));
    }, [page])

    const pages = Math.ceil(ALBUMS_MOCK.length / PAGE_SIZE);

    function pageChange(num: number) {
        setSearchParams({'page': num.toString(10)});
    }

    return (
        <div className="p-2">
            <ol className="flex flex-row gap-2">
                <li className="breadcrumb-item">
                    <a className="text-blue-600 visited:text-purple-600"
                       href="/dashboard">Dashboard</a>
                </li>
                <li>/</li>
                <li className="breadcrumb-item active" aria-current="page">Albums</li>
            </ol>

            <h1 className="text-4xl font-bold my-4">Albums</h1>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                {albums.map((album) => (<div key={album.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 p-2 line-clamp-1">{album.title}</div>
                    <div className="p-2 grid grid-cols-4">
                        {album.photos.map(photo => <a href={"/photos/" + photo.id} key={photo.id}>
                            <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl.split('/').pop()} className="w-[50px] h-[50px] bg-gray-200"/>
                            <div className="line-clamp-1">{photo.title}</div>
                        </a>)}
                    </div>
                    <div className="bg-gray-200 p-2">User {album.userId}</div>
                </div>))}
            </div>

            <Paginator currentPageNum={page} totalPagesCount={pages} pageChanged={pageChange}/>

        </div>
    );
}