const SocialShareBottom = () => {
  return (
    <div className="post-shares m-t-xs-60">
      <div className="title">SHARE:</div>
      <ul className="social-share social-share__rectangular">
        <li>
          <span href="#" className="btn bg-color-twitch">
            <i className="fab fa-twitch" />
            1K+
          </span>
        </li>
        <li>
          <span href="#" className="btn bg-color-facebook">
            <i className="fab fa-facebook-f" />
            1K+
          </span>
        </li>
        <li>
          <span href="#" className="btn bg-color-twitter">
            <i className="fa-brands fa-x-twitter" />
            1000+
          </span>
        </li>
        <li>
          <span href="#" className="btn bg-color-linkedin">
            <i className="fab fa-linkedin-in" />
            1M+
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SocialShareBottom;