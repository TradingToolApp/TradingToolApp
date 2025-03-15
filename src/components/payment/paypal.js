import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";
import axios from "axios";

const PayPal = ({product, user, handleClose, ...rests}) => {
    const paypalCreateOrder = async () => {
        try {
            let response = await axios.post('/api/paypal/create-order', {
                user: user.profile,
                product: product,
            })

            return response.data.id
        } catch (err) {
            toast.error('Some Error Occurred!', toastConfig.error)
            return null
        }
    }
    const paypalCaptureOrder = async data => {
        try {
            let response = await axios.post('/api/paypal/capture-order', {
                ...data,
                user: user.profile,
                product: product
            })

            if (response.data.success) {
                toast.success('Payment Successful', toastConfig.success);
                handleClose();
            }
        } catch (err) {
            toast.error(err.response.data.message, toastConfig.error)
        }
    }

    return (
        <PayPalScriptProvider
            options={{
                'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                currency: 'USD',
                intent: 'capture'
            }}
        >
            <PayPalButtons
                className="w-100"
                style={{
                    color: 'gold',
                    shape: 'rect',
                    label: 'pay',
                    height: 50
                }}
                createOrder={async (data, actions) => {
                    let order_id = await paypalCreateOrder()
                    return order_id + ''
                }}
                onApprove={async (data, actions) => {
                    let response = await paypalCaptureOrder(data)
                    if (response) return true
                }}
            />
        </PayPalScriptProvider>
    );
}

export default PayPal;