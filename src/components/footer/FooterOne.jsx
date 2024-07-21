import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";

const FooterOne = () => {
  return (
    <footer className="page-footer bg-grey-dark-key">
      <div className="container">
        <div className="footer-mid">
          <div className="row align-items-center">
            <div className="col-md">
              <div className="footer-logo-container">
                <Link href="/">
                    <span> 
                        <Image 
                         src="/images/logo-symbol.svg"
                         alt="footer logo"
                         className="footer-logo"
                         width={86}
                         height={28}
                        />
                    </span>
                </Link>
              </div>
              {/* End of .brand-logo-container */}
            </div>
            {/* End of .col-md-6 */}
            <div className="col-md-auto">
              <div className="footer-social-share-wrapper">
                <div className="footer-social-share">
                  <div className="axil-social-title">Find us here</div>
                  <ul className="social-share social-share__with-bg">
                  <li>
                    <span href={SocialLink.fb.url}>
                      <i className={SocialLink.fb.icon} />
                    </span>
                  </li>
                  <li>
                    <span href={SocialLink.twitter.url}>
                      <i className={SocialLink.twitter.icon} />
                    </span>
                  </li>
                  <li>
                    <span href={SocialLink.yt.url}>
                      <i className={SocialLink.yt.icon} />
                    </span>
                  </li>
                  <li>
                    <span href={SocialLink.linked.url}>
                      <i className={SocialLink.linked.icon} />
                    </span>
                  </li>
                  <li>
                    <span href={SocialLink.pinterest.url}>
                      <i className={SocialLink.pinterest.icon} />
                    </span>
                  </li>
                  </ul>
                </div>
              </div>
              {/* End of .footer-social-share-wrapper */}
            </div>
            {/* End of .col-md-6 */}
          </div>
          {/* End of .row */}
        </div>
        {/* End of .footer-mid */}
      </div>
    </footer>
  );
};

export default FooterOne;
