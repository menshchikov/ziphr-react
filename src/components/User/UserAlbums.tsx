import {Loader} from '../Loader';
import {useAlbums} from '../../hooks/useAlbums.ts';

export const UserAlbums = (props: { userId: string | undefined }) => {
    const {isPending, isError, items: albums, error} = useAlbums(props.userId);
    if (isPending) {
        return <Loader/>
    }
    if (isError) {
        return <div>{'Error: ' + error}</div>
    }
    return <div className="p-2">
        {albums?.map(album =>
            <a key={album.id}
               href={'/albums/' + album.id}
               className="link block py-2">
                {album.title}
            </a>)}
    </div>;
}