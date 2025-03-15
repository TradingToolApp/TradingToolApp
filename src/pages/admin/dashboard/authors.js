import React from "react";
import {Grid, Row, Col} from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import {getAuthors} from "@/libs/api-client/prisma/author.api";
import dynamic from "next/dynamic";
import useWindowSize from "@/hooks/useWindowSize";

const SideBarOne = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TableAuthors = dynamic(() => import("@/components/table/admin/authors/TableAuthors"), {ssr: false});

const Authors = ({allAuthorsData}) => {
    const {screenHeight} = useWindowSize();

    return (
        <Grid className="d-flex flex-column vh-100 vw-100" fluid>
            <Row>
                <HeadMeta metaTitle="Admin Dashboard"/>
                <HeaderFive/>
            </Row>
            <Row className="h-100 overflow-y-auto d-flex flex-row">
                <Col className="sidebar"
                     style={{height: `${screenHeight - 120}px`}}>
                    <SideBarOne/>
                </Col>
                <Col className="flex-grow-1 bordered"
                     style={{height: `${screenHeight - 120}px`}}>
                    <TableAuthors tableData={allAuthorsData}/>
                </Col>
            </Row>
        </Grid>
    );
}
export default Authors;

export const getStaticProps = async () => {
    const allAuthorsData = await getAuthors();
    return {
        props: {
            allAuthorsData
        },
        revalidate: 3600
    }
}