import React, { useContext } from "react";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { AppContext } from "@/providers/app.provider";
import FooterOne from "../../components/footer/FooterOne";
import HeaderThree from "../../components/header/HeaderThree";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import WidgetPost from "../../components/widget/WidgetPost";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetYoutubeList from "@/components/widget/WidgetYoutubeList";
import { Loader } from "rsuite";

const PostCategory = ( { allPosts, params } ) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { posts } = useContext(AppContext);

    allPosts = posts;
    const postData = allPosts.filter(post => post.cate_slug === router.query.slug);



    const cateContent = postData[0];

    if (allPosts.length === 0) return <Loader style={{marginTop: "25%"}} backdrop size="md" content="loading..."/>;
    if (postData.length === 0) {
        router.push('/404');
        return null;
    }
    return (
        <>
            <HeadMeta metaTitle={cateContent.cate}/>
            <HeaderThree/>
            <Breadcrumb aPage={cateContent.cate}/>
            {/* Banner Start here  */}
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">{cateContent.cate}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End here  */}
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="axil-content">
                                {postData.map(( data ) => (
                                    <PostLayoutTwo data={data} postSizeMd={true} key={data.slug}/>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetPost dataPost={allPosts} />
                                <WidgetYoutubeList dataPost={allPosts} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterOne/>
        </>
    );
}

export default PostCategory;

// export async function getStaticProps({ params }) {

//     const postParams = params.slug;

//     // const allPosts = getAllPosts([
//     //     'slug',
//     //     'cate',
//     //     'cate_img',
//     //     'title',
//     //     'excerpt',
//     //     'featureImg',
//     //     'date',
//     //     'post_views',
//     //     'read_time',
//     //     'author_name',
//     //     'author_social'
//     // ]);
//     const allPosts = await prisma.postEnglish.findMany();
//     const getCategoryData = allPosts.filter(post => slugify(post.cate) === postParams);
//     const postData = getCategoryData;

//     return {
//         props: {
//             postData,
//             allPosts
//         }
//     }
// }

