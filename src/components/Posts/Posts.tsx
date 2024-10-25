import {useRef} from 'react';
import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {debounce} from "lodash";
import {getPosts} from "../../services/post-api";
import {Loader} from "../Loader";
import {getSlicedArray} from "../../services/utils.ts";
import {Post} from "../../model/post.ts";

const PAGE_SIZE = 5;

export function getFilteredPostsByTitle(posts: Post[], filter: string) {
    return posts.filter((a: Post) => a.title.indexOf(filter) > -1);
}

export function Posts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filterType = searchParams.get('filterType') || 'userId';
    const filter = searchParams.get('filter') || '';
    const userId = filterType === 'userId' ? filter : '';
    const page = Number(searchParams.get('page')) || 1;
    console.log('fType:',filterType,' filter:', filter,' p:', page);

    useQueryClient();
    const {isPending, data, isError, error} = useQuery({
        queryKey: ['posts', userId],
        queryFn: () => getPosts(userId),
    });

    let posts = data || [];
    if(filterType === 'title'){
        if(filter){
            posts = getFilteredPostsByTitle(posts, filter);
        }
    }
    const pages = Math.ceil(posts.length / PAGE_SIZE);
    posts = getSlicedArray(posts, page, PAGE_SIZE)

    console.log('loading:', isPending, ' data:', data?.length, 'pages:', pages, 'posts: ', posts.length);

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
        if(value) {
            searchParams.set("filter", value);
        }else{
            searchParams.delete("filter");
        }
        searchParams.set('page', '1');
        setSearchParamsDebounced(searchParams)
    }

    function onFilterTypeChange(e: any) {
        const value = e.target.value;
        searchParams.set("filterType", value);
        searchParams.set('page', '1');
        setSearchParams(searchParams)
    }

    if(isPending) {
        return <Loader/>
    }
    if (isError) {
        return <div>{'Error: '+error}</div>
    }

    return (<div className="p-2">

        <ol className="flex flex-row gap-2">
            <li className="breadcrumb-item">
                <a className="text-blue-600 visited:text-purple-600"
                   href="/dashboard">Dashboard</a>
            </li>
            <li>/</li>
            <li className="font-bold text-blue-700">Posts</li>
        </ol>

        <h1 className="text-4xl font-bold my-4">Posts</h1>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
                <label htmlFor="filter" className="block font-bold">Filter</label>
                <input id="filter" type="text" defaultValue={filter}
                       className="w-full border-2 bordr-gray-200 rounded-lg p-2" onChange={onFilterChange}/>
            </div>

            <div>
                <label htmlFor="filterType" className="block font-bold">Filter type</label>
                <select id="filterType" onChange={onFilterTypeChange} value={filterType}
                        className="border-2 border-gray-200 rounded-lg p-2">
                    <option value="userId">User ID</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </div>

        <table cellSpacing={5} cellPadding={5} className="table mt-3">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">User</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
            </tr>
            </thead>
            <tbody>
            {posts.map(post => <tr key={post.id}>
                <th className="border-b border-r-gray-200">{post.id}</th>
                <td className="border-b border-r-gray-200"><a className="text-blue-600 visited:text-purple-600 text-nowrap" href={"/users/" + post.userId}>User {post.userId}</a></td>
                <td className="border-b border-r-gray-200"><a className="text-blue-600 visited:text-purple-600" href={"posts/" + post.id}>{post.title}</a></td>
                <td className="border-b border-r-gray-200">{post.body}</td>
            </tr>)}
            </tbody>
        </table>

        <Paginator currentPageNum={page} totalPagesCount={pages} pageChanged={pageChange}></Paginator>
    </div>);
}