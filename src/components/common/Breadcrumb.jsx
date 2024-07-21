import Link from "next/link";
import { slugify } from "../../utils";

const Breadcrumb = ({bCat, aPage}) => {
  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link href="/">
                    <span>Home</span>
                </Link>
            </li>
            {bCat ? 
            <li className="breadcrumb-item">
                <Link href={`/category/${slugify(bCat)}`} >
                    <span>{bCat}</span>
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
