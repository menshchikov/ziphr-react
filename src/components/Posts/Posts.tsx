import {ChangeEvent, useRef} from 'react';
import {useSearchParams} from "react-router-dom";
import {debounce} from "lodash";
import {Loader} from "../Loader";
import {usePosts} from "./usePosts.ts";
import {PostsTable} from "./PostsTable.tsx";
import {FilterBar} from "./FilterBar.tsx";

const PAGE_SIZE = 5;

export function Posts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filterType = searchParams.get('filterType') || 'userId';
    const filter = searchParams.get('filter') || '';
    const page = Number(searchParams.get('page')) || 1;
    const filterTypes = [{value: 'userId', title: 'User ID'}, {value: 'title', title: 'Title'}]

    const {isPending, isError, error, posts, pages} = usePosts(filterType, filter, page, PAGE_SIZE);

    function onPageChange(num: number) {
        searchParams.set('page', num.toString());
        setSearchParams(searchParams);
    }

    const setSearchParamsDebounced = useRef(
        debounce((searchParams) => {
            setSearchParams(searchParams);
        }, 500)
    ).current;

    function onFilterChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (value) {
            searchParams.set("filter", value);
        } else {
            searchParams.delete("filter");
        }
        searchParams.set('page', '1');
        setSearchParamsDebounced(searchParams)
    }

    function onFilterTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        searchParams.set("filterType", value);
        searchParams.set('page', '1');
        setSearchParams(searchParams)
    }

    if (isPending) {
        return <Loader/>
    }
    if (isError) {
        return <div>{'Error: ' + error}</div>
    }

    return <div className="p-2">

        <ol className="flex flex-row gap-2">
            <li className="breadcrumb-item">
                <a className="link"
                    href="/dashboard">Dashboard</a>
            </li>
            <li>/</li>
            <li className="font-bold text-blue-700">Posts</li>
        </ol>

        <h1 className="text-4xl font-bold my-4">Posts</h1>

        <FilterBar
            defaultFilter={filter}
            onFilterChange={onFilterChange}
            onFilterTypeChange={onFilterTypeChange}
            defaultFilterType={filterType}
            filterTypes={filterTypes}
        ></FilterBar>

        <PostsTable posts={posts} page={page} pages={pages} onPageChange={onPageChange} ></PostsTable>

    </div>;
}