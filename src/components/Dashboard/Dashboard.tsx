import {POSTS_MOCK} from "../../mocks/posts.mock";
import {PHOTOS_MOCK} from "../../mocks/photos.mock";
import {ALBUMS_MOCK} from "../../mocks/albums.mock";

export function Dashboard() {
    let postsCount = POSTS_MOCK.length;
    let albumsCount = ALBUMS_MOCK.length;
    let photosCount = PHOTOS_MOCK.length;
    let latestPosts = POSTS_MOCK.slice(POSTS_MOCK.length - 5);
    let latestPhotos = PHOTOS_MOCK.slice(PHOTOS_MOCK.length - 5);
    return (<>
            <div className="px-5 py-3 bg-gray-600 text-white" data-ref="header">
                Welcome to
                <h1>My App</h1>
            </div>

            <div className="p-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                    <div className="border border-solid border-gray-500 p-2 rounded-lg">
                        <div className="font-bold pb-1">Statistics</div>
                        <div className="card-body">
                            <div className="row text-nowrap">
                                <div>
                                    <span className="text-[#32cd32] text-2xl font-bold">{postsCount}</span> Posts
                                </div>
                                <div>
                                    <span className="text-[#32cd32] text-2xl font-bold">{albumsCount}</span> Albums
                                </div>
                                <div>
                                    <span className="text-[#32cd32] text-2xl font-bold">{photosCount}</span> Albums
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-solid border-gray-500 p-2 rounded-lg">
                        <div className="font-bold pb-1">Latest Posts</div>
                        <div className="card-body">
                            {latestPosts.map(post =>
                                <div key={post.id} className={"mt-3"}>
                                    <a href={"/posts/" + post.id}
                                       className={"line-clamp-2 text-blue-600 visited:text-purple-600"}>{post.title}</a>
                                    <div className="line-clamp-2 overflow-hidden">{post.body}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border border-solid border-gray-500 p-2 rounded-lg">
                        <div className="font-bold pb-1">Recent Photos</div>
                        <div className="card-body grid grid-cols-3 gap-2">
                            {latestPhotos.map(photo =>
                                <a href={"/photos/" + photo.id} key={photo.id}>
                                    <img src={photo.thumbnailUrl} alt="photo" className="w-[50px] h-[50px]"/>
                                    <div className={"line-clamp-2"}>{photo.title}</div>
                                </a>)}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}