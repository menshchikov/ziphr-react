import React, {useEffect, useReducer, useRef} from 'react';
import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getAlbums} from "../../services/album-api";
import {AlbumPhotos} from "./AlbumPhotos";
import {AlbumsState} from "./albums-state";
import {AlbumsActions} from "./albums-actions";
import {albumsReducer} from "./albums-reducer";
import {debounce} from "lodash";

export function Albums() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [state, dispatch]:[AlbumsState, any] = useReducer(albumsReducer, {}, () => {
        const filterValue = searchParams.get('filter') || '';
        const filterType = searchParams.get('filterType') || 'userId';
        const userId = filterType === 'userId' || !filterType ? filterValue: '';
        return {
            page: Number.parseInt(searchParams.get('page') || '1'),
            pages: 1,
            filterValue,
            filterType,
            allAlbums: [],
            filteredAlbums: [],
            pageAlbums: [],
            userId,
        }
    });

    useEffect(() =>{
        const filterValue= searchParams.get('filter') || '';
        const filterType= searchParams.get('filterType') || 'userId';
        if(filterValue !== state.filterValue || filterType !== state.filterType){
            dispatch({
                type: AlbumsActions.setFilters,
                filterValue,
                filterType,
            });
            return;
        }

        const page= Number.parseInt(searchParams.get('page') || '1');
        if(page !== state.page){
            dispatch({
                type: AlbumsActions.setPage,
                page,
            })
            return;
        }

    }, [searchParams])

    useQueryClient();
    const {isPending, isError, error} = useQuery({
        queryKey: ['albums', state.userId],
        queryFn: async () => {
            const albums = await getAlbums(state.userId);
            dispatch({
                type: AlbumsActions.setAlbums,
                albums,
            })
            return albums;
        },
    });

    function pageChange(num: number) {
        searchParams.set('page', num.toString());
        setSearchParams(searchParams);
    }

    const setSearchParamsDebounced = useRef(
        debounce((searchParams) => {
            setSearchParams(searchParams);
        }, 500)
    ).current;

    function onFilterChange(e: any) {
        const value = e.target.value;
        searchParams.set('filter', value);
        searchParams.set('page', '1');
        setSearchParamsDebounced(searchParams)
    }

    function onFilterTypeChange(e: any) {
        const value = e.target.value;
        searchParams.set('filterType', value);
        searchParams.set('page', '1');
        setSearchParams(searchParams)
    }

    if(isPending){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>{'Error: '+error}</div>
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
                    <input type="text" defaultValue={state.filterValue}
                           className="w-full border-2 bordr-gray-200 rounded-lg p-2" onChange={onFilterChange}/>
                </div>

                <div>
                    <label className="block font-bold">Filter type</label>
                    <select onChange={onFilterTypeChange} value={state.filterType}
                            className="border-2 border-gray-200 rounded-lg p-2">
                        <option value="userId">User ID</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 mt-3">
                {state.pageAlbums.map((album) => (
                    <div key={album.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-200 p-2 line-clamp-1">
                            <a href={'/albums/' + album.id}
                               className="text-blue-600 visited:text-purple-600">
                                {album.title}
                            </a>
                        </div>
                        <div className="content-center h-[140px]">
                            <AlbumPhotos albumId={album.id}></AlbumPhotos>
                        </div>
                        <div className="bg-gray-200 p-2">User {album.userId}</div>
                    </div>))}
            </div>

            <Paginator currentPageNum={state.page} totalPagesCount={state.pages} pageChanged={pageChange}/>

        </div>
    );
}