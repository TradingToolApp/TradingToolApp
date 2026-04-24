import React, {useContext} from "react";
import {useRouter} from "next/router";
import FooterOne from "../../components/footer/FooterOne";
import HeaderFive from "../../components/header/HeaderFive";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetYoutubeList from "@/components/widget/WidgetYoutubeVideo";
import {Pagination} from "rsuite";
import {Loader} from "rsuite";
import {getPostsByCategory} from "@/libs/api-client/prisma/post.api";
import {getValueByLanguage} from "@/utils/formatData";
import {AppContext} from "@/providers/app.provider";
import {usePostsByCategory} from "@/hooks/data/admin/usePosts";
import db from "@/libs/prisma/db";

const LIMIT = 8;

const PostCategory = ({slug, ssrData}) => {
    const router = useRouter();
    const {language} = useContext(AppContext);
    const currentPage = parseInt(router.query.page) || 1;

    const {posts, total, category, isFetching, isLoading} = usePostsByCategory(slug, LIMIT, currentPage, ssrData);

    const cateName = category
        ? (getValueByLanguage(category.translations, language)?.cate ?? slug)
        : slug;
    const cateSlug = category?.cate_slug ?? slug;

    const handlePageChange = (page) => {
        router.push(`/category/${slug}?page=${page}`, undefined, {scroll: true});
    };

    return (
        <>
            <HeadMeta metaTitle={cateName}/>
            <HeaderFive/>
            <Breadcrumb bCat={cateSlug} cateTitle={cateName}/>
            <div className="banner banner__default bg-grey-light-three shadow-dark rounded-2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">{cateName}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 d-flex flex-column">
                            <div className="axil-content flex-grow-1" style={{position: 'relative'}}>
                                {isFetching && (
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'rgba(255,255,255,0.65)',
                                        zIndex: 10,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        minHeight: '200px',
                                    }}>
                                        <Loader size="md"/>
                                    </div>
                                )}
                                {isLoading
                                    ? <div style={{minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Loader size="lg"/>
                                    </div>
                                    : posts.map((data) => (
                                        <PostLayoutTwo data={data} postSizeMd={true} key={data.slug}/>
                                    ))
                                }
                            </div>
                            <div className="row mb-4">
                                <Pagination
                                    size="md"
                                    style={{justifyContent: "center"}}
                                    total={total}
                                    limit={LIMIT}
                                    activePage={currentPage}
                                    onChangePage={handlePageChange}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetPost/>
                                <WidgetYoutubeList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterOne/>
        </>
    );
};

export default PostCategory;

export async function getStaticPaths() {
    try {
        const categories = await db.category.findMany({select: {cate_slug: true}});
        const paths = (categories ?? []).map((cat) => ({params: {slug: cat.cate_slug}}));
        return {paths, fallback: 'blocking'};
    } catch {
        return {paths: [], fallback: 'blocking'};
    }
}

export async function getStaticProps({params}) {
    const {slug} = params;
    const data = await getPostsByCategory(slug, LIMIT, 1);

    if (!data.category) {
        return {notFound: true};
    }

    return {
        props: {slug, ssrData: {data}},
        revalidate: 60,
    };
}
