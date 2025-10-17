import React, {useState} from "react";
import Image from "next/image";
import {Popover, Whisper, Dropdown, IconButton, Table} from "rsuite";
import MoreIcon from '@rsuite/icons/More';
import ModalSendGift from "@/components/modal/admin/subscriptions/all-users/ModalSendGift";

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
    const [openSendCredit, setOpenSendCredit] = useState(false);

    const handleOpenSendCredit = () => setOpenSendCredit(true);
    const handleCloseSendCredit = () => setOpenSendCredit(false);

    const renderMenu = ({onClose, right, top, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    // Activate key
                    handleOpenSendCredit();
                    break;
                default:
                    break;
            }
            onClose();
        };

        return (
            <>
                <Popover ref={ref} className={className} style={{right, top}} full>
                    <Dropdown.Menu onSelect={handleSelect}>
                        <Dropdown.Item eventKey={1}>Send Credit Points</Dropdown.Item>
                    </Dropdown.Menu>
                </Popover>

            </>
        );
    };

    return (
        <>
            <Cell {...rests} className="link-group" style={{padding: "4px"}}>
                <Whisper placement="autoVerticalEnd" trigger="click" speaker={renderMenu}>
                    <IconButton appearance="subtle" icon={<MoreIcon/>}/>
                </Whisper>
            </Cell>
            <ModalSendGift open={openSendCredit} handleClose={handleCloseSendCredit} modalData={rowData}/>
        </>
    );
};

export const BooleanCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: "13px"}}>
        {rowData[dataKey] === true ? "Yes" : "No"}
    </Cell>
);
