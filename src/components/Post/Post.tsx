import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {getPostById} from "../../services/post-api";
import {Loader} from "../Loader";

export const Post = () => {
    const {id} = useParams();
    const {isPending, isError, data: post, error} = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostById(id || '0'),
    })

    if(isPending){
        return <Loader/>
    }
    if(isError){
        return <div>{'Error: '+error}</div>
    }

    return (<div className="p-2">
        <ol className="flex flex-row gap-2">
            <li className="breadcrumb-item">
                <a className="text-blue-600 visited:text-purple-600"
                   href="/dashboard">Dashboard</a>
            </li>
            <li>/</li>
            <li className="breadcrumb-item">
                <a className="text-blue-600 visited:text-purple-600"
                   href="/posts">Posts</a>
            </li>
            <li>/</li>
            <li className="font-bold text-blue-700">{id}</li>
        </ol>
        <h1 className="font-bold text-4xl mt-3">{post?.title}</h1>
        <p>{post?.body}</p>
    </div>)
}