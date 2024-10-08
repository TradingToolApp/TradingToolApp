import Image from "next/image";
import Link from "next/link";
const AdBanner = () => {
    return (
      <div className="add-container m-b-xs-60">
        <Link href="https://themeforest.net/item/blogar-blog-magazine-wordpress-theme/30583777">
            <Image
                src="/images/clientbanner/clientbanner.jpg"
                alt="Ad Banner"
                width={728}
                height={90}
                className="w-100"
            />
        </Link>
      </div>
    );
}
 
export default AdBanner;