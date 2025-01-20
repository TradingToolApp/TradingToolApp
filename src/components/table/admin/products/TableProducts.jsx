import React, {useState} from "react";
import {
    Pagination,
    Table,
} from "rsuite";
import {ActionCell, BooleanCell} from "./CellProducts";
import MoreIcon from '@rsuite/icons/More';
import useWindowSize from "@/hooks/useWindowSize";

const {Column, HeaderCell, Cell} = Table;

const TableProducts = ({
                           tableData,
                           data,
                           limit,
                           page,
                           setPage,
                           handleChangeLimit,
                           handleSortColumn,
                           sortType,
                           sortColumn
                       }) => {
    const {screenHeight} = useWindowSize();


    return (
        <>
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
                <Column width={150} flexGrow={1}>
                    <HeaderCell>URL</HeaderCell>
                    <Cell dataKey="url"/>
                </Column>
                <Column width={120} sortable>
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
                    total={tableData.length}
                    limitOptions={[5, 10, 15]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
        </>
    );
};

export default TableProducts;
