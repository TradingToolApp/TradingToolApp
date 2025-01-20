import {Grid, Row, Col} from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import {getCategories} from "@/libs/api-client/prisma/category.api";
import dynamic from "next/dynamic";
import useWindowSize from "@/hooks/useWindowSize"; // lazy loading

const SideBarOne = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TableCategories = dynamic(() => import("@/components/table/admin/categories/TableCategories"), {ssr: false});

const Categories = ({allCategories}) => {
    const {screenHeight} = useWindowSize();

    return (
        <Grid className="d-flex flex-column vh-100 vw-100" fluid>
            <Row>
                <HeadMeta metaTitle="Admin Dashboard Categories"/>
                <HeaderThree/>
            </Row>
            <Row className="h-100 overflow-y-auto d-flex flex-row">
                <Col className="sidebar"
                     style={{height: `${screenHeight - 120}px`}}>
                    <SideBarOne/>
                </Col>
                <Col className="flex-grow-1 bordered"
                     style={{height: `${screenHeight - 120}px`}}>
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