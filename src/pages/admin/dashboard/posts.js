import React from "react";
import {Grid, Row, Col} from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import dynamic from "next/dynamic";
import {getPosts} from "@/libs/api-client/prisma/post.api";
import {getCategories} from "@/libs/api-client/prisma/category.api";
import useWindowSize from "@/hooks/useWindowSize";

const SideBarOne = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TablePosts = dynamic(() => import("@/components/table/admin/posts/TablePosts"), {ssr: false});

const AdminDashboard = ({allPostsData, allCategoriesData}) => {
    const {screenHeight} = useWindowSize();

    return (
        <Grid className="d-flex flex-column vh-100 vw-100" fluid>
            <Row>
                <HeadMeta metaTitle="Admin Dashboard Posts"/>
                <HeaderThree/>
            </Row>
            <Row className="h-100 overflow-y-auto d-flex flex-row">
                <Col className="sidebar"
                     style={{height: `${screenHeight - 120}px`}}>
                    <SideBarOne/>
                </Col>
                <Col className="flex-grow-1 bordered"
                     style={{height: `${screenHeight - 120}px`}}>
                    <TablePosts tableData={allPostsData} allCategoriesData={allCategoriesData}/>
                </Col>
            </Row>
        </Grid>
    );
}
export default AdminDashboard;

export async function getStaticProps() {
    const allPostsData = await getPosts();
    const allCategoriesData = await getCategories();
    return {
        props: {
            allPostsData,
            allCategoriesData
        },
        revalidate: 3600,
    }
}