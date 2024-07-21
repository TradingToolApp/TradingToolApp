import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../utils";

const PostLayoutFive = ({ data, index }) => {
	return (
		<div className="media post-block post-block__fluid post-block__mid flex-column m-b-xs-30 m-b-md-40 m-b-lg-40">
			<Link href={`/post/${data.slug}`}>
				<span className="align-self-center w-100">
					<Image
						className="w-100 m-b-xs-30"
						src={data.featureImg}
						alt={data.title}
						width={528}
						height={(index % 2 == 1) ? 782 : 586}
					/>
				</span>
			</Link>
			<div className="media-body">
				<div className="post-cat-group m-b-xs-15">
					<Link href={`/category/${slugify(data.cate)}`}>
						<span className={`post-cat cat-btn btn-big ${data.cate_bg ?? "bg-color-blue-one"}`}>{data.cate}</span>
					</Link>
				</div>
				<h3 className="axil-post-title hover-line">
					<Link href={`/post/${data.slug}`}>
						<span>{data.title}</span>
					</Link>
				</h3>
				<p className="mid">
					{data.excerpt}
				</p>
			</div>
		</div>
	);
};

export default PostLayoutFive;
