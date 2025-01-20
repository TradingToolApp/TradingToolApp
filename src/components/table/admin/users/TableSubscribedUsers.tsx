import React, {useState} from "react";
import {
    Input,
    InputGroup,
    Table,
    Stack,
    Pagination
} from "rsuite";
import {ActionCell, BooleanCell} from "./CellSubscribedUsers";
import SearchIcon from "@rsuite/icons/Search";
import MoreIcon from '@rsuite/icons/More';
import useWindowSize from "@/hooks/useWindowSize";
import {useSubscribedUsers} from "@/hooks/data/admin/useSubscriptions";

const {Column, HeaderCell, Cell} = Table;

const TableSubcribedUsers = ({tableData}: any) => {
    const {subscribedUsers} = useSubscribedUsers(tableData);
    const {screenHeight} = useWindowSize();
    const [sortColumn, setSortColumn] = useState("id");
    const [sortType, setSortType] = useState();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [limit, setLimit] = React.useState(8);
    const [page, setPage] = React.useState(1);

    const handleSortColumn = (sortColumn: any, sortType: any) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    const handleChangeLimit = (dataKey: any) => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleSearch = (value: any) => {
        setPage(1);
        setSearchKeyword(value);
    }

    const filteredData = () => {
        const filtered = subscribedUsers.filter((item: any) => {
            if (!item.name.toLowerCase().includes(searchKeyword.toLowerCase())
                || !item.email.toLowerCase().includes(searchKeyword.toLowerCase())
                || !item.phone.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }

            return true;
        });

        return filtered;
    };

    const data = filteredData().filter((v: any, i: any) => {
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
            </Stack>

            <Table
                height={screenHeight - 300}
                data={data}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
            >
                <Column width={150} flexGrow={1} sortable>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name"/>
                </Column>
                <Column width={150} flexGrow={1} sortable>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email"/>
                </Column>
                <Column width={150} flexGrow={1}>
                    <HeaderCell>Phone</HeaderCell>
                    <Cell dataKey="phone"/>
                </Column>
                <Column width={150} flexGrow={1} sortable>
                    <HeaderCell>Subscription Type</HeaderCell>
                    <Cell dataKey="type"/>
                </Column>
                <Column width={150} flexGrow={1} sortable>
                    <HeaderCell>Start Date</HeaderCell>
                    <Cell dataKey="startDate"/>
                </Column>
                <Column width={150} flexGrow={1} sortable>
                    <HeaderCell>End Date</HeaderCell>
                    <Cell dataKey="endDate"/>
                </Column>
                <Column width={150} flexGrow={1} sortable>
                    <HeaderCell>Active</HeaderCell>
                    <BooleanCell dataKey="active"/>
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
        </div>
    );
};

export default TableSubcribedUsers;
