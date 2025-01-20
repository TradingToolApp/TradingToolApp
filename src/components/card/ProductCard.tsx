import React from "react";
import {Button, Card, Divider, Stack, Tag, TagGroup} from "rsuite";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";

const ProductCard = ({productData}: any) => {
    const {screenHeight} = useWindowSize();
    const maxHeight = screenHeight - 200;
    return (
        <Stack justifyContent='flex-start' alignItems="flex-start" wrap spacing={40}
               style={{overflowY: "scroll", maxHeight: `${maxHeight}px`, paddingBlock: "10px", marginLeft: 10}}
        >
            {productData.map((item: any, index: any) =>
                <Card key={index} width={260} shaded>
                    <Image
                        src={item.image}
                        alt="Product's Image"
                        width={300}
                        height={200}
                    />
                    <Card.Header style={{marginBottom: "0px", textAlign: "center"}}>
                        <h4>{item.name}</h4>
                    </Card.Header>
                    <Divider style={{margin: 0}}/>
                    <Card.Body style={{textAlign: "justify"}}>
                        {item.description.length > 100 ?
                            <div>
                                {item.description.slice(0, 100)} ...
                                <Button appearance="link">More</Button>
                            </div>
                            :
                            <div>{item.description}</div>
                        }
                        <TagGroup>
                            <Tag size="sm">🐶 Dog</Tag>
                            <Tag size="sm">☀️ Sunny</Tag>
                            <Tag size="sm">🌈 Rainbow</Tag>
                        </TagGroup>
                    </Card.Body>
                </Card>
            )}
        </Stack>
    )
}

export default ProductCard;