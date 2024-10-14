import React, {useMemo} from 'react';
import {POSTS_MOCK} from "../../mocks/posts.mock";
import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";

const PAGE_SIZE = 5;

export function Posts() {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = useMemo(() => {
        return Number.parseInt(searchParams.get("page") || '1');
    }, [searchParams]);

    const posts = useMemo(() => {
        let start = (page - 1) * PAGE_SIZE;
        let end = start + PAGE_SIZE;
        return POSTS_MOCK.slice(start, end);
    }, [page])

    const pages = Math.ceil(POSTS_MOCK.length / PAGE_SIZE);

    function pageChange(num: number) {
        setSearchParams({'page': num.toString(10)});
    }

    return (<div>

        <nav aria-label="breadcrumb">
            <ol className="flex flex-row gap-2">
                <li className="breadcrumb-item"><a className="text-blue-600 visited:text-purple-600"
                                                   href="/dashboard">Dashboard</a></li>
                <li>/</li>
                <li className="breadcrumb-item active" aria-current="page">Posts</li>
            </ol>
        </nav>

        <h1 className="text-4xl font-bold my-4">Posts</h1>

        {/* todo filters */}

        <div className="m-2">
            <table className="table">
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
                    <th scope="row">{post.id}</th>
                    <td><a className="text-nowrap" href={"/users/" + post.userId}>User {post.userId}</a></td>
                    <td><a className="" href={"posts/" + post.id}>{post.title}</a></td>
                    <td>{post.body}</td>
                </tr>)}
                </tbody>
            </table>

            <Paginator currentPageNum={page} totalPagesCount={pages} pageChanged={pageChange}></Paginator>

        </div>
    </div>);
}