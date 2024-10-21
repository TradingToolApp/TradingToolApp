import React from "react";
import { Grid, Row, Col } from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import SideBarThree from "@/components/sidebar/SideBarThree";
import dynamic from "next/dynamic";
import { getPosts } from "@/services/prisma/post.api";
import { getCategories } from "@/services/prisma/category.api";

const TablePosts = dynamic( // this is to wait for window object to be available
    () => {
        return import("@/components/table/posts/TablePosts");
    },
);

const AdminDashboard = ( { allPostsData, allCategoriesData } ) => {
    return (
            <Grid className="d-flex flex-column vh-100 vw-100" fluid>
                <Row>
                    <HeadMeta metaTitle="Admin Dashboard"/>
                    <HeaderThree/>
                </Row>
                <Row className="h-100 overflow-y-auto d-flex flex-row">
                    <Col className="h-100">
                        <SideBarThree/>
                    </Col>
                    <Col className="flex-grow-1 h-100">
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