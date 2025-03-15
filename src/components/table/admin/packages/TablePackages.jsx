import React, {useState} from "react";
import {
    Pagination,
    Table,
} from "rsuite";
import {ActionCell, BooleanCell, ImageCell, PriceCell} from "./CellPackages";
import MoreIcon from '@rsuite/icons/More';
import useWindowSize from "@/hooks/useWindowSize";

const {Column, HeaderCell, Cell} = Table;

const TablePackages = ({
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
                <Column>
                    <HeaderCell>Image</HeaderCell>
                    <ImageCell dataKey="image"/>
                </Column>
                <Column width={150} flexGrow={1} sortable>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name"/>
                </Column>
                <Column sortable>
                    <HeaderCell>Type</HeaderCell>
                    <Cell dataKey="type"/>
                </Column>
                <Column sortable>
                    <HeaderCell>Platform</HeaderCell>
                    <Cell dataKey="platform"/>
                </Column>
                <Column sortable>
                    <HeaderCell>Monthly Price</HeaderCell>
                    <PriceCell dataKey="monthlyPrice"/>
                </Column>
                <Column>
                    <HeaderCell>Yearly Price</HeaderCell>
                    <PriceCell dataKey="yearlyPrice"/>
                </Column>
                <Column width={120} sortable>
                    <HeaderCell>Status</HeaderCell>
                    <Cell dataKey="status"/>
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

export default TablePackages;
