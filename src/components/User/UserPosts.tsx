import {Loader} from '../Loader';
import {usePosts} from '../../hooks/usePosts.ts';
import {Post} from '../../model/post.ts';

export const UserPosts = (props: { userId: string | undefined }) => {
    const {isPending, isError, items: posts, error} = usePosts(props.userId);
    if (isPending) {
        return <Loader/>
    }
    if (isError) {
        return <div>{'Error: ' + error}</div>
    }
    return <div className="p-2">
        {posts?.map((post: Post) =>
            <div key={post.id} className="py-2">
                <a href={'/posts/' + post.id}
                    className="line-clamp-1 link">{post.title}</a>
                <div className="line-clamp-1">{post.body}</div>
            </div>)}
    </div>;
}