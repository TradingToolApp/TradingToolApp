import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Popover, Whisper, Checkbox, Dropdown, IconButton, Table, CellProps} from "rsuite";
import MoreIcon from "@rsuite/icons/legacy/More";
import ModalUpdateTag from "@/components/modal/tags/ModalUpdateTag";
import ModalDeleteTag from "@/components/modal/tags/ModalDeleteTag";

const {Cell} = Table;

export const ImageCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: 0, marginLeft: "7px"}}>
        <div
            style={{
                width: 40,
                height: 40,
                background: "#f5f5f5",
                borderRadius: 6,
                marginTop: 2,
                overflow: "hidden",
                display: "inline-block",
            }}
        >
            <Image src={rowData[dataKey!]} width="40" height="40" alt="Image cell"/>
        </div>
    </Cell>
);

export const ActionCell = ({rowData, ...rests}: any) => {
    const [openUpdateTag, setOpenUpdateTag] = useState(false);
    const [openDeleteTag, setOpenDeleteTag] = useState(false);

    const handleOpenUpdateTag = () => setOpenUpdateTag(true);
    const handleCloseUpdateTag = () => setOpenUpdateTag(false);
    const handleOpenDeleteTag = () => setOpenDeleteTag(true);
    const handleCloseDeleteTag = () => setOpenDeleteTag(false);

    const renderMenu = ({onClose, left, top, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    // Edit
                    handleOpenUpdateTag();
                    break;
                case 2:
                    // Delete
                    handleOpenDeleteTag();
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
                        <Dropdown.Item eventKey={2}>Delete</Dropdown.Item>
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

            <ModalUpdateTag modalData={rowData} open={openUpdateTag} handleClose={handleCloseUpdateTag}/>
            <ModalDeleteTag modalData={rowData} open={openDeleteTag} handleClose={handleCloseDeleteTag}/>
        </>
    );
};
