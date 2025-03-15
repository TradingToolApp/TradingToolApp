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
    Tabs,
    Row,
    Col
} from "rsuite";
import Image from "next/image";
import {useAddProduct, useUpdateProduct} from "@/hooks/data/admin/useProducts";
import ModalSelectImage from "@/components/modal/admin/images/ModalSelectImage";
import {Textarea, SelectPickerCustom, InputWithCopyButton} from "../customElement";
import {StatusListForm, PlatformListForm, ProductTypeListForm} from "@/libs/constant";

const {StringType, NumberType} = Schema.Types;

const model = Schema.Model({
    id: NumberType().isRequired("This field is required."),
    name: StringType().isRequired("This field is required."),
    image: StringType().isRequired("This field is required."),
    price: StringType().isRequired("This field is required."),
    type: StringType().isRequired("This field is required."),
    platform: StringType().isRequired("This field is required."),
    status: StringType().isRequired("This field is required."),
    allowedVersion: NumberType().isRequired("This field is required."),
    latestVersion: NumberType().isRequired("This field is required."),
    forceUpdateCode: NumberType().isRequired("This field is required."),
    urlPost: StringType().isRequired("This field is required."),
    urlDownload: StringType().isRequired("This field is required."),
    description_EN: StringType().isRequired("This field is required."),
    description_VI: StringType().isRequired("This field is required."),
});

const initialFormValue = {
    id: "",
    name: "",
    image: "/images/390x390.png",
    price: "",
    type: "",
    platform: "",
    status: "",
    allowedVersion: "",
    latestVersion: "",
    forceUpdateCode: "",
    urlPost: "",
    urlDownload: "",
    description_EN: "",
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
            <Form className="h-100" fluid ref={formRef} model={model} onCheck={setFormError}
                  onChange={setFormValue} formValue={formValue} {...rests}>
                <VStack className="h-100">
                    <FlexboxGrid className="h-100 w-100" justify="space-between">
                        <FlexboxGrid.Item colspan={16}>
                            <Grid className="me-4" fluid>
                                <Row className="my-4">
                                    <Col xs={6}>
                                        <Form.Group controlId="id">
                                            <Form.ControlLabel>ID</Form.ControlLabel>
                                            <Form.Control name="id" disabled={action === "UPDATE"}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group controlId="name">
                                            <Form.ControlLabel>Name</Form.ControlLabel>
                                            <Form.Control name="name"/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group controlId="price">
                                            <Form.ControlLabel>Price</Form.ControlLabel>
                                            <Form.Control name="price"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-4" gutter={50}>
                                    <Col>
                                        <Form.Group controlId="type">
                                            <Form.ControlLabel>Type</Form.ControlLabel>
                                            <Form.Control name="type" accepter={SelectPickerCustom}
                                                          data={ProductTypeListForm}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="platform">
                                            <Form.ControlLabel>Platform</Form.ControlLabel>
                                            <Form.Control name="platform" accepter={SelectPickerCustom}
                                                          data={PlatformListForm}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="status">
                                            <Form.ControlLabel>status</Form.ControlLabel>
                                            <Form.Control name="status" accepter={SelectPickerCustom}
                                                          data={StatusListForm}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-4">
                                    <Col xs={8}>
                                        <Form.Group controlId="allowedVersion">
                                            <Form.ControlLabel>Allowed Version</Form.ControlLabel>
                                            <Form.Control name="allowedVersion"/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Group controlId="latestVersion">
                                            <Form.ControlLabel>Latest Version</Form.ControlLabel>
                                            <Form.Control name="latestVersion"/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Group controlId="forceUpdateCode">
                                            <Form.ControlLabel>Force Update Code</Form.ControlLabel>
                                            <Form.Control name="forceUpdateCode"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="urlPost">
                                    <Form.ControlLabel>urlPost</Form.ControlLabel>
                                    <Form.Control name="urlPost"/>
                                </Form.Group>
                                <Form.Group controlId="urlDownload">
                                    <Form.ControlLabel>urlDownload</Form.ControlLabel>
                                    <Form.Control name="urlDownload"/>
                                </Form.Group>
                            </Grid>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={8}>
                            <div className="rsuite-custom-tab">
                                <Tabs defaultActiveKey={"1"}>
                                    <Tabs.Tab eventKey="1" title="English">
                                        <Form.Group controlId="description_EN">
                                            <Form.ControlLabel>Description EN</Form.ControlLabel>
                                            <Form.Control name="description_EN" accepter={Textarea} rows={5}/>
                                        </Form.Group>
                                    </Tabs.Tab>
                                    <Tabs.Tab eventKey="2" title="Vietnamese">
                                        <Form.Group controlId="description_VI">
                                            <Form.ControlLabel>Description VI</Form.ControlLabel>
                                            <Form.Control name="description_VI" accepter={Textarea} rows={5}/>
                                        </Form.Group>
                                    </Tabs.Tab>
                                </Tabs>
                                <Form.Group className="my-4" controlId="image">
                                    <Form.ControlLabel>Image</Form.ControlLabel>
                                    <Button onClick={handleOpenModalImage}>Select</Button>
                                </Form.Group>
                                {action === "UPDATE" && img.length === 0 &&
                                    <Image src={formValue.image} alt="Product's Image" width={150} height={150}/>}
                                {img.length !== 0 &&
                                    <Image src={img[0]} alt="Product's Image" width={150} height={150}/>}
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