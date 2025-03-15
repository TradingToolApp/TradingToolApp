import {Grid, Row, Col} from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import {getTags} from "@/libs/api-client/prisma/tag.api";
import dynamic from "next/dynamic";
import useWindowSize from "@/hooks/useWindowSize"; // lazy loading

const SideBarOne = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TableTags = dynamic(() => import("@/components/table/admin/tags/TableTags"), {ssr: false});

const Tags = ({allTags}) => {
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
                    <TableTags tableData={allTags}/>
                </Col>
            </Row>
        </Grid>
    );
}
export default Tags;

export const getStaticProps = async () => {
    const allTags = await getTags();
    return {
        props: {
            allTags
        },
        revalidate: 3600
    }
}