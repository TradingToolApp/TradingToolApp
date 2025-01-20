import React, {useState} from "react";
import {Button, Table} from "rsuite";
import {DateTimeCell, LicenseKeyCell, ArrayCell} from "./CellLisenseInfo";
import useWindowSize from "@/hooks/useWindowSize";

const {Column, HeaderCell, Cell} = Table;

const TableLicenseInfo = ({tableData}) => {
    const {screenHeight} = useWindowSize();

    const [show, setShow] = useState(false);
    const [showLicenseKey, setShowLicenseKey] = useState(false);
    const [showRegisteredDevices, setShowRegisteredDevices] = useState(false);

    const handleToggleLicenseKey = () => {
        setShowLicenseKey(!showLicenseKey)
    }
    const handleToggleRegisteredDevices = () => {
        setShowRegisteredDevices(!showRegisteredDevices)
    }

    return (
        <Table
            height={screenHeight - 400}
            data={tableData}
            rowHeight={60}
            // minHeight={25}
        >
            <Column width={120}>
                <HeaderCell>Type</HeaderCell>
                <Cell dataKey="type"/>
            </Column>
            <Column width={120}>
                <HeaderCell>Start Date</HeaderCell>
                <DateTimeCell dataKey="startDate"/>
            </Column>
            <Column width={120}>
                <HeaderCell>End Date</HeaderCell>
                <DateTimeCell dataKey="endDate"/>
            </Column>
            <Column width={590}
                    flexGrow={1}
                    rowSpan={() => showLicenseKey ? 10 : 1}
            >
                <HeaderCell>License Key</HeaderCell>
                <LicenseKeyCell dataKey="licenseKey" show={showLicenseKey}/>
            </Column>
            <Column align="center" width={120}>
                <HeaderCell></HeaderCell>
                <Cell>
                    <Button size="xs" onClick={handleToggleLicenseKey}>Show </Button>
                </Cell>
            </Column>
            <Column width={120}
                    flexGrow={1}
                    rowSpan={() => showRegisteredDevices ? 10 : 1}
            >
                <HeaderCell>Registered Devices</HeaderCell>
                <ArrayCell dataKey="registeredDevices" show={showRegisteredDevices}/>
            </Column>
            <Column align="center" width={100}>
                <HeaderCell></HeaderCell>
                <Cell>
                    <Button size="xs" onClick={handleToggleRegisteredDevices}>Show</Button>
                </Cell>
            </Column>
        </Table>
    );
};

export default TableLicenseInfo;
