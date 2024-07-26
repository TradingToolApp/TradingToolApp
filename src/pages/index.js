import { useContext } from "react";
import { getAllPosts } from "../../lib/api";
import CategoryOne from "../../src/components/category/CategoryOne";
import HeadMeta from "../../src/components/elements/HeadMeta";
import FooterOne from "../../src/components/footer/FooterOne";
import HeaderThree from "../../src/components/header/HeaderThree";
import PostSectionFive from "../../src/components/post/PostSectionFive";
import SliderTwo from "../../src/components/slider/SliderTwo";
import { PostProvider } from "../contextProvider/postContext";
import prisma from "@/lib/prisma";

const HomeThree = ({ allPosts }) => {
  return (
    <PostProvider>
          <HeadMeta metaTitle="Home Three" />
          <HeaderThree />
          <SliderTwo slidePost={allPosts} />
          <CategoryOne cateData={allPosts} />
          <PostSectionFive postData={allPosts} pClass="section-gap bg-grey-light-three" />
          <FooterOne />
    </PostProvider>
  );
}

export default HomeThree;


// export async function getStaticProps() {
//   const allPosts = getAllPosts([
//     'slug',
//     'postFormat',
//     'story',
//     'trending',
//     'title',
//     'excerpt',
//     'featureImg',
//     'cate',
//     'cate_bg',
//     'cate_img',
//     'author_name',
//     'author_img',
//     'date',
//     'post_views',
//     'post_share',
//   ])

//   return {
//     props: { allPosts }
//   }
// }

// export async function getStaticPaths() {
//   // const posts = getAllPosts(['slug'])
//   const posts = await prisma.postEnglish.findMany({
//     select: {
//       slug: true
//     }
//   });
//   const paths = posts.map(post => ({
//     params: {
//       slug: post.slug
//     }
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

