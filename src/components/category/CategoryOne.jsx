import Image from "next/image";
import Link from "next/link";
import {slugify} from "../../utils";
import {Loader} from "rsuite";
import {usePublicCategories} from "@/hooks/data/admin/useCategories";

const CategoryOne = ({initialData}) => {
    const {categories, isLoading} = usePublicCategories(initialData);

    if (isLoading) {
        return (
            <div className="axil-banner-cat-counter"
                 style={{minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Loader size="md"/>
            </div>
        );
    }

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
                                            style={{width: '100%', height: 'auto'}}
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
