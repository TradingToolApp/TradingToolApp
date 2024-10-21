import { Grid, Row, Col } from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import SideBarThree from "@/components/sidebar/SideBarThree";
import { getCategories } from "@/services/prisma/category.api";
import dynamic from "next/dynamic"; // lazy loading
const TableCategories = dynamic(
    () => {
        return import("@/components/table/categories/TableCategories");
    },
);

const Categories = ( { allCategories } ) => {
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
                        <TableCategories tableData={allCategories}/>
                    </Col>
                </Row>
            </Grid>
    );
}
export default Categories;

export async function getStaticProps() {
    const allCategories = await getCategories();
    return {
        props: {
            allCategories
        },
        revalidate: 3600
    }
}