import {Post} from '../../model/post.ts';
import {Paginator} from '../Paginator.tsx';
import './PostsTable.css';


type Props = { posts: Post[], page: number, pages: number, onPageChange: (num: number) => void };

export function PostsTable({posts, page, pages, onPageChange}: Props) {
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
                {posts.map(post => <tr key={post.id}>
                    <th className="table-cell">{post.id}</th>
                    <td className="table-cell">
                        <a
                            className="link text-nowrap"
                            href={'/users/' + post.userId}
                        >User {post.userId}</a>
                    </td>
                    <td className="table-cell">
                        <a className="link"
                            href={'posts/' + post.id}
                        >{post.title}</a>
                    </td>
                    <td className="table-cell">{post.body}</td>
                </tr>)}
            </tbody>
        </table>

        <Paginator currentPageNum={page} totalPagesCount={pages} onPageChange={onPageChange}></Paginator>
    </>;
}