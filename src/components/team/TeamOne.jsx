import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";

const TeamOne = ({data}) => {
    return ( 
        <div className="axil-team-block m-b-xs-30">
        <Link href={`/author/${slugify(data.author_name)}`}>
            <span className="d-block img-container">
                <Image
                    src={data.author_img}
                    alt={data.author_name}
                    width={350}
                    height={350}
                />
            </span>
        </Link>
        <div className="axil-team-inner-content text-center">
            <h3 className="axil-member-title hover-line">
                <Link href={`/author/${slugify(data.author_name)}`}>
                    <span>{data.author_name}</span>
                </Link>
            </h3>
            <div className="axil-designation">
                {data.author_desg}
            </div>
        </div>
        <div className="axil-team-share-wrapper">
            <ul className="social-share social-share__with-bg social-share__with-bg-white social-share__vertical">
                {data.author_social.map((social) => (
                    <li key={social.url}>
                        <span href={social.url}><i className={social.icon} /></span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
     );
}
 
export default TeamOne;