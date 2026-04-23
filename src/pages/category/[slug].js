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
import {getPostsByCategory} from "@/libs/api-client/prisma/post.api";
import {getValueByLanguage} from "@/utils/formatData";
import {AppContext} from "@/providers/app.provider";
import {usePostsByCategory} from "@/hooks/data/admin/usePosts";

const LIMIT = 8;

const PostCategory = ({slug, currentPage, ssrData}) => {
    const router = useRouter();
    const {language} = useContext(AppContext);

    const {posts, total, category} = usePostsByCategory(slug, LIMIT, currentPage, ssrData);

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
                            <div className="axil-content flex-grow-1">
                                {posts.map((data) => (
                                    <PostLayoutTwo data={data} postSizeMd={true} key={data.slug}/>
                                ))}
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

export async function getServerSideProps(context) {
    const {slug} = context.params;
    const currentPage = parseInt(context.query.page) || 1;

    const data = await getPostsByCategory(slug, LIMIT, currentPage);

    if (!data.category) {
        return {notFound: true};
    }

    return {
        props: {
            slug,
            currentPage,
            ssrData: {data},
        },
    };
}
