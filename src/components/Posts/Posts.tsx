import {ChangeEvent, useMemo} from 'react';
import {useSearchParams} from 'react-router-dom';
import {debounce} from 'lodash';
import {Loader} from '../Loader';
import {usePosts} from '../../hooks/usePosts.ts';
import {PostsTable} from './PostsTable.tsx';
import {FilterBar} from '../FilterBar.tsx';
import {getCommonSearchParams} from '../../services/utils.ts';
import {FILTER_TYPE_PARAM, FILTER_VALUE_PARAM, PAGE_PARAM} from '../../services/consts.ts';

const PAGE_SIZE = 5;
const POSTS_FILTER_TYPES = [
    {value: 'userId', title: 'User ID'},
    {value: 'title', title: 'Title'}
];

export function Posts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const {filterType, filterValue, page} = getCommonSearchParams(searchParams, 'userId');
    const userId = filterType === 'userId' ? filterValue : '';
    const title = filterType === 'title' ? filterValue : '';

    const {isPending, isError, error, posts, pages} = usePosts(userId, title, page, PAGE_SIZE);

    function onPageChange(num: number) {
        searchParams.set('page', num.toString());
        setSearchParams(searchParams);
    }

    const setSearchParamsDebounced = useMemo(() =>
        debounce((searchParams) => {
            setSearchParams(searchParams);
        }, 500), [setSearchParams]
    );

    function onFilterChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (value) {
            searchParams.set(FILTER_VALUE_PARAM, value);
        } else {
            searchParams.delete(FILTER_VALUE_PARAM);
        }
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
            defaultFilter={filterValue}
            onFilterChange={onFilterChange}
            onFilterTypeChange={onFilterTypeChange}
            defaultFilterType={filterType}
            filterTypes={POSTS_FILTER_TYPES}
        />

        <PostsTable posts={posts} page={page} pages={pages} onPageChange={onPageChange} />

    </div>;
}