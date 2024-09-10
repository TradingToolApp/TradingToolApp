import React, { useContext, useState } from "react";
import Image from "next/image";
import { Popover, Whisper, Dropdown, IconButton, Table,  } from "rsuite";
import MoreIcon from "@rsuite/icons/legacy/More";
import ModalUpdateComment from "@/components/modal/comments/ModalUpdateComment";
import ModalDeleteComment from "@/components/modal/comments/ModalDeleteComment";
import { AppContext } from "@/providers/app.provider";

const {Cell} = Table;

export const BooleanCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props}>
        <div>{rowData[dataKey].toString().charAt(0).toUpperCase() + rowData[dataKey].toString().slice(1)}</div>
    </Cell>
);

export const TranslatableCell = ({rowData, field, dataKey, ...props}: any) => {
    const { language } = useContext(AppContext);
    let translations;

    if (field) {
        translations = rowData[field].translations;
    } else {
        translations = rowData.translations;
    }

    const data = translations.filter((item: any) => item.languageCode === language)[0];
    return (
        <Cell {...props}>
            <div>
                {data[dataKey]}
            </div>
        </Cell>
    );
}

export const ActionCell = ({rowData, ...rests}: any) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const renderMenu = ({onClose, left, top, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    // Edit
                    handleOpenUpdate();
                    break;
                case 2:
                    // Delete
                    handleOpenDelete();
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

            <ModalUpdateComment modalData={rowData} open={openUpdate} handleClose={handleCloseUpdate}/>
            <ModalDeleteComment modalData={rowData} open={openDelete} handleClose={handleCloseDelete}/>
        </>
    );
};
