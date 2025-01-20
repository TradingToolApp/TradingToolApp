import {Role, SubscriptionType} from "@prisma/client";

export const ACTION = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

export const PostStatus = {
    PUBLIC: "public",
    PRIVATE: "private",
}

export const toastConfig = {
    error: {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    },
    success: {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    }
}

export const UserRoles = [
    {
        type: Role.ADMIN,
        name: "Admin"
    },
    {
        type: Role.USER,
        name: "User"
    }
]

export const SubscriptionPlans = [
    {
        type: SubscriptionType.MONTHLY,
        title: "Monthly",
        amount: "5",
        duration: "30",
        description: "Get started with our monthly plan.",
        buttonText: "Subscribe",
        buttonColor: "cyan"
    },
    {
        type: SubscriptionType.YEARLY,
        title: "Yearly",
        amount: "60",
        duration: "365",
        description: "Get started with our yearly plan.",
        buttonText: "Subscribe",
        buttonColor: "orange"
    }
]