import React, {useEffect, useState} from "react";
import {
    Grid,
    Row,
    Col,
    Loader,
    HStack,
    Avatar,
    Text,
    Card,
    VStack,
    Button,
    Table,
    Stack,
    InputGroup,
    Input
} from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import dynamic from "next/dynamic";
import useCurrentUser from "@/hooks/useCurrentUser";
import useWindowSize from "@/hooks/useWindowSize";
import TableLicenseInfo from "@/components/table/user/lisense-info/TableLisenseInfo";
import UserInfoCard from "@/components/card/UserInfoCard";
import ProductCard from "@/components/card/ProductCard";
import {useGetProducts} from "@/hooks/data/admin/useProducts";
import {getProducts} from "@/libs/api-client/prisma/product.api";
import SearchIcon from "@rsuite/icons/Search";
import {TfiViewGrid, TfiViewList} from "react-icons/tfi";

const SideBarUser = dynamic(() => import("@/components/sidebar/SideBarUser"), {ssr: false})

const UserDashboard = ({allTools}) => {
    const user = useCurrentUser();
    const {products} = useGetProducts(allTools);
    const {screenHeight} = useWindowSize();
    const [searchKeyword, setSearchKeyword] = useState("");

    if (user.status !== 'authenticated') {
        return <Loader size="md" style={{minHeight: "100vh", margin: "0"}} backdrop
                       content="loading..." vertical/>
    }

    const filteredData = () => {
        const filtered = products.filter((item) => {
            if (!item.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }

            return true;
        });

        return filtered;
    };

    return (
        <>
            <Grid className="d-flex flex-column vh-100 vw-100" fluid>
                <Row>
                    <HeadMeta metaTitle="User Dashboard"/>
                    <HeaderThree/>
                </Row>
                <HStack>
                    <HStack.Item className="sidebar" style={{height: `${screenHeight - 120}px`}}>
                        <SideBarUser/>
                    </HStack.Item>
                    <HStack.Item className="bordered" grow={1} style={{height: `${screenHeight - 120}px`}}>
                        <Stack className="table-toolbar my-3"
                               justifyContent="space-between">
                            <Stack spacing={6} style={{margin: "5px"}}>
                                <InputGroup inside>
                                    <Input
                                        style={{width: "400px"}}
                                        placeholder="Search"
                                        value={searchKeyword}
                                        onChange={setSearchKeyword}
                                    />
                                    <InputGroup.Addon>
                                        <SearchIcon/>
                                    </InputGroup.Addon>
                                </InputGroup>
                            </Stack>
                        </Stack>
                        <ProductCard productData={filteredData()}/>
                    </HStack.Item>
                </HStack>
            </Grid>
        </>
    );
}
export default UserDashboard;

export async function getStaticProps() {
    const allTools = await getProducts();
    return {
        props: {
            allTools
        },
        revalidate: 3600
    }
}