import React from "react";
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import FooterOne from "@/components/footer/FooterOne";
import ProductCardTwo from "@/components/card/ProductCardTwo";
import {getPublicProducts} from "@/libs/api-client/prisma/product.api";
import {useGetPublicProducts} from "@/hooks/data/admin/useProducts";

const MT4MT5Page = ({allProducts}) => {
    const {products} = useGetPublicProducts(allProducts);

    return (
        <div>
            <HeadMeta metaTitle="Tool MT4/MT5"/>
            <HeaderFive/>
            <ProductCardTwo products={products}/>
            <FooterOne/>
        </div>
    );
}

export default MT4MT5Page;

export async function getStaticProps() {
    const allProducts = await getPublicProducts();

    return {
        props: {
            allProducts
        },
        revalidate: 1800,
    };
}