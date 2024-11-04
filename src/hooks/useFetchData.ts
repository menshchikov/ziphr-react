import {useQuery} from "@tanstack/react-query";
import {paginateArray} from "../services/utils.ts";

export const useFetchData = <T extends { title: string }>(
    queryKey: string[],
    fetchFn: () => Promise<T[]>,
    title: string = '',
    page: number = 1,
    pageSize?: number
) => {
    const { isPending, data, isError, error } = useQuery({
        queryKey,
        queryFn: fetchFn,
    });

    let items: T[] = data || [];
    if (title) {
        const titleLowerCase = title.toLowerCase();
        items = items.filter(item => item.title.toLowerCase().indexOf(titleLowerCase) > -1);
    }
    let pages = 1;
    if (pageSize) {
        pages = Math.ceil(items.length / pageSize);
        items = paginateArray(items, page, pageSize);
    }
    return { isPending, isError, error, items, pages };
};