import { useEffect, useState } from "react";

const SocialShareSide = () => {
  const [windowPath, setwindowPath] = useState(null);
 
  useEffect(() => {
    setwindowPath(window.location.href)
  }, []);
  
  return (
    <div className="post-details__social-share mt-2">
      <ul className="social-share social-share__with-bg social-share__vertical">
        <li>
          <span href={`https://www.facebook.com/sharer/sharer.php?u=${windowPath}`}>
            <i className="fab fa-facebook-f" />
          </span>
        </li>
        <li>
          <span href={`https://twitter.com/intent/tweet?text=${windowPath}`}>
            <i className="fa-brands fa-x-twitter" />
          </span>
        </li>
        <li>
          <span href={`https://pinterest.com/pin/create/button/?url=${windowPath}`}>
            <i className="fab fa-pinterest-p" />
          </span>
        </li>
        <li>
          <span href={`https://www.linkedin.com/shareArticle?mini=true&url=${windowPath}`}>
            <i className="fab fa-linkedin-in" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SocialShareSide;
