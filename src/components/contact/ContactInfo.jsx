import SocialLink from "../../data/social/SocialLink.json";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <div className="axil-contact-info-wrapper p-l-md-45 m-b-xs-30">
      <div className="axil-contact-info-inner">
        <h2 className="h4 m-b-xs-10">Contact Information</h2>
        <div className="axil-contact-info">
          <address className="address">
            <p className="mid m-b-xs-30">
              Theodore Lowe, Ap #867-859
              <br />
              Sit Rd, Azusa New York
            </p>
            <div className="h5 m-b-xs-10">We&apos;re Available 24/ 7. Call Now.</div>
            <div>
              <Link className="tel" href="tel:8884562790">
                <i className="fas fa-phone" />
                (888) 456-2790
              </Link>
            </div>
            <div>
              <Link className="tel" href="tel:12125553333">
                <i className="fas fa-fax" />
                (121) 255-53333
              </Link>
            </div>
          </address>
          {/* End of address */}
          <div className="contact-social-share m-t-xs-30">
            <div className="axil-social-title h5">Follow Us</div>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
