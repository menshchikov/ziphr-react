import {Post} from '../../model/post.ts';
import {Paginator} from '../Paginator.tsx';
import './PostsTable.css';


type Props = { posts: Post[], page: number, pages: number, onPageChange: (num: number) => void };

export const PostsTable = ({posts, page, pages, onPageChange}: Props) => {
    return <>
        <table cellSpacing={5} cellPadding={5} className="mt-3">
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
                    <th>{post.id}</th>
                    <td>
                        <a
                            className="link text-nowrap"
                            href={'/users/' + post.userId}
                        >User {post.userId}</a>
                    </td>
                    <td>
                        <a className="link"
                            href={'posts/' + post.id}
                        >{post.title}</a>
                    </td>
                    <td>{post.body}</td>
                </tr>)}
            </tbody>
        </table>

        <Paginator currentPageNum={page} totalPagesCount={pages} onPageChange={onPageChange}></Paginator>
    </>;
}