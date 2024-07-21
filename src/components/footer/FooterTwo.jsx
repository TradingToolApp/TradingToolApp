import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";

const FooterTwo = () => {
  return (
    <footer className="page-footer bg-grey-dark-key">
      <div className="custom-fluid-container">
        <div className="footer-mid pt-0">
          <div className="row align-items-center">
            <div className="col-md">
              <div className="footer-logo-container">
                <Link href="/">
                  <Image
                    src="/images/logo-symbol.svg"
                    alt="footer logo"
                    className="footer-logo"
                    width={86}
                    height={28}
                  />
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
                      <Link href={SocialLink.fb.url}>
                        <i className={SocialLink.fb.icon} />
                      </Link>
                    </li>
                    <li>
                      <Link href={SocialLink.twitter.url}>
                        <i className={SocialLink.twitter.icon} />
                      </Link>
                    </li>
                    <li>
                      <Link href={SocialLink.yt.url}>
                        <i className={SocialLink.yt.icon} />
                      </Link>
                    </li>
                    <li>
                      <Link href={SocialLink.linked.url}>
                        <i className={SocialLink.linked.icon} />
                      </Link>
                    </li>
                    <li>
                      <Link href={SocialLink.pinterest.url}>
                        <i className={SocialLink.pinterest.icon} />
                      </Link>
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
        <div className="footer-bottom">
          <ul className="footer-bottom-links">
            <li>
              <Link href="/">
                <span>Terms of Use</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Accessibility &amp; CC</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>AdChoices</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Modern Slavery Act Statement</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Advertise with us</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Papr Store</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Newsletters</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Transcripts</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>License Footage</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>Sitemap</span>
              </Link>
            </li>
          </ul>
          {/* End of .footer-bottom-links */}
          <p className="axil-copyright-txt">
            © {new Date().getFullYear()}. All rights reserved by Your Company.
          </p>
        </div>
        {/* End of .footer-bottom */}
      </div>
      {/* End of .container */}
    </footer>
  );
};

export default FooterTwo;
