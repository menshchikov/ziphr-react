import {Loader} from '../Loader';
import {usePhotos} from '../../hooks/usePhotos.ts';

export function AlbumCardPhotos(props: { albumId: number }) {
    const {isPending, isError, items: photos, error} = usePhotos(props.albumId.toString(), '', 1, 4);

    if (isPending) {
        return <Loader/>
    }
    if (isError) {
        return <div className="p-2">{'Error: ' + error}</div>
    }
    return <div className="p-2 grid grid-cols-4 gap-2">
        {photos.map(photo => <a href={'/photos/' + photo.id} key={photo.id}>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl.split('/').pop()}
                    className="w-full h-[4rem] object-cover"/>
            </div>
        </a>)}
    </div>;
}