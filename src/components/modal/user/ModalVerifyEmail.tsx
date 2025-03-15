import React from "react";
import {signOut} from "next-auth/react";
import {Button, Modal} from "rsuite";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import userAPI from "@/libs/api-client/restful/user.api";

const ModalVerifyEmail = ({modalData, open, handleClose, ...rests}: any) => {
    const [loading, setLoading] = React.useState(false);
    const handleVerifyEmail = async () => {
        setLoading(true);
        const res = await userAPI.sendVerifyEmail(modalData.email)
        if (!res.success) {
            setLoading(false);
            return toast.error(res.message, toastConfig.error as any);
        }
        setLoading(false);
        handleClose();
        return toast.success(res.message, toastConfig.success as any);
    }
    return (
        <Modal className="justify-center" backdrop="static" role="alertdialog" open={open} onClose={handleClose}
               size="xs">
            <Modal.Body>
                <CheckRoundIcon style={{color: '#3498ff', fontSize: 36, marginRight: "15px"}}/>
                Click here to verify your email
            </Modal.Body>
            <Modal.Footer>
                <Button appearance="primary" onClick={handleVerifyEmail} disabled={loading}>
                    Verify Email
                </Button>
                <Button appearance="primary" onClick={() => signOut({callbackUrl: '/login'})} disabled={loading}>
                    Sign Out
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalVerifyEmail;