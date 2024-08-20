import { useContext } from "react";
import CategoryOne from "../../src/components/category/CategoryOne";
import HeadMeta from "../../src/components/elements/HeadMeta";
import FooterOne from "../../src/components/footer/FooterOne";
import HeaderThree from "../../src/components/header/HeaderThree";
import PostSectionFive from "../../src/components/post/PostSectionFive";
import SliderTwo from "../../src/components/slider/SliderTwo";
import { AppContext } from "@/providers/appProvider";

const HomeThree = ({ allPosts }) => {
  const { posts } = useContext(AppContext);
  allPosts = posts;
  return (
    <>
      <HeadMeta metaTitle="Home Three" />
      <HeaderThree />
      <SliderTwo slidePost={allPosts} />
      <CategoryOne cateData={allPosts} />
      <PostSectionFive postData={allPosts} pClass="section-gap bg-grey-light-three" />
      <FooterOne />
    </>
  );
}

export default HomeThree;