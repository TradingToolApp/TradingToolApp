import Link from "next/link";
import { slugify } from "../../utils";
import { useTranslation } from "react-i18next";

const Breadcrumb = ({bCat, aPage}) => {
  const { t } = useTranslation();

  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link href="/">
                    <span>{t("page.home")}</span>
                </Link>
            </li>
            {bCat ? 
            <li className="breadcrumb-item">
                <Link href={`/category/${slugify(bCat)}`} >
                  <span>{bCat.toLowerCase()}</span>
                </Link>
            </li>: ""
            }
            <li className="breadcrumb-item active" aria-current="page">{aPage}</li>
          </ol>
          {/* End of .breadcrumb */}
        </nav>
      </div>
      {/* End of .container */}
    </div>
  );
};

export default Breadcrumb;
