"use client";

import React, {useRef, useContext, useState} from "react";
import {
    Form,
    Schema,
    CheckPicker,
    SelectPicker,
    Input,
    PanelGroup,
    Panel,
    ButtonToolbar,
    Button,
    Grid,
    Row,
    Col,
    useToaster,
    Message,
} from "rsuite";
import slugify from "slugify";
import ModalImage from "@/components/modal/ModalImage";
import {AppContext} from "@/providers/appProvider";
import Image from "next/image";
import categoryAPI from "@/services/category-api";

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => <Input {...props} as="textarea" ref={ref}/>);
Textarea.displayName = "Textarea";

const SelectPickerCustom = React.forwardRef<HTMLInputElement, any>((props, ref) => <SelectPicker searchable={false} menuMaxHeight={200} style={{width: "100px"}} {...props} ref={ref}/>);
SelectPickerCustom.displayName = "SelectPickerCustom";

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
    cate_img: "/images/defaultCategoryImage.jpg",
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
    const toaster = useToaster();
    const {language, categories, setCategories} = useContext(AppContext);
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [img, setImg] = useState([]);

    const formRef: any = useRef(initialFormValue);
    const hasFormValue = Boolean(formValue);

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
                label: language === "en" ? formValue.cateEN : formValue.cateVI,
                cate_img: img.length !== 0 ? img[0] : formValue.cate_img,
            };

            console.log(newCategory)

            switch (action) {
                case "CREATE":
                    const resCreate = await categoryAPI.createCategory(newCategory);
                    if(resCreate.success === false) {
                        return toaster.push(<Message type={"error"}>{resCreate.message}</Message>);
                    }
                    setCategories([...categories, newCategory]);
                    break;
                case "UPDATE":
                    const resUpdate = await categoryAPI.updateCategory(newCategory);
                    if(resUpdate.success === false) {
                        return toaster.push(<Message type={"error"}>{resUpdate.message}</Message>);
                    }
                    const updatedCategories: any[] = categories.filter((category: any) => category.cate_slug !== formValue.cate_slug);
                    const index = categories.findIndex((category: any) => category.cate_slug === formValue.cate_slug);
                    updatedCategories.splice(index, 0, newCategory);
                    setCategories(updatedCategories);
                    break;
                default:
                    break;
            }

            // setFormValue(initialFormValue);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form style={{all: "unset"}} fluid ref={formRef} model={model} onCheck={setFormError}
                  onChange={setFormValue} formValue={formValue} {...rests}>
                <Row>

                    <Panel>
                        <Grid fluid>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="cateEN">
                                        <Form.ControlLabel>Name EN</Form.ControlLabel>
                                        <Form.Control name="cateEN"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={18}>
                                    <Form.Group controlId="descriptionEN">
                                        <Form.ControlLabel>Description EN</Form.ControlLabel>
                                        <Form.Control name="descriptionEN"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                    <Panel>
                        <Grid fluid>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="cateVI">
                                        <Form.ControlLabel>Name VI</Form.ControlLabel>
                                        <Form.Control name="cateVI"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={18}>
                                    <Form.Group controlId="descriptionVI">
                                        <Form.ControlLabel>Description VI</Form.ControlLabel>
                                        <Form.Control name="descriptionVI"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                    <Panel>
                        <Form.Group controlId="cate_bg">
                            <Form.ControlLabel>Color</Form.ControlLabel>
                            <Form.Control name="cate_bg" accepter={SelectPickerCustom}
                                          data={colorList}/>
                        </Form.Group>
                        <Form.Group controlId="cate_img">
                            <Form.ControlLabel>Image</Form.ControlLabel>
                            <Button onClick={handleOpenModalImage}>Select</Button>
                            {action === "UPDATE" && img.length === 0 && <Image src={formValue.cate_img} alt="Category image" width={100} height={100}/>}
                            {img.length !== 0 &&
                                <Image src={img[0]} alt="Category image" width={100} height={100}/>}
                        </Form.Group>
                    </Panel>
                </Row>
                <ButtonToolbar style={{marginTop: "20px", marginRight: "10px", float: "right"}}>
                    <Button appearance="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button appearance="default" onClick={handleClose}>
                        Cancel
                    </Button>
                </ButtonToolbar>
                <ModalImage open={openModalImage} handleClose={handleCloseModalImage} setReturnedImg={setImg} />
            </Form>
        </>
    );
};

export default FormCategories;
