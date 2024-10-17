import React, {useMemo} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
// import {getPhotoById} from "../../services/photo-api";
// import classNames from "classnames";
import {getAlbumById} from "../../services/album-api";
// import {Paginator} from "../Paginator";
import {getPhotos} from "../../services/photo-api";
import {Paginator} from "../Paginator";
import {Photo} from "../../model/photo";

const PAGE_SIZE = 5;

export const Album = () => {
    const {id} = useParams();
    // const [showImg, setShowImg] = React.useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [photos, setPhotos] = React.useState<Photo[]>([]);

    const pageChange = (page: number) => {
        searchParams.set('page', page.toString());
    }

    useQueryClient();
    const albumQuery = useQuery({queryKey: ['album', id], queryFn: () => getAlbumById(id || '0')});
    const photosQuery = useQuery({
        queryKey: ['photos', id],
        queryFn: async () => {
            const result = await getPhotos(id);
            setPhotos(result);
            setPages(Math.ceil(result.length / PAGE_SIZE));
            return result;
        }
    });

    const pagePhotos = useMemo(() => {
        let start = page - 1 * PAGE_SIZE;
        let end = start + PAGE_SIZE;
        return photos.slice(start, end);
    }, [page, photos]);

    if (albumQuery.isPending || photosQuery.isPending) {
        return <div>Loading...</div>
    }

    if (albumQuery.isError || photosQuery.isError) {
        return <div className="p-2">
            {'An error has occurred: ' + (albumQuery.error || photosQuery.error)}
        </div>
    }

    if (!albumQuery.data || !photosQuery.data) {
        return <div className="p-2">
            <h1>Photo not found</h1>
        </div>
    }

    return <div className="p-2">
        <ol className="flex flex-row gap-2">
            <li className="">
                <a className="text-blue-600 visited:text-purple-600"
                   href="/dashboard">Dashboard</a>
            </li>
            <li>/</li>
            <li className="" aria-current="page">
                <a
                    className="text-blue-600 visited:text-purple-600"
                    href="/albums">Albums</a>
            </li>
            <li>/</li>
            <li className="font-bold text-blue-700" aria-current="page">{id}</li>
        </ol>

        <h1>{albumQuery.data.title}</h1>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pagePhotos.map((photo) => (
                <a key={photo.id}
                   className="border border-gray-200 rounded-lg overflow-hidden text-blue-600 visited:text-purple-600"
                   href={'/photos/' + photo.id}
                >
                    {/*<a  className="text-blue-600 visited:text-purple-600">*/}
                        <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl.split('/').pop()}
                             className="bg-gray-200 object-cover w-full h-[200px]"></img>
                        <div className="p-1 line-clamp-2">{photo.title}</div>
                    {/*</a>*/}
                </a>
            ))}
        </div>


        <Paginator currentPageNum={page} totalPagesCount={pages} pageChanged={pageChange}/>


        {/*<img src={query.data.url}*/
        }
        {/*     alt={query.data.url.split('/').pop()}*/
        }
        {/*     onLoad={() => setShowImg(true)}*/
        }
        {/*     onError={() => setShowImg(true)}*/
        }
        {/*     className={classNames([*/
        }
        {/*         "w-auto bg-gray-200 rounded-lg h-[300px] md:h-[600px] object-cover m-auto",*/
        }
        {/*     ])}*/
        }
        {/*/>*/
        }
        {/*{!showImg && <div>Loading...</div>}*/
        }
    </div>
}