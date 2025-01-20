"use client";

import React, {useRef, useState} from "react";
import {
    Form,
    Schema,
    Panel,
    ButtonToolbar,
    Button,
    Grid,
    Row,
    Col, HStack, VStack,
} from "rsuite";
import Image from "next/image";
import ModalSelectImage from "@/components/modal/admin/images/ModalSelectImage";
import {useAddCategory, useUpdateCategory} from "@/hooks/data/admin/useCategories";
import {SelectPickerCustom} from "../customElement";

const {StringType} = Schema.Types;

const model = Schema.Model({
    cate_bg: StringType().isRequired("This field is required."),
    cate_img: StringType().isRequired("This field is required."),
    cateEN: StringType().isRequired("This field is required."),
    descriptionEN: StringType().isRequired("This field is required."),
    cateVI: StringType().isRequired("This field is required."),
    descriptionVI: StringType().isRequired("This field is required."),
});

const initialFormValue = {
    id: "",
    value: "",
    label: "",
    cate_slug: "",
    cate_bg: "",
    cate_img: "/images/category/190x190.png",
    cateEN: "",
    descriptionEN: "",
    cateVI: "",
    descriptionVI: "",
}
const colorClasses = [
    "bg-primary-color",
    "bg-secondary-color",
    "bg-tertiary-color",
    "bg-grey-dark-key",
    "bg-grey-dark-one",
    "bg-grey-dark-two",
    "bg-grey-dark-three",
    "bg-grey-dark-four",
    "bg-grey-dark-five",
    "bg-grey-dark-six",
    "bg-grey-dark-seven",
    "bg-grey-dark-eight",
    "bg-grey-mid",
    "bg-grey-light-one",
    "bg-grey-light-two",
    "bg-grey-light-three",
    "border-bg-color",
    "bg-color-success",
    "bg-color-danger",
    "bg-color-warning",
    "bg-color-info",
    "bg-color-facebook",
    "bg-color-twitter",
    "bg-color-instagram",
    "bg-color-youtube",
    "bg-color-linkedin",
    "bg-color-pinterest",
    "bg-color-vimeo",
    "bg-color-twitch",
    "bg-color-green-one",
    "bg-color-green-two",
    "bg-color-green-three",
    "bg-color-blue-one",
    "bg-color-blue-two",
    "bg-color-blue-three",
    "bg-color-blue-four",
    "bg-color-red-one",
    "bg-color-red-two",
    "bg-color-purple-one",
    "bg-color-purple-two",
    "bg-color-yellow-one",
    "bg-color-yellow-two",
    "bg-color-blue-grey-one",
    "bg-color-white"
];
const colorList = colorClasses.map(color => ({
    value: color,
    label: <div className={color}>&nbsp;</div>,
}));

//This component do 2 jobs, create new category and update category
const FormCategories = ({formData, handleClose, action, ...rests}: any) => {
    const [loading, setLoading] = useState(false);
    const addCategory = useAddCategory();
    const updateCategory = useUpdateCategory();
    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [img, setImg] = useState([]);

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
            const newCategory = {
                ...formValue,
                // cate_slug: action === "CREATE" ? slugify(formValue.cateEN, {lower: true}) : formValue.cate_slug,
                // label: language === "en" ? formValue.cateEN : formValue.cateVI,
                cate_img: img.length !== 0 ? img[0] : formValue.cate_img,
            };

            switch (action) {
                case "CREATE":
                    setLoading(true);
                    const resCreate = await addCategory.mutateAsync(newCategory);
                    if (resCreate.success) {
                        setFormValue(initialFormValue);
                        handleClose();
                    }
                    setLoading(false);
                    break;
                case "UPDATE":
                    setLoading(true);
                    const resUpdate = await updateCategory.mutateAsync(newCategory);
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
            <Form fuild style={{all: "unset"}} fluid ref={formRef} model={model} onCheck={setFormError}
                  onChange={setFormValue} formValue={formValue} {...rests}>
                <VStack>
                    <HStack spacing={20} className="w-100">
                        <HStack.Item basis={150}>
                            <Form.Group controlId="cateEN">
                                <Form.ControlLabel>Name EN</Form.ControlLabel>
                                <Form.Control name="cateEN"/>
                            </Form.Group>
                        </HStack.Item>
                        <HStack.Item grow={1}>
                            <Form.Group controlId="descriptionEN">
                                <Form.ControlLabel>Description EN</Form.ControlLabel>
                                <Form.Control name="descriptionEN"/>
                            </Form.Group>
                        </HStack.Item>
                    </HStack>

                    <HStack spacing={20} className="w-100">
                        <HStack.Item basis={150}>
                            <Form.Group controlId="cateVI">
                                <Form.ControlLabel>Name VI</Form.ControlLabel>
                                <Form.Control name="cateVI"/>
                            </Form.Group>
                        </HStack.Item>
                        <HStack.Item flex={1000} grow={1}>
                            <Form.Group controlId="descriptionVI">
                                <Form.ControlLabel>Description VI</Form.ControlLabel>
                                <Form.Control name="descriptionVI"/>
                            </Form.Group>
                        </HStack.Item>
                    </HStack>

                    <Form.Group controlId="cate_bg">
                        <Form.ControlLabel>Color</Form.ControlLabel>
                        <Form.Control name="cate_bg" accepter={SelectPickerCustom}
                                      data={colorList}/>
                    </Form.Group>
                    <Form.Group controlId="cate_img">
                        <Form.ControlLabel>Image</Form.ControlLabel>
                        <Button onClick={handleOpenModalImage}>Select</Button>
                    </Form.Group>
                    {action === "UPDATE" && img.length === 0 &&
                        <Image src={formValue.cate_img} alt="Category image" width={100} height={100}/>}
                    {img.length !== 0 &&
                        <Image src={img[0]} alt="Category image" width={100} height={100}/>}
                </VStack>

                <ButtonToolbar style={{marginTop: "20px", marginRight: "10px", float: "right"}}>
                    <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
                        Submit
                    </Button>
                    <Button appearance="default" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                </ButtonToolbar>
                <ModalSelectImage open={openModalImage} handleClose={handleCloseModalImage} setReturnedImg={setImg}/>
            </Form>
        </>
    );
};

export default FormCategories;
