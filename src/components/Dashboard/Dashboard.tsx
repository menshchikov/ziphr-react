import React from 'react';

export function Dashboard() {
    let postsCount = 5;
    let albumsCount = 6;
    let photosCount = 7;
    return (<>
            {/*<div>Dashboard</div>*/}

            <div className="px-5 py-3 bg-gray-600 text-white" data-ref="header">
                Welcome to
                <h1>My App</h1>
            </div>

            <div className="p-1">

                {/*<div *ngIf="(isLoading$|async) === true"*/}
                {/*data-ref="loading-indicator"*/}
                {/*className="spinner-border m-2"*/}
                {/*role="status">*/}
                {/*<span className="visually-hidden">Loading...</span>*/}
                {/*</div>*/}

                {/*<app-error-msg *ngIf="state?.error && !state.isLoading" [error]="state.error"></app-error-msg>*/}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">

                    {/*<div className="columns-md col-md-6 p-2">*/}
                    <div data-ref="statistics-card" className="border border-solid border-gray-500 p-2 rounded-lg">
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
                    {/*</div>*/}

                    {/*<div className="col-lg-4 col-md-6 p-2">*/}
                    <div data-ref="statistics-card" className="border border-solid border-gray-500 p-2 rounded-lg">
                        <div className="font-bold pb-1">Latest Posts</div>
                        <div className="card-body">
                            latest posts items here
                            {/*    <div *ngFor="let post of state.latestPosts"*/}
                            {/*    className="text-truncate overflow-hidden py-1"*/}
                            {/*    >*/}
                            {/*    <a [routerLink]="'/posts/'+post.id">{{post.title}}</a>*/}
                            {/*<div className="text-truncate overflow-hidden">{{post.body}}</div>*/}
                        </div>
                    </div>
                    {/*</div>*/}
                    {/*</div>*/}

                    {/*<div className="col-lg-4 col-md-6 p-2">*/}
                    <div data-ref="statistics-card" className="border border-solid border-gray-500 p-2 rounded-lg">
                        <div className="font-bold pb-1">Recent Photos</div>
                        <div className="card-body">
                            recent photos list
                            {/*<div className="row">*/}
                            {/*    <div *ngFor="let photo of state.latestPhotos"*/}
                            {/*    className="col-4 p-3">*/}
                            {/*    <img [src]="photo.thumbnailUrl" className="img-thumbnail">*/}
                            {/*    <div className="text-truncate overflow-hidden bg-light">*/}
                            {/*        <a [routerLink]="'/photos/'+photo.id">{{photo.title}}</a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    {/*</div>*/}
                </div>
                {/*</div>*/}

            </div>
        </>

    );
}