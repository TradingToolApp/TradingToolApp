import Link from "next/link";
import SocialLink from "../../../../data/social/SocialLink.json";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

const SocialShareBottom = () => {
    return (
        <div className="post-shares m-t-xs-60">
            <div className="title">SHARE:</div>
            <ul className="social-share social-share__rectangular">
                <li>
                    <Link href={SocialLink.fb.url} className="btn bg-color-facebook">
                        <FaFacebookF size={"2em"}/>
                        1K+
                    </Link>
                </li>
                <li>
                    <Link href={SocialLink.yt.url} className="bg-color-youtube">
                        <FaYoutube size={"2em"}/>
                        1K+
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SocialShareBottom;
