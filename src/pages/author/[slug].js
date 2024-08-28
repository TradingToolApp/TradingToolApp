import { useContext } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import { AppContext } from "@/providers/app.provider";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderThree from "../../components/header/HeaderThree";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetYoutubeList from "@/components/widget/WidgetYoutubeList";

const PostAuthor = ( { allPosts } ) => {
    const router = useRouter()
    const { posts } = useContext(AppContext);
    allPosts = posts;
    const postData = allPosts.filter(post => post.author_slug === router.query.slug);

    if(postData.length === 0) {
        router.push('/404');
        return null;
    }

    const authorContent = postData[0];

    return (
        <>
            <HeadMeta metaTitle={authorContent.author_name}/>
            <HeaderThree/>
            <Breadcrumb aPage={authorContent.author_name}/>
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="author-details-block">
                                <div className="media post-block post-block__mid m-b-xs-0">
                                    <span href="#" className="align-self-center">
                                        <Image
                                            src={authorContent.author_img}
                                            alt={authorContent.author_name}
                                            width={210}
                                            height={210}
                                            className="m-r-xs-30"
                                        />
                                        <div className="grad-overlay__transparent overlay-over"/>
                                    </span>
                                    <div className="media-body">
                                        <h2 className="h4 m-b-xs-15">{authorContent.author_name}</h2>
                                        <p className="hover-line"><span href="https://example.com">https//www.example.com</span></p>
                                        <p className="mid">{authorContent.author_bio}</p>
                                        <div className="post-metas">
                                            <ul className="list-inline">
                                                <li><span href="#"><i className="fal fa-user-edit"/>Total Post ({postData.length})</span></li>
                                                <li><span href="#"><i className="fal fa-comment"/>Comments (12)</span></li>
                                            </ul>
                                        </div>
                                        <div className="author-social-share">
                                            <ul className="social-share social-share__with-bg">
                                                {authorContent.author_social.map(( data, index ) => (
                                                    <li key={index}><span href={data.url}><i className={data.icon}/></span></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="axil-content">
                                <h2 className="h3 m-b-xs-40">Articles By This Author</h2>
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

export default PostAuthor;

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
//     //     'author_name',
//     //     'author_img',
//     //     'author_social',
//     //     'author_bio'
//     // ]);
//     const allPosts = await prisma.postEnglish.findMany();
//     const getAuthorData = allPosts.filter(post => slugify(post.author_name) === postParams);
//     const postData = getAuthorData;

//     return {
//         props: {
//             postData,
//             allPosts
//         }
//     }
// }

// export async function getStaticPaths() {
//     // const categories = getAllPosts(['author_name']);
//     const categories = await prisma.postEnglish.findMany({
//         select: {
//             author_name: true
//         }
//     });
//     const paths = categories.map(post => ({
//         params: {
//             slug: slugify(post.author_name)
//         }
//     }))

//     return {
//         paths,
//         fallback: false,
//     }
// }