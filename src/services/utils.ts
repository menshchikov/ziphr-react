export function paginateArray<T>(array: Array<T>, page: number, size: number): T[] {
    const start = (page - 1) * size;
    const end = start + size;
    return array.slice(start, end);
}

export function filterArrayByTitle<T extends {title: string}>(items: T[], filter: string): T[] {
    const filterLowerCase = filter.toLowerCase();
    return items.filter(item => item.title.toLowerCase().indexOf(filterLowerCase) > -1);
}

export function getCommonSearchParams(searchParams: URLSearchParams, defaultFilterType: string = '') {
    const filterType = searchParams.get('filterType') || defaultFilterType;
    const filterValue = searchParams.get('filter') || '';
    const page = Number(searchParams.get('page')) || 1;
    return {filterType, filterValue, page};
}