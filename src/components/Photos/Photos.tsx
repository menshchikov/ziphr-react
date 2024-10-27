import React from 'react';
import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";
import {debounce} from "lodash";
import {Loader} from "../Loader";
import {usePhotos} from "./usePhotos.ts";

const PAGE_SIZE = 5;

export function Photos() {

    const [searchParams, setSearchParams] = useSearchParams();

    const filterValue = searchParams.get("filter") || '';
    const filterType = searchParams.get("filterType") || 'albumId';
    const page = Number(searchParams.get("page")) || 1;
    const albumId = filterType === 'albumId' ? filterValue : '';
    const title = filterType === 'title' ? filterValue : '';
    const {isPending, isError, error, photos, pages} = usePhotos(albumId, title, page, PAGE_SIZE);

    const setSearchParamsDebounced = React.useRef(
        debounce((qParams) => {
            setSearchParams(qParams);
        }, 500)
    ).current;

    function pageChange(num: number) {
        searchParams.set('page', num.toString(10));
        setSearchParams(searchParams);
    }

    function onFilterChange(e: any) {
        searchParams.set('filter', e.target.value);
        searchParams.set('filterType', filterType);
        searchParams.set('page', '1');
        setSearchParamsDebounced(searchParams);
    }

    function onFilterTypeChange(e: any) {
        searchParams.set('filterType', e.target.value);
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    }

    if (isPending) {
        return <Loader/>
    }
    if (isError) {
        return <div>{"Error: " + error}</div>
    }

    return (
        <div className="p-2">
            <ol className="flex flex-row gap-2">
                <li className="breadcrumb-item">
                    <a className="text-blue-600 visited:text-purple-600"
                       href="/dashboard">Dashboard</a>
                </li>
                <li>/</li>
                <li className="breadcrumb-item active" aria-current="page">Photos</li>
            </ol>


            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">

                <div>
                    <label className="block font-bold">Filter</label>
                    <input type="text" defaultValue={filterValue}
                           className="w-full border-2 bordr-gray-200 rounded-lg p-2" onChange={onFilterChange}/>
                </div>

                <div>
                    <label className="block font-bold">Filter type</label>
                    <select onChange={onFilterTypeChange} value={filterType}
                            className="border-2 border-gray-200 rounded-lg p-2">
                        <option value="albumId">Album ID</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>

            <h1 className="text-4xl font-bold my-4">Photos</h1>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {photos?.map((photo) => (
                    <div key={photo.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <a href={'/photos/' + photo.id} className="text-blue-600 visited:text-purple-600">
                            <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl.split('/').pop()}
                                 className="bg-gray-200 object-cover w-full h-[200px]"></img>
                            <div className="p-1 line-clamp-1">{photo.title}</div>
                        </a>
                        <a href={'/albums/' + photo.albumId} className="text-blue-600 visited:text-purple-600 p-1">View
                            album</a>
                    </div>))}
            </div>

            <Paginator currentPageNum={page} totalPagesCount={pages} pageChanged={pageChange}/>
        </div>
    );
}