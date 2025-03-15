import React, {useState} from "react";
import Image from "next/image";
import {Popover, Whisper, Dropdown, IconButton, Table} from "rsuite";
import MoreIcon from '@rsuite/icons/More';
import ModalUpdatePackage from "@/components/modal/admin/packages/ModalUpdatePackage";

const {Cell} = Table;

export const ActionCell = ({rowData, ...rests}: any) => {
    const [openUpdatePackage, setOpenUpdatePackage] = useState(false);

    const handleOpenUpdatePackage = () => setOpenUpdatePackage(true);
    const handleCloseUpdatePackage = () => setOpenUpdatePackage(false);

    const renderMenu = ({onClose, left, top, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    // Edit
                    handleOpenUpdatePackage();
                    break;
                default:
                    break;
            }
            onClose();
        };
        return (
            <>
                <Popover ref={ref} className={className} style={{left, top}} full>
                    <Dropdown.Menu onSelect={handleSelect}>
                        <Dropdown.Item eventKey={1}>Edit</Dropdown.Item>
                    </Dropdown.Menu>
                </Popover>
            </>
        );
    };

    return (
        <>
            <Cell {...rests} className="link-group" style={{padding: "4px"}}>
                <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
                    <IconButton appearance="subtle" icon={<MoreIcon/>}/>
                </Whisper>
            </Cell>

            <ModalUpdatePackage modalData={rowData} open={openUpdatePackage} handleClose={handleCloseUpdatePackage}/>
        </>
    );
};

export const BooleanCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: "13px"}}>
        {rowData[dataKey] === true ? "Yes" : "No"}
    </Cell>
);

export const ImageCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: "13px"}}>
        <Image src={rowData[dataKey]} alt={rowData.name} width={50} height={50}/>
    </Cell>
);

export const PriceCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: "13px"}}>
        ${rowData[dataKey]}
    </Cell>
);