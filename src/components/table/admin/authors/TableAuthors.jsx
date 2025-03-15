import React, {useState} from "react";
import {
    Input,
    InputGroup,
    Table,
    Stack,
    Button, Pagination
} from "rsuite";
import {ActionCell, ImageCell} from "./CellAuthors";
import ModalAddAuthor from "@/components/modal/admin/authors/ModalAddAuthor";
import SearchIcon from "@rsuite/icons/Search";
import MoreIcon from '@rsuite/icons/More';
import useWindowSize from "@/hooks/useWindowSize";
import {useGetAuthors} from "@/hooks/data/admin/useAuthors";

const {Column, HeaderCell, Cell} = Table;

const TableAuthors = ({tableData}) => {
    const {screenHeight} = useWindowSize();
    const {authors} = useGetAuthors(tableData);
    const [sortColumn, setSortColumn] = useState("id");
    const [sortType, setSortType] = useState();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [openAddAuthor, setOpenAddAuthor] = useState(false);

    const handleOpenAddAuthor = () => setOpenAddAuthor(true);
    const handleCloseAddAuthor = () => setOpenAddAuthor(false);

    const handleSortColumn = (sortColumn, sortType) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleSearch = (value) => {
        setPage(1);
        setSearchKeyword(value);
    }

    const filteredData = () => {
        const filtered = authors.filter((item) => {
            if (!item.author_name.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }

            return true;
        });

        return filtered;
    };

    const data = filteredData().filter((v, i) => {
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
                    <Button appearance="primary" size="lg" onClick={handleOpenAddAuthor}>
                        Add Author
                    </Button>
                </Stack>
            </Stack>

            <Table
                height={screenHeight - 300}
                data={data}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
            >
                <Column width={150}>
                    <HeaderCell>Image</HeaderCell>
                    <ImageCell dataKey="author_img"/>
                </Column>

                <Column flexGrow={1} sortable>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="author_name"/>
                </Column>

                <Column align="center" width={150}>
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
                    total={filteredData().length}
                    limitOptions={[5, 10, 15]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
            <ModalAddAuthor open={openAddAuthor} handleClose={handleCloseAddAuthor}/>
        </div>
    );
};

export default TableAuthors;
