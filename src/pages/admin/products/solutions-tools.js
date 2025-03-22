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
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import {TfiViewGrid, TfiViewList} from "react-icons/tfi";
import SearchIcon from "@rsuite/icons/Search";
import {useGetProducts} from "@/hooks/data/admin/useProducts";
import ModalAddProduct from "@/components/modal/admin/products/ModalAddProduct";
import ProductCard from "@/components/card/ProductCard";
import ProductCardTwo from "@/components/card/ProductCardTwo";
import useWindowSize from "@/hooks/useWindowSize";
import axios from "axios";
import {getProducts} from "@/libs/api-client/prisma/product.api";

const SideBarAdmin = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TableProducts = dynamic(() => import("@/components/table/admin/products/TableProducts"), {ssr: false});

const MT4MT5Page = ({allTools}) => {
    const {screenHeight} = useWindowSize();
    const {products} = useGetProducts(allTools);
    const [sortColumn, setSortColumn] = useState("id");
    const [sortType, setSortType] = useState();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [view, setView] = React.useState("list");
    const [openAddProduct, setOpenAddProduct] = useState(false);

    const handleOpenAddProduct = () => setOpenAddProduct(true);
    const handleCloseAddProduct = () => setOpenAddProduct(false);

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
        const filtered = products.filter((item) => {
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
            <Grid className="d-flex flex-column " fluid>
                <Row>
                    <HeadMeta metaTitle="Admin Product Trading Tool"/>
                    <HeaderFive/>
                </Row>
                <Row className="h-100 overflow-y-auto d-flex flex-row">
                    <Col className="sidebar"
                         style={{height: `${screenHeight - 120}px`}}>
                        <SideBarAdmin/>
                    </Col>
                    <Col className="flex-grow-1 bordered"
                        // style={{height: `${screenHeight - 120}px`}}
                    >
                        <Stack className="table-toolbar my-3"
                               justifyContent="space-between">
                            <Stack spacing={6} style={{margin: "5px"}}>
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
                            <Stack style={{marginRight: "20px"}}>
                                <div style={{margin: "10px"}}>
                                    <Button appearance="subtle" onClick={() => setView("list")}>
                                        <TfiViewList size={20}/>
                                    </Button>
                                    <Button appearance="subtle" onClick={() => setView("grid")}>
                                        <TfiViewGrid size={20}/>
                                    </Button>
                                </div>
                                <Button size="lg" appearance="primary" onClick={handleOpenAddProduct}>
                                    Add Product
                                </Button>
                            </Stack>
                        </Stack>

                        {view === "list" && <TableProducts tableData={filteredData()}
                                                           data={data}
                                                           limit={limit}
                                                           page={page}
                                                           setPage={setPage}
                                                           handleChangeLimit={handleChangeLimit}
                                                           handleSortColumn={handleSortColumn}
                                                           sortType={sortType}
                                                           sortColumn={sortColumn}
                        />}
                        {view === "grid" && <ProductCard productData={filteredData()}/>}
                    </Col>
                </Row>
            </Grid>
            <ModalAddProduct open={openAddProduct} handleClose={handleCloseAddProduct}/>
        </>
    );
}
export default MT4MT5Page;

export async function getStaticProps() {
    const allTools = await getProducts();

    return {
        props: {
            allTools
        },
        revalidate: 3600
    }
}