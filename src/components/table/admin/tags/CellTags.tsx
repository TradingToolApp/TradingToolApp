import React, {useState} from "react";
import Image from "next/image";
import {Popover, Whisper, Dropdown, IconButton, Table} from "rsuite";
import MoreIcon from '@rsuite/icons/More';
import ModalUpdateTag from "@/components/modal/admin/tags/ModalUpdateTag";
import ModalDeleteTag from "@/components/modal/admin/tags/ModalDeleteTag";

const {Cell} = Table;

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
