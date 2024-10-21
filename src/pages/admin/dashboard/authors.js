import React from "react";
import { Grid, Row, Col } from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import SideBarThree from "@/components/sidebar/SideBarThree";
import { getAuthors } from "@/services/prisma/author.api";
import dynamic from "next/dynamic";

const TableAuthors = dynamic( // lazy loading
    () => {
        return import("@/components/table/authors/TableAuthors");
    },
);

const Authors = ( { allAuthorsData } ) => {
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