import {ChangeEvent, useCallback, useMemo} from 'react';
import {Paginator} from '../Paginator';
import {useSearchParams} from 'react-router-dom';
import {AlbumCardPhotos} from './AlbumCardPhotos.tsx';
import {debounce} from 'lodash';
import {Loader} from '../Loader';
import {useAlbums} from '../../hooks/useAlbums.ts';
import {FilterBar} from '../FilterBar.tsx';
import {getCommonSearchParams} from '../../services/utils.ts';
import {FILTER_TYPE_PARAM, FILTER_VALUE_PARAM, PAGE_PARAM} from '../../services/consts.ts';

const PAGE_SIZE = 5;
const ALBUMS_FILTER_TYPES = [
    {value: 'userId', title: 'User ID'},
    {value: 'title', title: 'Title'}
]

export function Albums() {

    const [searchParams, setSearchParams] = useSearchParams();

    const {filterValue, filterType, page} = getCommonSearchParams(searchParams, 'userId');
    const userId = filterType === 'userId' ? filterValue : '';
    const title = filterType === 'title' ? filterValue : '';

    const {isPending, isError, error, albums, pages} = useAlbums(userId, title, page, PAGE_SIZE);

    function onPageChange(num: number) {
        searchParams.set(PAGE_PARAM, num.toString());
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
        searchParams.set(FILTER_VALUE_PARAM, value);
        searchParams.set(PAGE_PARAM, '1');
        setSearchParamsDebounced(searchParams)
    }

    function onFilterTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        searchParams.set(FILTER_TYPE_PARAM, value);
        searchParams.set(PAGE_PARAM, '1');
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
                    <a className="link"
                        href="/dashboard">Dashboard</a>
                </li>
                <li>/</li>
                <li className="breadcrumb-item active" aria-current="page">Albums</li>
            </ol>

            <h1 className="text-4xl font-bold my-4">Albums</h1>

            <FilterBar 
                defaultFilter={filterValue}
                onFilterChange={onFilterChange} 
                onFilterTypeChange={onFilterTypeChange}
                defaultFilterType={filterType} 
                filterTypes={ALBUMS_FILTER_TYPES}
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 mt-3">
                {albums.map((album) => (
                    <div key={album.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-200 p-2 line-clamp-1">
                            <a href={'/albums/' + album.id}
                                className="link">
                                {album.title}
                            </a>
                        </div>
                        <div className="content-center h-[140px]">
                            <AlbumCardPhotos albumId={album.id}></AlbumCardPhotos>
                        </div>
                        <div className="bg-gray-200 p-2">
                            By <a href={'/users/' + album.userId}
                                className="link">
                                User {album.userId}
                            </a>
                        </div>
                    </div>))}
            </div>

            <Paginator currentPageNum={page} totalPagesCount={pages} onPageChange={onPageChange}/>

        </div>
    );
}