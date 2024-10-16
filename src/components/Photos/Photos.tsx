import React, {useEffect, useReducer} from 'react';
import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";
import {PHOTOS_MOCK} from "../../mocks/photos.mock";
import {Photo} from "../../model/photo";
import {debounce} from "lodash";

const PAGE_SIZE = 8;

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'set_page': {
            return {
                ...state,
                page: action.page,
            };
        }
        case 'set_filterValue': {
            return {
                ...state,
                filterValue: action.filterValue,
            };
        }
        case 'set_filterType': {
            return {
                ...state,
                filterValue: action.filterType,
            };
        }
        case 'set_state': {
            return {...action.newState}
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
    photos: Photo[];
}

export function Photos() {
    const setSearchParamsDebounced = React.useRef(
        debounce((searchParams) => {
            setSearchParams(searchParams);
        }, 500)
    ).current;

    const [searchParams, setSearchParams] = useSearchParams();
    const [state, dispatch]: [State, any] = useReducer(reducer, {
        page: 1,
        pages: 1,
        filterValue: '',
        filterType: 'albumId',
        photos: []
    })

    useEffect(() => {
        let page = Number.parseInt(searchParams.get("page") || '1');
        let start = (page - 1) * PAGE_SIZE;
        let end = start + PAGE_SIZE;
        let filterValue = searchParams.get("filter") || '';
        let filterType = searchParams.get("filterType") || 'albumId';
        let photos = PHOTOS_MOCK;
        if (filterValue) {
            if (filterType === 'albumId') {
                let albumId = Number.parseInt(filterValue);
                photos = PHOTOS_MOCK.filter(photo => photo.albumId === albumId);
            } else {
                photos = PHOTOS_MOCK.filter(photo => photo.title.indexOf(filterValue) !== -1);
            }
        }
        let pages = Math.ceil(photos.length / PAGE_SIZE);
        photos = photos.slice(start, end);
        dispatch({
            type: 'set_state', newState: {
                page,
                pages: pages,
                filterValue: filterValue,
                filterType: filterType,
                photos: photos,
            }
        });
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
                {state.photos.map((photo) => (
                    <div key={photo.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <a href={'/photos/' + photo.id} className="text-blue-600 visited:text-purple-600">
                            <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl.split('/').pop()}
                                 className="bg-gray-200 object-cover w-full h-[200px]"></img>
                            <div className="p-1 line-clamp-1">{photo.title}</div>
                        </a>
                        <a href={'/albums/'+photo.albumId } className="text-blue-600 visited:text-purple-600 p-1">View album</a>
                    </div>))}
            </div>

            <Paginator currentPageNum={state.page} totalPagesCount={state.pages} pageChanged={pageChange}/>
        </div>
    );
}