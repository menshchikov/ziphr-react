import {useParams} from 'react-router-dom';
import {Loader} from '../Loader';
import {usePost} from '../../hooks/usePost.ts';

export const Post = () => {
    const {id} = useParams();
    const {isPending, isError, data: post, error} = usePost(id)

    if(isPending){
        return <Loader/>
    }
    if(isError){
        return <div>{'Error: '+error}</div>
    }

    return (<div className="p-2">
        <ol className="flex flex-row gap-2">
            <li className="breadcrumb-item">
                <a className="link"
                    href="/dashboard">Dashboard</a>
            </li>
            <li>/</li>
            <li className="breadcrumb-item">
                <a className="link"
                    href="/posts">Posts</a>
            </li>
            <li>/</li>
            <li className="font-bold text-blue-700">{id}</li>
        </ol>
        <h1 className="font-bold text-4xl mt-3">{post?.title}</h1>
        <p>{post?.body}</p>
    </div>)
}