export interface DProduct {
    id: string;
    name: string;
    type: string;
    description: string;
    price: number;
    image: string;
    subscriptionType: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    translations: any;
    subscriptions: any;
}