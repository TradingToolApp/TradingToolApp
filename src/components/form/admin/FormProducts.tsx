"use client";

import React, {useRef, useState} from "react";
import {
    Form,
    Schema,
    ButtonToolbar,
    Button,
    Grid,
    VStack,
    FlexboxGrid,
    Tabs
} from "rsuite";
import {Textarea} from "@/components/form/customElement";
import Image from "next/image";
import ModalSelectImage from "@/components/modal/admin/images/ModalSelectImage";
import {useAddProduct, useUpdateProduct} from "@/hooks/data/admin/useProducts";

const {StringType} = Schema.Types;

const model = Schema.Model({
    name_EN: StringType().isRequired("This field is required."),
    description_EN: StringType().isRequired("This field is required."),
    name_VI: StringType().isRequired("This field is required."),
    description_VI: StringType().isRequired("This field is required."),
});

const initialFormValue = {
    id: "",
    image: "/images/390x390.png",
    url: "",
    name_EN: "",
    description_EN: "",
    name_VI: "",
    description_VI: "",
}

//This component do 2 jobs, create new product and update product
const FormProducts = ({formData, handleClose, action, ...rests}: any) => {
    const addProduct = useAddProduct();
    const updateProduct = useUpdateProduct();
    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [img, setImg] = useState([]);
    const [loading, setLoading] = useState(false);

    const formRef: any = useRef(initialFormValue);

    const handleOpenModalImage = () => setOpenModalImage(true);
    const handleCloseModalImage = () => setOpenModalImage(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formRef.current.check()) {
            console.error(formRef.current);
            return;
        }

        try {
            //on create => generate new slug(fileName), else use the old one
            const newProduct = {
                ...formValue,
                image: img.length !== 0 ? img[0] : formValue.image,
            };

            switch (action) {
                case "CREATE":
                    setLoading(true);
                    const resCreate = await addProduct.mutateAsync(newProduct);
                    if (resCreate.success) {
                        setFormValue(initialFormValue);
                        handleClose();
                    }
                    setLoading(false);
                    break;
                case "UPDATE":
                    setLoading(true);
                    const resUpdate = await updateProduct.mutateAsync(newProduct);
                    if (resUpdate.success) {
                        setFormValue(initialFormValue);
                        handleClose();
                    }
                    setLoading(false);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form style={{all: "unset"}} fluid ref={formRef} model={model} onCheck={setFormError}
                  onChange={setFormValue} formValue={formValue} {...rests}>
                <VStack>
                    <FlexboxGrid style={{width: "100%"}}>
                        <FlexboxGrid.Item colspan={12}>
                            <Grid fluid>
                                <Form.Group controlId="product_img">
                                    <Form.ControlLabel>Image</Form.ControlLabel>
                                    <Button onClick={handleOpenModalImage}>Select</Button>
                                </Form.Group>
                                {action === "UPDATE" && img.length === 0 &&
                                    <Image src={formValue.image} alt="Product's Image" width={100} height={100}/>}
                                {img.length !== 0 &&
                                    <Image src={img[0]} alt="Product's Image" width={100} height={100}/>}
                            </Grid>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={12}>
                            <div className="rsuite-custom-tab">
                                <Tabs defaultActiveKey={"1"}>
                                    <Tabs.Tab eventKey="1" title="English">
                                        <Form.Group controlId="name_EN">
                                            <Form.ControlLabel>Name EN</Form.ControlLabel>
                                            <Form.Control name="name_EN"/>
                                        </Form.Group>
                                        <Form.Group controlId="description_EN">
                                            <Form.ControlLabel>Description EN</Form.ControlLabel>
                                            <Form.Control name="description_EN" accepter={Textarea} rows={5}/>
                                        </Form.Group>
                                    </Tabs.Tab>
                                    <Tabs.Tab eventKey="2" title="Vietnamese">
                                        <Form.Group controlId="name_VI">
                                            <Form.ControlLabel>Name VI</Form.ControlLabel>
                                            <Form.Control name="name_VI"/>
                                        </Form.Group>
                                        <Form.Group controlId="description_VI">
                                            <Form.ControlLabel>Description VI</Form.ControlLabel>
                                            <Form.Control name="description_VI" accepter={Textarea} rows={5}/>
                                        </Form.Group>
                                    </Tabs.Tab>
                                </Tabs>
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <ButtonToolbar style={{marginTop: "20px", marginRight: "20px", marginLeft: "auto"}}>
                        <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
                            Submit
                        </Button>
                        <Button appearance="default" onClick={handleClose} disabled={loading}>
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </VStack>
                <ModalSelectImage open={openModalImage} handleClose={handleCloseModalImage} setReturnedImg={setImg}/>
            </Form>

        </>
    );
};

export default FormProducts;
