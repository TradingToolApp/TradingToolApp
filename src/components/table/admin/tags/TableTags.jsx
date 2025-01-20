import React, {useState} from "react";
import {
    Input,
    InputGroup,
    Table,
    Stack,
    Button, Pagination
} from "rsuite";
import {ActionCell} from "./CellTags";
import ModalAddTag from "@/components/modal/admin/tags/ModalAddTag";
import SearchIcon from "@rsuite/icons/Search";
import MoreIcon from '@rsuite/icons/More';
import useWindowSize from "@/hooks/useWindowSize";
import {useGetTags} from "@/hooks/data/admin/useTags";

const {Column, HeaderCell, Cell} = Table;

const TableTags = ({tableData}) => {
    const {screenHeight} = useWindowSize();
    const {tags} = useGetTags(tableData);
    const [sortColumn, setSortColumn] = useState("id");
    const [sortType, setSortType] = useState();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [limit, setLimit] = React.useState(8);
    const [page, setPage] = React.useState(1);
    const [openAddTag, setOpenAddTag] = useState(false);

    const handleOpenAddTag = () => setOpenAddTag(true);
    const handleCloseAddTag = () => setOpenAddTag(false);

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
        const filtered = tags.filter((item) => {
            if (!item.label.toLowerCase().includes(searchKeyword.toLowerCase())) {
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
                    <Button appearance="primary" size="lg" onClick={handleOpenAddTag}>
                        Add Tag
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
                <Column width={150} flexGrow={1}>
                    <HeaderCell>Tag</HeaderCell>
                    <Cell dataKey="label"/>
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
            <ModalAddTag open={openAddTag} handleClose={handleCloseAddTag}/>
        </div>
    );
};

export default TableTags;
