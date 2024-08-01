import { useContext } from "react";
import { getAllPosts } from "../../../lib/api";
import FooterOne from "../../components/footer/FooterOne";
import HeaderThree from "../../components/header/HeaderThree";
import Breadcrumb from "../../components/common/Breadcrumb";
import { slugify } from "../../utils";
import HeadMeta from "../../components/elements/HeadMeta";
import AdBanner from "../../components/common/AdBanner";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import WidgetPost from "../../components/widget/WidgetPost";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetCategory from "../../components/widget/WidgetCategory";
import { PostContext } from "@/contextProvider/postContext";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";

const PostCategory = ({ allPosts, params }) => {
    const { t } = useTranslation();
    const router = useRouter()

    const { posts } = useContext(PostContext);
    allPosts = posts;
    const getCategoryData = allPosts.filter(post => slugify(post.cate) === router.query.slug);
    const postData = getCategoryData;

    const cateContent = postData[0];
    return (
        <>
            <HeadMeta metaTitle={cateContent.cate} />
            <HeaderThree />
            <Breadcrumb aPage={t(`category.${cateContent.cate.toLowerCase()}`)} />
            {/* Banner Start here  */}
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">{t(`category.${cateContent.cate.toLowerCase()}`)}</h2>
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
                            <AdBanner />
                            <div className="axil-content">
                                {postData.map((data) => (
                                    <PostLayoutTwo data={data} postSizeMd={true} key={data.slug} />
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                <WidgetSocialShare />
                                <WidgetCategory cateData={allPosts} />
                                <WidgetPost dataPost={allPosts} />
                                <WidgetAd img="/images/clientbanner/clientbanner3.jpg" height={492} width={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterOne />
        </>
    );
}

export default PostCategory;

// export async function getStaticPaths() {
//     // const posts = getAllPosts(['cate']);
//     const postEN = await prisma.postEnglish.findMany({
//         select: {
//             cate: true
//         }
//     });
//     const postVN = await prisma.postVietnamese.findMany({
//         select: {
//             cate: true
//         }
//     });
 
//     const pathEN = postEN.map(post => ({
//         params: {
//             slug: slugify(post.cate)
//         }
//     }))
//     const pathVN = postVN.map(post => ({
//         params: {
//             slug: slugify(post.cate)
//         }
//     }))
//     const paths = [...pathEN, ...pathVN];

//     return {
//         paths,
//         fallback: false,
//     }
// }

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

