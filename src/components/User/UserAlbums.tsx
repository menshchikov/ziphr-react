import {useQuery} from "@tanstack/react-query";
import {getAlbums} from "../../services/album-api";

export function UserAlbums(props: { userId: string | undefined }) {
    const {isPending, isError, data: albums, error} = useQuery({
        queryKey: ['albums', props.userId],
        queryFn: () => getAlbums(props.userId),
    });
    if (isPending) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>{'Error: ' + error}</div>
    }
    return <div>
        {albums?.map(album => {
            return <a href={'/albums/' + album.id}
                      className="text-blue-600 visited:text-purple-600 block py-2">
                {album.title}
            </a>
        })}
    </div>;
}