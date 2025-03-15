export type DUserSession = {
    profile: {
        id: string;
        image: string;
        name: string;
        email: string;
        phone: string;
    },
    status: string;
    expires: any;
    redirect: (route: any) => void;
}