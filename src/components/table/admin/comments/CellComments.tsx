import React, {useState} from "react";
import {Popover, Whisper, Dropdown, IconButton, Table,} from "rsuite";
import MoreIcon from '@rsuite/icons/More';
import ModalUpdateComment from "@/components/modal/admin/comments/ModalUpdateComment";
import ModalDeleteComment from "@/components/modal/admin/comments/ModalDeleteComment";
import {useRouter} from "next/navigation";

const {Cell} = Table;

export const BooleanCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props}>
        <div>{rowData[dataKey].toString().charAt(0).toUpperCase() + rowData[dataKey].toString().slice(1)}</div>
    </Cell>
);

export const ActionCell = ({rowData, ...rests}: any) => {
    const router = useRouter();
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
                    router.push(`/post/${rowData.post_slug}`)
                    break;
                case 2:
                    // Edit
                    handleOpenUpdate();
                    break;
                case 3:
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
                        <Dropdown.Item eventKey={1}>Open</Dropdown.Item>
                        <Dropdown.Item eventKey={2}>Edit</Dropdown.Item>
                        <Dropdown.Item eventKey={3}>Delete</Dropdown.Item>
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
