import Image from "next/image";
import Link from "next/link";
import {slugify} from "../../utils";
import {usePublicCategories} from "@/hooks/data/admin/useCategories";

const CategoryOne = () => {
    const {categories} = usePublicCategories();

    return (
        <div className="axil-banner-cat-counter">
            <div className="container">
                <div className="axil-content">
                    <ul className="category-list-wrapper d-flex justify-content-center">
                        {categories.slice(0, 5).map((data) => (
                            <li className="category-list perfect-square" key={data.slug}>
                                <Link href={`/category/${data.slug}`}>
                                    <span className="list-inner">
                                        <Image
                                            src={data.cateImg}
                                            alt={data.name}
                                            width={160}
                                            height={160}
                                        />
                                        <div className="post-info-wrapper overlay">
                                            <div className="counter-inner">
                                                <span className="counter">{data.count}</span>+
                                            </div>
                                            <h4 className="cat-title">{data.name}</h4>
                                        </div>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CategoryOne;
