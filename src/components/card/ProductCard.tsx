import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Button, ButtonGroup, Card, CardGroup, Divider, HStack, Stack, Tag, TagGroup, Text, VStack} from "rsuite";
import useWindowSize from "@/hooks/useWindowSize";
import {PlatformType, ProductType} from "@prisma/client";

const ProductCard = ({productData}: any) => {
    const {screenHeight} = useWindowSize();
    const maxHeight = screenHeight - 200;
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<number[]>([]);

    const toggleSetFilter = (e: any, index: number) => {
        if (activeFilter.includes(index)) {
            setActiveFilter(activeFilter.filter((item) => item !== index));
            e.currentTarget.blur();
        } else {
            setActiveFilter([...activeFilter, index]);
        }
    }

    const filteredProduct = productData.filter((product: any) => {
        if (activeFilter.length === 0) {
            return true;
        }
        if (activeFilter.includes(0) && product.platform === PlatformType.MT5) {
            return true;
        }
        if (activeFilter.includes(1) && product.platform === PlatformType.MT4) {
            return true;
        }
        if (activeFilter.includes(2) && product.type === ProductType.EA) {
            return true;
        }
        if (activeFilter.includes(3) && product.type === ProductType.INDICATOR) {
            return true;
        }
        return;
    });

    return (
        <div>
            <div className="product-filter-button-group m-2 p-2">
                <ButtonGroup>
                    <Button key={0} appearance="subtle" active={activeFilter.includes(0)}
                            onClick={(e) => toggleSetFilter(e, 0)}>
                        <Image src="/images/Metatrader5.svg" alt="mt5" width={20} height={20}/>MetaTrader5
                    </Button>
                    <Button key={1} appearance="subtle" active={activeFilter.includes(1)}
                            onClick={(e) => toggleSetFilter(e, 1)}>
                        <Image src="/images/Metatrader4.svg" alt="mt4" width={20} height={20}/>MetaTrader4
                    </Button>
                    <Button key={2} appearance="subtle" active={activeFilter.includes(2)}
                            onClick={(e) => toggleSetFilter(e, 2)}>
                        Experts
                    </Button>
                    <Button key={3} appearance="subtle" active={activeFilter.includes(3)}
                            onClick={(e) => toggleSetFilter(e, 3)}>
                        Indicators
                    </Button>
                </ButtonGroup>
            </div>
            <div className="product-card-two">
                <CardGroup className="card-group-two" columns={4}>
                    {filteredProduct.map((product: any, index: any) => (
                        <Card key={index} width={250} size="sm" shaded bordered>
                            <Image
                                src={product.image}
                                alt="Image product"
                                width={250}
                                height={250}
                            />
                            <Card.Header as="h5" className="text-center">
                                {product.name}
                            </Card.Header>
                            <Divider className="m-0"/>
                            <Card.Body className="p-2">
                                <div>
                                    <HStack justifyContent="space-between" alignItems="center"
                                            divider={<Divider className="m-0" vertical/>}>
                                        <VStack alignItems="center" justifyContent="center"
                                                divider={<Divider className="m-0"/>}>
                                            <Button appearance="link" color="red" className="m-0"
                                            >Buy</Button>
                                            <Button appearance="link" color="red" className="m-0"
                                            >Rent</Button>
                                        </VStack>
                                        <h4 className="m-0">
                                            ${product.price}
                                        </h4>
                                        <VStack alignItems="center" divider={<Divider className="m-0"/>}>
                                            <Button appearance="link" color="red" className="m-0"
                                            >Trial</Button>
                                            <Button appearance="link" color="red" className="m-0"
                                            >
                                                <Image src="/images/Metatrader5.svg" alt="mt5" width={14} height={14}/>
                                                {product.platform}
                                            </Button>
                                        </VStack>
                                    </HStack>
                                </div>
                            </Card.Body>
                            <Divider className="m-0"/>
                            <Card.Footer className="p-4">
                                <VStack>
                                    <Text align="justify" maxLines={5}>
                                        {product.description}</Text>
                                    <VStack.Item alignSelf="flex-end">
                                        <Button appearance="link" color="red" className="m-0"
                                                onClick={() => router.push(product.urlPost)}>Read More</Button>
                                    </VStack.Item>
                                </VStack>
                            </Card.Footer>
                        </Card>
                    ))}
                </CardGroup>
            </div>
        </div>
    )
}

export default ProductCard;