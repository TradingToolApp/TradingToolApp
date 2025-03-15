import {SubscriptionType, StatusType, PlatformType, ProductType} from "@prisma/client";

export const ACTION = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

export const StatusListForm = [
    {label: "Public", value: StatusType.PUBLIC},
    {label: "Private", value: StatusType.PRIVATE},
];

export const SubscriptionTypeListForm = {
    MONTHLY: SubscriptionType.MONTHLY,
    YEARLY: SubscriptionType.YEARLY,
    LIFETIME: SubscriptionType.LIFETIME,
    TRIAL: SubscriptionType.TRIAL,
};

export const PlatformListForm = [
    {label: "MT5", value: PlatformType.MT5},
    {label: "MT4", value: PlatformType.MT4},
]

export const ProductTypeListForm = [
    {label: "Indicator", value: ProductType.INDICATOR},
    {label: "EA", value: ProductType.EA},
]

export const toastConfig = {
    error: {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    },
    success: {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    }
}