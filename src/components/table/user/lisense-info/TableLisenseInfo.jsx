import React from "react";
import {Loader, Table} from "rsuite";
import {useGetUserSubscriptionsById} from "@/hooks/data/user/useUser";
import {DateTimeCell} from "@/components/table/user/lisense-info/CellLisenseInfo";

const {Column, HeaderCell, Cell} = Table;

const TableLicenseInfo = ({user}) => {
    const {subscriptions} = useGetUserSubscriptionsById(user.id);

    if (subscriptions === undefined) {
        return <Loader size="md" style={{minHeight: "100vh", margin: "0"}} backdrop
                       content="loading..." vertical/>
    }

    return (
        <>
            <h5>Packages</h5>
            <Table
                height={250}
                data={subscriptions.packages}
            >
                <Column width={120}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell>{rowData => rowData.package.name.toString()}</Cell>
                </Column>
                <Column width={120}>
                    <HeaderCell>Type</HeaderCell>
                    <Cell dataKey="subscriptionType"/>
                </Column>
                <Column width={120}>
                    <HeaderCell>Start Date</HeaderCell>
                    <DateTimeCell dataKey="startDate"/>
                </Column>
                <Column width={120}>
                    <HeaderCell>End Date</HeaderCell>
                    <DateTimeCell dataKey="endDate"/>
                </Column>
            </Table>
            <h5 className="mt-5">Products</h5>
            <Table
                height={300}
                data={subscriptions.products}
            >
                <Column width={120}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell>{rowData => rowData.product.name.toString()}</Cell>
                </Column>
                <Column width={120}>
                    <HeaderCell>Type</HeaderCell>
                    <Cell dataKey="subscriptionType"/>
                </Column>
                <Column width={120}>
                    <HeaderCell>Platform</HeaderCell>
                    <Cell>{rowData => rowData.product.platform.toString()}</Cell>
                </Column>
                <Column width={120}>
                    <HeaderCell>Start Date</HeaderCell>
                    <DateTimeCell dataKey="startDate"/>
                </Column>
                <Column width={120}>
                    <HeaderCell>End Date</HeaderCell>
                    <DateTimeCell dataKey="endDate"/>
                </Column>
            </Table>
        </>
    );
};

export default TableLicenseInfo;
