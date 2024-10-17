import {Photo} from "../../model/photo";
import {AlbumState} from "./album-state";
import {AlbumActions} from "./album-actions";

const PAGE_SIZE = 5;

function getSlicedArray<T>(array: Array<T>, page: number, size: number): T[] {
    const start = (page - 1) * size;
    const end = start + size;
    return array.slice(start, end);
}

function getFilteredByTitle(photos: Photo[], filter: string) {
    return photos.filter((p: Photo) => p.title.indexOf(filter) > -1);
}

export function albumReducer(state: AlbumState, action: any): AlbumState {
    switch (action.type) {
        case AlbumActions.setPhotos: {
            let filteredPhotos = state.filter ? getFilteredByTitle(action.photos, state.filter) : action.photos;
            return {
                ...state,
                photos: action.photos,
                filteredPhotos,
                pages: Math.ceil(filteredPhotos.length / PAGE_SIZE),
                pagePhotos: getSlicedArray(filteredPhotos, state.page, PAGE_SIZE),
            }
        }
        case AlbumActions.setPage: {
            return {
                ...state,
                page: action.page,
                pagePhotos: getSlicedArray(state.filteredPhotos, action.page, PAGE_SIZE),
            }
        }
        case AlbumActions.setFilter: {
            let filteredByTitle = getFilteredByTitle(state.photos, action.filter);
            return {
                ...state,
                filter: action.filter,
                filteredPhotos: filteredByTitle,
                pages: Math.ceil(filteredByTitle.length / PAGE_SIZE),
                pagePhotos: getSlicedArray(filteredByTitle, state.page, PAGE_SIZE),
            }
        }
        default: {
            throw new Error('Unknown action');
        }
    }
}