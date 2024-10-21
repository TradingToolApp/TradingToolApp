import { Grid, Row, Col } from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import SideBarThree from "@/components/sidebar/SideBarThree";
import { getComments } from "@/services/prisma/comment.api";
import dynamic from "next/dynamic"; // lazy loading
const TableComments = dynamic(
    () => {
        return import("@/components/table/comments/TableComments");
    },
);
const Comments = ( { allComments } ) => {
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
                        <TableComments tableData={allComments}/>
                    </Col>
                </Row>
            </Grid>
    );
}
export default Comments;

export async function getStaticProps() {
    const allComments = await getComments();
    return {
        props: {
            allComments
        },
        revalidate: 3600
    }
}