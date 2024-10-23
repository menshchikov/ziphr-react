import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {debounce} from "lodash";
import {getPosts} from "../../services/post-api";
import {Loader} from "../Loader";
import {getSlicedArray} from "../../services/utils.ts";
import {useRef} from "react";
import {Post} from "../../model/post.ts";

const PAGE_SIZE = 5;

interface PostsTableProps {
    postsCollection: {
        pages: number;
        posts: Post[]
    } | undefined;
    page: number;
    pageChange: (num: number) => void;
}

function PostsTable(props: PostsTableProps) {
    const {postsCollection, page, pageChange} = props;
    return <>
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
            {postsCollection?.posts.map(post => <tr key={post.id}>
                <th className="border-b border-r-gray-200">{post.id}</th>
                <td className="border-b border-r-gray-200"><a
                    className="text-blue-600 visited:text-purple-600 text-nowrap"
                    href={"/users/" + post.userId}>User {post.userId}</a></td>
                <td className="border-b border-r-gray-200"><a className="text-blue-600 visited:text-purple-600"
                                                              href={"posts/" + post.id}>{post.title}</a></td>
                <td className="border-b border-r-gray-200">{post.body}</td>
            </tr>)}
            </tbody>
        </table>

        <Paginator currentPageNum={page} totalPagesCount={postsCollection?.pages || 1} pageChanged={pageChange}></Paginator>
    </>;
}

export function Posts() {
    const [searchParams, setSearchParams] = useSearchParams();

    useQueryClient();
    const {isPending, data:postsCollection, isError, error} = useQuery({
        queryKey: ['posts', searchParams.toString()],
        queryFn: async () => {
            const filter = searchParams.get('filter');
            const type = searchParams.get('filterType');
            const page = Number(searchParams.get('page')) || 1;
            const userId = filter && type !== 'title' ? filter : undefined;
            let posts = await getPosts(userId);
            if (filter && type === 'title') {
                posts = posts.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))
            }
            const pages = Math.ceil(posts.length / PAGE_SIZE);
            posts = getSlicedArray(posts, page, PAGE_SIZE)
            return {posts, pages};
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
                <label className="block font-bold">Filter</label>
                <input type="text" defaultValue={searchParams.get('filter') || ''}
                       className="w-full border-2 bordr-gray-200 rounded-lg p-2" onChange={onFilterChange}/>
            </div>

            <div>
                <label className="block font-bold">Filter type</label>
                <select onChange={onFilterTypeChange} value={searchParams.get('filterType') || 'userId'}
                        className="border-2 border-gray-200 rounded-lg p-2">
                    <option value="userId">User ID</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </div>
        {isPending
            ? <Loader/>
            : <PostsTable postsCollection={postsCollection} page={Number(searchParams.get('page')) || 1}
                          pageChange={pageChange}/>
        }
    </div>);
}