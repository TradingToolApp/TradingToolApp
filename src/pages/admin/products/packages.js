import React, {useState} from "react";
import dynamic from "next/dynamic";
import {
    Grid,
    Row,
    Col,
    Stack,
    InputGroup,
    Input,
    Button
} from 'rsuite';
import axios from "axios";
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import SearchIcon from "@rsuite/icons/Search";
import ModalAddPackage from "@/components/modal/admin/packages/ModalAddPackage";
import useWindowSize from "@/hooks/useWindowSize";
import {useGetPackages} from "@/hooks/data/admin/usePackages";
import {getPackages} from "@/libs/api-client/prisma/package.api";

const SideBarAdmin = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TablePackages = dynamic(() => import("@/components/table/admin/packages/TablePackages"), {ssr: false});

const PackagePage = ({allTools}) => {
    const {packages} = useGetPackages(allTools);
    const {screenHeight} = useWindowSize();
    const [sortColumn, setSortColumn] = useState("id");
    const [sortType, setSortType] = useState();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const handleSortColumn = (sortColumn, sortType) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    const handleSearch = (value) => {
        setPage(1);
        setSearchKeyword(value);
    }

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const filteredData = () => {
        const filtered = packages.filter((item) => {
            if (!item.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }

            return true;
        });

        if (sortColumn && sortType) {
            return filtered.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];

                if (sortColumn === "status") {
                    return sortType === "asc" ? (x === "public" ? -1 : 1) : (x === "public" ? 1 : -1);
                }
                //dont know why it run
                if (sortColumn === "name") {
                    return sortType === "asc" ? (x === "public" ? -1 : 1) : (x === "public" ? 1 : -1);
                }

                if (typeof x === 'string') {
                    x = x.charCodeAt(0);
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt(0);
                }

                if (sortType === 'asc') {
                    return x > y ? 1 : -1;
                } else {
                    return y > x ? 1 : -1;
                }
            });
        }

        return filtered;
    };

    const data = filteredData().filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });
    return (
        <>
            <Grid className="d-flex flex-column vh-100 vw-100" fluid>
                <Row>
                    <HeadMeta metaTitle="Admin Package Trading Tool"/>
                    <HeaderFive/>
                </Row>
                <Row className="h-100 overflow-y-auto d-flex flex-row">
                    <Col className="sidebar"
                         style={{height: `${screenHeight - 120}px`}}>
                        <SideBarAdmin/>
                    </Col>
                    <Col className="flex-grow-1 bordered"
                         style={{height: `${screenHeight - 120}px`}}>
                        <Stack className="table-toolbar my-3 mx-4"
                               justifyContent="space-between">
                            <InputGroup inside>
                                <Input
                                    style={{width: "400px"}}
                                    placeholder="Search"
                                    value={searchKeyword}
                                    onChange={handleSearch}
                                />
                                <InputGroup.Addon>
                                    <SearchIcon/>
                                </InputGroup.Addon>
                            </InputGroup>
                        </Stack>

                        <TablePackages tableData={filteredData()}
                                       data={data}
                                       limit={limit}
                                       page={page}
                                       setPage={setPage}
                                       handleChangeLimit={handleChangeLimit}
                                       handleSortColumn={handleSortColumn}
                                       sortType={sortType}
                                       sortColumn={sortColumn}
                        />

                    </Col>
                </Row>
            </Grid>
        </>
    );
}
export default PackagePage;

export async function getStaticProps() {
    const allTools = await getPackages();

    return {
        props: {
            allTools
        },
        revalidate: 3600
    }
}