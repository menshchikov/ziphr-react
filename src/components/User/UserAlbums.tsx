import {Loader} from '../Loader';
import {useAlbums} from '../../hooks/useAlbums.ts';

export function UserAlbums(props: { userId: string | undefined }) {
    const {isPending, isError, albums, error} = useAlbums(props.userId);
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