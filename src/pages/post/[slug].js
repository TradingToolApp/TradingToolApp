import { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderThree from "../../components/header/HeaderThree";
import PostFormatAudio from "../../components/post/post-format/PostFormatAudio";
import PostFormatGallery from "../../components/post/post-format/PostFormatGallery";
import PostFormatQuote from "../../components/post/post-format/PostFormatQuote";
import PostFormatStandard from "../../components/post/post-format/PostFormatStandard";
import PostFormatText from "../../components/post/post-format/PostFormatText";
import PostFormatVideo from "../../components/post/post-format/PostFormatVideo";
import { PostContext } from "@/contextProvider/postContext";
import { useRouter } from 'next/router'

const PostDetails = ({ allPosts }) => {
	const router = useRouter()
	const { posts } = useContext(PostContext);
	const [postContent, setPostContent] = useState("");
	allPosts = posts;
	console.log(postContent)
	useEffect(() => {
		const post = allPosts.filter(post => post.slug === router.query.slug);
		setPostContent(post[0]);
	}, [allPosts, router.query.slug]);

	const PostFormatHandler = () => {
		if(!postContent) return null;
		if (postContent.postFormat === 'video') {
			return <PostFormatVideo postData={postContent} allData={allPosts} />
		} else if (postContent.postFormat === 'gallery') {
			return <PostFormatGallery postData={postContent} allData={allPosts} />
		} else if (postContent.postFormat === 'audio') {
			return <PostFormatAudio postData={postContent} allData={allPosts} />
		} else if (postContent.postFormat === 'quote') {
			return <PostFormatQuote postData={postContent} allData={allPosts} />
		} else if (postContent.postFormat === 'text') {
			return <PostFormatText postData={postContent} allData={allPosts} />
		} else {
			return <PostFormatStandard postData={postContent} allData={allPosts} />
		}
	}

	return (
		<>
			<HeadMeta metaTitle={postContent.title} />
			<HeaderThree />
			<Breadcrumb bCat={postContent.cate} aPage={postContent.title} />
			<PostFormatHandler />
			<FooterOne />
		</>
	);
}

export default PostDetails;