import React, {useEffect, useReducer} from 'react';
import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";
import {Photo} from "../../model/photo";
import {debounce} from "lodash";
import {useQuery} from "@tanstack/react-query";
import {getPhotos} from "../../services/photo-api";

const PAGE_SIZE = 8;

const enum ACTIONS {
    setPage = 'setPage',
    setPhotos = 'setPhotos',
    setFilter = 'setFilter',
}

function reducer(state: State, action: any) {
    switch (action.type) {
        case ACTIONS.setPage: {
            let start = (action.page - 1) * PAGE_SIZE;
            let end = start + PAGE_SIZE;
            let pagePhotos;
            if (action.filterType === 'title' && action.filterValue) {
                const filtered = state.allPhotos.filter(p => p.title.toLowerCase().includes(action.filterValue.toLowerCase()));
                pagePhotos = filtered.slice(start, end);
            } else {
                pagePhotos = state.allPhotos.slice(start, end);
            }
            return {
                ...state,
                page: action.page,
                pagePhotos: pagePhotos,
            };
        }
        case ACTIONS.setFilter: {
            let pagePhotos = state.pagePhotos, pages = state.pages;
            if (action.filterType === 'title' && action.filterValue && state.filterType == 'title') {
                const filtered = state.allPhotos.filter(p => p.title.toLowerCase().includes(action.filterValue.toLowerCase()));
                pagePhotos = filtered.slice(0, PAGE_SIZE);
                pages = Math.ceil(filtered.length / PAGE_SIZE);
            }
            return {
                ...state,
                filterValue: action.filterValue,
                filterType: action.filterType,
                queryKey: action.filterType === 'albumId' ? action.filterValue : '',
                page: 1,
                pages,
                pagePhotos,
            };
        }
        case ACTIONS.setPhotos: {
            let pagePhotos, pages;
            if (state.filterType === 'title' && state.filterValue) {
                const filtered = action.photos.filter((p: Photo) => p.title.toLowerCase().includes(state.filterValue.toLowerCase()));
                pagePhotos = filtered.slice(0, PAGE_SIZE);
                pages = Math.ceil(filtered.length / PAGE_SIZE);
            } else {
                pagePhotos = action.photos.slice(0, PAGE_SIZE);
                pages = Math.ceil(action.photos.length / PAGE_SIZE);
            }
            return {
                ...state,
                page: 1,
                pages,
                allPhotos: action.photos,
                pagePhotos,
            }
        }
        default: {
            throw Error('Unknown action.');
        }
    }
}

interface State {
    page: number;
    pages: number;
    filterValue: string;
    filterType: string;
    pagePhotos: Photo[];
    allPhotos: Photo[];
    queryKey: string;
}

export function Photos() {

    const setSearchParamsDebounced = React.useRef(
        debounce((searchParams) => {
            setSearchParams(searchParams);
        }, 500)
    ).current;

    const [searchParams, setSearchParams] = useSearchParams();
    const [state, dispatch]: [State, any] = useReducer(reducer, {}, () => {
        let filterValue = searchParams.get("filter") || '';
        let filterType = searchParams.get("filterType") || 'albumId';
        let page = Number.parseInt(searchParams.get("page") || '1');
        return {
            page,
            pages: 1,
            filterValue,
            filterType,
            allPhotos: [],
            pagePhotos: [],
            queryKey: filterType === 'albumId' ? filterValue : '',
        }
    })

    const {isLoading, isError, error} = useQuery<Photo[]>({
        queryKey: ['photos', state.queryKey],
        queryFn: async () => {
            const result = await getPhotos(state.filterType, state.filterValue);
            dispatch({
                type: ACTIONS.setPhotos,
                photos: result
            })
            return result;
        },
    })

    useEffect(() => {
        let filterValue = searchParams.get("filter") || '';
        let filterType = searchParams.get("filterType") || 'albumId';
        if (filterValue != state.filterValue || filterType != state.filterType) {
            dispatch({
                type: ACTIONS.setFilter,
                filterValue,
                filterType,
            })
            return;
        }

        let page = Number.parseInt(searchParams.get("page") || '1');
        if (page !== state.page) {
            dispatch({
                type: ACTIONS.setPage,
                page: page,
            })
        }
    }, [searchParams]);

    function pageChange(num: number) {
        searchParams.set('page', num.toString(10));
        setSearchParams(searchParams);
    }

    function onFilterChange(e: any) {
        searchParams.set('filter', e.target.value);
        searchParams.set('filterType', state.filterType);
        searchParams.set('page', '1');
        setSearchParamsDebounced(searchParams);
    }

    function onFilterTypeChange(e: any) {
        searchParams.set('filterType', e.target.value);
        if (state.filterValue.length > 0) {
            searchParams.set('page', '1');
        }
        setSearchParams(searchParams);
    }

    if (isLoading) {
        return <div>Loading...</div>
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
                    <input type="text" defaultValue={state.filterValue}
                           className="w-full border-2 bordr-gray-200 rounded-lg p-2" onChange={onFilterChange}/>
                </div>

                <div>
                    <label className="block font-bold">Filter type</label>
                    <select onChange={onFilterTypeChange} value={state.filterType}
                            className="border-2 border-gray-200 rounded-lg p-2">
                        <option value="albumId">Album ID</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>

            <h1 className="text-4xl font-bold my-4">Photos</h1>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {state.pagePhotos?.map((photo) => (
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

            <Paginator currentPageNum={state.page} totalPagesCount={state.pages} pageChanged={pageChange}/>
        </div>
    );
}