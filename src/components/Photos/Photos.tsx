import {ChangeEvent, useMemo} from 'react';
import {Paginator} from '../Paginator';
import {useSearchParams} from 'react-router-dom';
import {debounce} from 'lodash';
import {Loader} from '../Loader';
import {usePhotos} from '../../hooks/usePhotos.ts';
import {getCommonSearchParams} from '../../services/utils.ts';
import {FilterBar} from '../FilterBar.tsx';
import {FILTER_TYPE_PARAM, FILTER_VALUE_PARAM, PAGE_PARAM} from '../../services/consts.ts';

const PAGE_SIZE = 5;
const PHOTOS_FILTER_TYPES = [
    {value: 'albumId', title: 'Album ID'},
    {value: 'title', title: 'Title'}
]

export const Photos = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const {filterType, filterValue, page} = getCommonSearchParams(searchParams, 'albumId');
    const albumId = filterType === 'albumId' ? filterValue : '';
    const title = filterType === 'title' ? filterValue : '';
    const {isPending, isError, error, items: photos, pages} = usePhotos(albumId, title, page, PAGE_SIZE);

    const setSearchParamsDebounced = useMemo(() =>
        debounce((searchParams) => {
            setSearchParams(searchParams);
        }, 500), [setSearchParams]
    );

    function pageChange(num: number) {
        searchParams.set(PAGE_PARAM, num.toString(10));
        setSearchParams(searchParams);
    }

    function onFilterChange(e: ChangeEvent<HTMLInputElement>) {
        searchParams.set(FILTER_VALUE_PARAM, e.target.value);
        searchParams.set(FILTER_TYPE_PARAM, filterType);
        searchParams.set(PAGE_PARAM, '1');
        setSearchParamsDebounced(searchParams);
    }

    function onFilterTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        searchParams.set(FILTER_TYPE_PARAM, e.target.value);
        searchParams.set(PAGE_PARAM, '1');
        setSearchParams(searchParams);
    }

    if (isPending) {
        return <Loader/>
    }
    if (isError) {
        return <div>{'Error: ' + error}</div>
    }

    return (
        <div className="p-2">
            <ol className="flex flex-row gap-2">
                <li className="breadcrumb-item">
                    <a className="link"
                       href="/dashboard">Dashboard</a>
                </li>
                <li>/</li>
                <li className="breadcrumb-item active" aria-current="page">Photos</li>
            </ol>

            <FilterBar
                defaultFilter={filterValue}
                onFilterChange={onFilterChange}
                onFilterTypeChange={onFilterTypeChange}
                defaultFilterType={filterType}
                filterTypes={PHOTOS_FILTER_TYPES}
            />

            <h1 className="text-4xl font-bold my-4">Photos</h1>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {photos?.map((photo) => (
                    <div key={photo.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <a href={'/photos/' + photo.id} className="link">
                            <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl.split('/').pop()}
                                 className="bg-gray-200 object-cover w-full h-[200px]"></img>
                            <div className="p-1 line-clamp-1">{photo.title}</div>
                        </a>
                        <a href={'/albums/' + photo.albumId} className="link p-1">View
                            album</a>
                    </div>))}
            </div>

            <Paginator currentPageNum={page} totalPagesCount={pages} onPageChange={pageChange}/>
        </div>
    );
}