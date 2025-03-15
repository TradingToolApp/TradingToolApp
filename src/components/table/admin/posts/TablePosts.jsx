import React, {useState, useMemo} from "react";
import {
    Input,
    InputGroup,
    Table,
    Stack,
    SelectPicker,
    Button,
    Pagination
} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import MoreIcon from '@rsuite/icons/More';
import {ActionCell, BooleanCell, UpperCaseCell} from "./CellPosts";
import ModalAddPost from "../../../modal/admin/posts/ModalAddPost";
import useWindowSize from "@/hooks/useWindowSize";
import {usePosts} from "@/hooks/data/admin/usePosts";
import {useGetCategories} from "@/hooks/data/admin/useCategories";

const {Column, HeaderCell, Cell} = Table;

const TablePosts = ({tableData, allCategoriesData}) => {
    const {screenHeight} = useWindowSize();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState("id");
    const [sortType, setSortType] = useState();
    const {posts} = usePosts(tableData);
    const [cate, setCate] = useState("");
    const {categories} = useGetCategories(allCategoriesData);
    const [openAddPost, setOpenAddPost] = useState(false);

    const handleOpenAddPost = () => setOpenAddPost(true);
    const handleCloseAddPost = () => setOpenAddPost(false);

    const handleSortColumn = (sortColumn, sortType) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    }

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleSearch = (value) => {
        setPage(1);
        setSearchKeyword(value);
    }

    // tableData for usePaginatePosts hook
    const filteredPosts = useMemo(() => {
        if (posts === null || posts === undefined || posts.length === 0 || !posts) return [];
        const filteredData = () => {
            const filtered = posts.filter((item) => {
                if (cate && item.cate_slug !== cate) {
                    return false;
                }

                return true;
            });

            if (sortColumn && sortType) {
                return filtered.sort((a, b) => {
                    let x = a[sortColumn];
                    let y = b[sortColumn];

                    if (sortColumn === "active") {
                        return sortType === "asc" ? (x === "public" ? -1 : 1) : (x === "public" ? 1 : -1);
                    }

                    if (sortColumn === "createdAt" || sortColumn === "updatedAt") {
                        x = new Date(x).getTime();
                        y = new Date(y).getTime();
                        return sortType === "asc" ? x - y : y - x;
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

        return filteredData();
    }, [posts, cate, sortColumn, sortType]);

    // tableData for usePosts hooks
    const paginationData = filteredPosts.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    return (
        <div>
            <Stack className="table-toolbar my-3" justifyContent="space-between">
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
                    <SelectPicker
                        style={{marginRight: "10px"}}
                        label="Category"
                        data={categories}
                        searchable={false}
                        value={cate}
                        onChange={setCate}
                    />
                    <Button appearance="primary" size="lg" onClick={handleOpenAddPost}>
                        Add post
                    </Button>
                </Stack>
            </Stack>
            <Table
                height={screenHeight - 300}
                data={paginationData}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
            >
                <Column flexGrow={1} sortable>
                    <HeaderCell>Post Title</HeaderCell>
                    <Cell dataKey="title"/>
                </Column>

                <Column width={100} sortable>
                    <HeaderCell>Post Format</HeaderCell>
                    <UpperCaseCell dataKey="postFormat"/>
                </Column>

                <Column width={100} sortable>
                    <HeaderCell>Category</HeaderCell>
                    <Cell dataKey="cate"/>
                </Column>

                <Column align="center" width={120} sortable>
                    <HeaderCell>Create Date</HeaderCell>
                    <Cell dataKey="createdAt"/>
                </Column>

                <Column align="center" width={120} sortable>
                    <HeaderCell>Last Update</HeaderCell>
                    <Cell dataKey="updatedAt"/>
                </Column>

                <Column align="center" width={100} sortable>
                    <HeaderCell>Status</HeaderCell>
                    <UpperCaseCell dataKey="status"/>
                </Column>

                <Column align="center" width={100} sortable>
                    <HeaderCell>Trending</HeaderCell>
                    <BooleanCell dataKey="trending"/>
                </Column>

                <Column align="center" width={100}>
                    <HeaderCell>
                        <MoreIcon/>
                    </HeaderCell>
                    <ActionCell dataKey="id"/>
                </Column>
            </Table>
            <div style={{padding: 20}}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={filteredPosts.length}
                    limitOptions={[5, 10, 15]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
            <ModalAddPost modalData={posts} open={openAddPost} handleClose={handleCloseAddPost}/>
        </div>
    );
};

export default TablePosts;
