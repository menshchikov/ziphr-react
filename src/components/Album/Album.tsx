import {ChangeEvent, useRef} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getAlbumById} from "../../services/album-api";
import {Paginator} from "../Paginator";
import {debounce} from "lodash";
import {Loader} from "../Loader.tsx";
import {usePhotos} from "../Photos/usePhotos.ts";

const PAGE_SIZE = 5;

export const Album = () => {
    const {id} = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const titleFilter = searchParams.get("filter") || ''

    const onPageChange = (page: number) => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    }

    const albumQuery = useQuery({queryKey: ['album', id], queryFn: () => getAlbumById(id || '0')});
    const photosQuery = usePhotos(id?.toString() || '0', titleFilter, page, PAGE_SIZE)


    const setSearchParamsDebounced = useRef(
        debounce((searchParams) => {
            setSearchParams(searchParams);
        }, 500)
    ).current;

    function onFilterChange(e: ChangeEvent<HTMLInputElement>) {
        const title = e.target.value;
        if (!title) {
            searchParams.delete('filter');
        } else {
            searchParams.set('filter', title);
        }
        searchParams.set('page', '1');
        setSearchParamsDebounced(searchParams);
    }

    if (albumQuery.isPending || photosQuery.isPending) {
        return <Loader/>
    }

    if (albumQuery.isError || photosQuery.isError) {
        return <div className="p-2">
            {'An error has occurred: ' + (albumQuery.error || photosQuery.error)}
        </div>
    }

    if (!albumQuery.data || !photosQuery.photos) {
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
                    href="/albums">Albums</a>
            </li>
            <li>/</li>
            <li className="font-bold text-blue-700" aria-current="page">{id}</li>
        </ol>

        <h1>{albumQuery.data.title}</h1>

        <div className="my-3">
            <label className="block font-bold">Filter by title</label>
            <input type="text" defaultValue={titleFilter || ''}
                className="w-full border-2 bordr-gray-200 rounded-lg p-2" onChange={onFilterChange}/>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {photosQuery.photos.map((photo) => (
                <a key={photo.id}
                    className="border border-gray-200 rounded-lg overflow-hidden text-blue-600 visited:text-purple-600"
                    href={'/photos/' + photo.id}
                >
                    <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl.split('/').pop()}
                        className="bg-gray-200 object-cover w-full h-[200px]"></img>
                    <div className="p-1 line-clamp-2">{photo.title}</div>
                </a>
            ))}
        </div>

        <Paginator currentPageNum={page} totalPagesCount={photosQuery.pages} onPageChange={onPageChange}/>
    </div>
}