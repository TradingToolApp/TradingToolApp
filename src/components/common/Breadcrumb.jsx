import Link from "next/link";
import useTranslate from "@/hooks/useTranslate";

const Breadcrumb = ({bCat, aPage, cateTitle}) => {
  const t = useTranslate();
  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link href="/">
                    <span>{t.home}</span>
                </Link>
            </li>
            {bCat ? 
            <li className="breadcrumb-item">
                <Link href={`/category/${bCat}`} >
                  <span>{cateTitle.toLowerCase()}</span>
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
