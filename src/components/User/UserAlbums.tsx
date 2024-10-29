import {useQuery} from "@tanstack/react-query";
import {getAlbums} from "../../services/album-api";
import {Loader} from "../Loader";

export function UserAlbums(props: { userId: string | undefined }) {
    const {isPending, isError, data: albums, error} = useQuery({
        queryKey: ['albums', props.userId],
        queryFn: () => getAlbums(props.userId),
    });
    if (isPending) {
        return <Loader/>
    }
    if (isError) {
        return <div>{'Error: ' + error}</div>
    }
    return <div className="p-2">
        {albums?.map(album => {
            return <a href={'/albums/' + album.id}
                className="link block py-2">
                {album.title}
            </a>
        })}
    </div>;
}