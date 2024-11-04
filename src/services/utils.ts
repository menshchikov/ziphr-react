import {FILTER_TYPE_PARAM, FILTER_VALUE_PARAM, PAGE_PARAM} from './consts.ts';

export function paginateArray<T>(array: Array<T>, page: number, size: number): T[] {
    const start = (page - 1) * size;
    const end = start + size;
    return array.slice(start, end);
}

export function getCommonSearchParams(searchParams: URLSearchParams, defaultFilterType: string = '') {
    const filterType = searchParams.get(FILTER_TYPE_PARAM) || defaultFilterType;
    const filterValue = searchParams.get(FILTER_VALUE_PARAM) || '';
    const page = Number(searchParams.get(PAGE_PARAM)) || 1;
    return {filterType, filterValue, page};
}