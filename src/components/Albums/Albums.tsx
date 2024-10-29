import {ChangeEvent, useCallback, useMemo} from 'react';
import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";
import {AlbumCardPhotos} from "./AlbumCardPhotos.tsx";
import {debounce} from "lodash";
import {Loader} from "../Loader";
import {useAlbums} from "./useAlbums.ts";

const PAGE_SIZE = 5;

export function Albums() {

    const [searchParams, setSearchParams] = useSearchParams();

    const filterValue = searchParams.get('filter') || '';
    const filterType = searchParams.get('filterType') || 'userId';
    const page = Number(searchParams.get('page')) || 1;

    const {isPending, isError, error, result: albums, pages} = useAlbums(filterType, filterValue, page, PAGE_SIZE);

    function onPageChange(num: number) {
        searchParams.set('page', num.toString());
        setSearchParams(searchParams);
    }

    // const setSearchParamsDebounced = useCallback(
    //     debounce((searchParams) => {
    //         setSearchParams(searchParams);
    //     }, 500),
    //     [setSearchParams]
    // );
    // React Hook useCallback received a function whose dependencies are unknown. Pass an inline function instead
    // solution with useMemo works fine, but looks wierd

    const setSearchParamsDebouncedMemorized = useMemo(() =>
        debounce((params: URLSearchParams) => {
            setSearchParams(params);
        }, 500), [setSearchParams]
    );

    const setSearchParamsDebounced = useCallback((p: URLSearchParams) =>
        setSearchParamsDebouncedMemorized(p), [setSearchParamsDebouncedMemorized]
    );

    function onFilterChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        searchParams.set('filter', value);
        searchParams.set('page', '1');
        setSearchParamsDebounced(searchParams)
    }

    function onFilterTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        searchParams.set('filterType', value);
        searchParams.set('page', '1');
        setSearchParams(searchParams)
    }

    if (isPending) {
        return <Loader/>
    }
    if (isError) {
        return <div>{'Error: ' + error}</div>
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
                        <option value="userId">User ID</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 mt-3">
                {albums.map((album) => (
                    <div key={album.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-200 p-2 line-clamp-1">
                            <a href={'/albums/' + album.id}
                                className="text-blue-600 visited:text-purple-600">
                                {album.title}
                            </a>
                        </div>
                        <div className="content-center h-[140px]">
                            <AlbumCardPhotos albumId={album.id}></AlbumCardPhotos>
                        </div>
                        <div className="bg-gray-200 p-2">
                            By <a href={'/users/' + album.userId}
                                className="text-blue-600 visited:text-purple-600">
                                User {album.userId}
                            </a>
                        </div>
                    </div>))}
            </div>

            <Paginator currentPageNum={page} totalPagesCount={pages} onPageChange={onPageChange}/>

        </div>
    );
}