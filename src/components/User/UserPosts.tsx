import {useQuery} from "@tanstack/react-query";
import {getPosts} from "../../services/post-api";

export function UserPosts(props: { userId: string | undefined }) {
    const {isPending, isError, data: posts, error} = useQuery({
        queryKey: ['posts', props.userId],
        queryFn: () => getPosts(props.userId),
    });
    if (isPending) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>{'Error: ' + error}</div>
    }
    return <div>
        {posts?.map(post => {
            return <div className="py-2">
                <a href={'/posts/' + post.id}
                   className="line-clamp-1 text-blue-600 visited:text-purple-600">{post.title}</a>
                <div className="line-clamp-1">{post.body}</div>
            </div>
        })}
    </div>;
}