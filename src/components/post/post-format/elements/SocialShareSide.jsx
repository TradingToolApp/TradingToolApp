import {useEffect, useState} from "react";
import Link from "next/link";
import {FaFacebookF, FaPinterestP, FaLinkedinIn} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {white} from "next/dist/lib/picocolors";


const SocialShareSide = () => {
    const [windowPath, setwindowPath] = useState(null);

    useEffect(() => {
        setwindowPath(window.location.href)
    }, []);

    return (
        <div className="post-details__social-share mt-2">
            <ul className="social-share social-share__vertical">
                <li>
                    {/*<span href={`https://www.facebook.com/sharer/sharer.php?u=${windowPath}`}>*/}
                    {/*  <i className="fab fa-facebook-f"/>*/}
                    {/*</span>*/}
                    <Link href={`https://www.facebook.com/sharer/sharer.php?u=${windowPath}`} rel="noopener noreferrer"
                          target="_blank">
                        <FaFacebookF/>
                    </Link>
                </li>
                <li>
                    {/*<span href={`https://twitter.com/intent/tweet?text=${windowPath}`}>*/}
                    {/*  <i className="fa-brands fa-x-twitter"/>*/}
                    {/*</span>*/}
                    <Link href={`https://twitter.com/intent/tweet?text=${windowPath}`} rel="noopener noreferrer"
                          target="_blank">
                        <FaXTwitter/>
                    </Link>
                </li>
                <li>
                    {/*<span href={`https://pinterest.com/pin/create/button/?url=${windowPath}`}>*/}
                    {/*  <i className="fab fa-pinterest-p"/>*/}
                    {/*</span>*/}
                    <Link href={`https://pinterest.com/pin/create/button/?url=${windowPath}`} rel="noopener noreferrer"
                          target="_blank">
                        <FaPinterestP/>
                    </Link>
                </li>
                <li>
                    {/*<span href={`https://www.linkedin.com/shareArticle?mini=true&url=${windowPath}`}>*/}
                    {/*  <i className="fab fa-linkedin-in"/>*/}
                    {/*</span>*/}
                    <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${windowPath}`}
                          rel="noopener noreferrer" target="_blank">
                        <FaLinkedinIn/>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SocialShareSide;
