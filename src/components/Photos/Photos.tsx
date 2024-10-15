import React, {useMemo} from 'react';
import {Paginator} from "../Paginator";
import {useSearchParams} from "react-router-dom";
import {PHOTOS_MOCK} from "../../mocks/photos.mock";
import {Photo} from "../../model/photo";

const PAGE_SIZE = 8;

export function Photos(){
    const [searchParams, setSearchParams] = useSearchParams();

    const page = useMemo(() => {
        return Number.parseInt(searchParams.get("page") || '1');
    }, [searchParams]);

    const photos: Photo[] = useMemo(() => {
        let start = (page - 1) * PAGE_SIZE;
        let end = start + PAGE_SIZE;
        return PHOTOS_MOCK.slice(start, end);
    }, [page])

    const pages = Math.ceil(PHOTOS_MOCK.length / PAGE_SIZE);

    function pageChange(num: number) {
        setSearchParams({'page': num.toString(10)});
    }

    return(
        <div className="p-2">
            <ol className="flex flex-row gap-2">
                <li className="breadcrumb-item">
                    <a className="text-blue-600 visited:text-purple-600"
                       href="/dashboard">Dashboard</a>
                </li>
                <li>/</li>
                <li className="breadcrumb-item active" aria-current="page">Photos</li>
            </ol>

            <h1 className="text-4xl font-bold my-4">Photos</h1>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl.split('/').pop()} className="bg-gray-200 object-cover w-full h-[200px]"></img>
                        <div className="p-1 line-clamp-1">{photo.title}</div>
                    </div>))}
            </div>

            <Paginator currentPageNum={page} totalPagesCount={pages} pageChanged={pageChange}/>
        </div>
    );
}