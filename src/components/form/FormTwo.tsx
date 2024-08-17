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
    Divider,
} from "rsuite";
import slugify from "slugify";
import ModalImage from "./members/ModalImage";
import {PostContext} from "@/contextProvider/postContext";
import {initialFormValue, cateList, tagList, postFormatList, authorList} from "@/lib/constant";
import Image from "next/image";
import postAPI from "@/services/posts-api";
import {IoIosAddCircleOutline} from "react-icons/io";

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => <Input {...props} as="textarea" ref={ref}/>);
Textarea.displayName = "Textarea";

const {StringType} = Schema.Types;

const model = Schema.Model({
    postFormat: StringType().isRequired("This field is required."),
    // featureImg: StringType().isRequired("This field is required."),
    cate_slug: StringType().isRequired("This field is required."),
    titleEN: StringType().isRequired("This field is required."),
    excerptEN: StringType().isRequired("This field is required."),
    contentEN: StringType().isRequired("This field is required."),
    titleVI: StringType().isRequired("This field is required."),
    excerptVI: StringType().isRequired("This field is required."),
    contentVI: StringType().isRequired("This field is required."),
});

//This component do 2 jobs, create new post and edit post
const FormTwo = ({formData, handleClose, action, ...rests}: any) => {
    const {posts, setPosts, language, setLoading} = useContext(PostContext);
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [typeSelectImg, setTypeSelectImg] = useState("featureImg");
    const [featureImg, setFeatureImg] = useState<any>([]);
    const [urlImg, setURLImg] = useState("");

    const formRef: any = useRef(initialFormValue);
    const hasFormValue = Boolean(formValue);

    const handleOpenModalImage = () => setOpenModalImage(true);
    const handleCloseModalImage = () => setOpenModalImage(false);

    const handleSetFeatureImg = () => {
        setTypeSelectImg("featureImg");
        handleOpenModalImage();
    }
    const handleSetContentImg = () => {
        setTypeSelectImg("contentImg");
        handleOpenModalImage();
    }

    const handleAddItem = () => {
        alert("Coming soon!");
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formRef.current.check()) {
            console.error("Form error");
            return;
        }

        //on create => generate new slug(fileName), else use the old one
        const newPost = {
            ...formValue,
            slug: formValue.slug !== "" ? formValue.slug : slugify(formValue.titleEN),
            title: language === "en" ? formValue.titleEN : formValue.titleVI,
            content: language === "en" ? formValue.contentEN : formValue.contentVI,
            cate: cateList.filter((cate: any) => cate.value === formValue.cate_slug)[0].label,
            featureImg: featureImg.length !== 0 ? featureImg : formValue.featureImg,
        };

        switch (action) {
            case "CREATE":
                await postAPI.createPost(newPost);
                setPosts([...posts, newPost]);
                setLoading(true);
                break;
            case "UPDATE":
                await postAPI.updatePost(newPost);
                const updatedPosts: any[] = posts.filter((post: any) => post.slug !== formValue.slug);
                const index = posts.findIndex((post: any) => post.slug === formValue.slug);
                updatedPosts.splice(index, 0, newPost);
                setPosts(updatedPosts);
                setLoading(true);
                break;
            default:
                break;
        }

        setFormValue(initialFormValue);
        handleClose();
    };

    const renderPostFormat = () => {
        if (hasFormValue)
            switch (formValue.postFormat) {
                case "video":
                    return (
                        <Form.Group controlId="videoLink">
                            <Form.ControlLabel>Video Link</Form.ControlLabel>
                            <Form.Control name="videoLink"/>
                        </Form.Group>
                    );
                case "audio":
                    return (
                        <Form.Group controlId="audioLink">
                            <Form.ControlLabel>Audio Link</Form.ControlLabel>
                            <Form.Control name="audioLink"/>
                        </Form.Group>
                    );
                default:
                    return null;
            }
    };

    return (
        <>

            <Form style={{all: "unset"}} fluid ref={formRef} model={model} onCheck={setFormError}
                  onChange={setFormValue} formValue={formValue} {...rests}>
                <Row>
                    <PanelGroup accordion bordered>
                        <Panel header="General" defaultExpanded>
                            <Grid fluid>
                                <Row>
                                    <Col xs={2} md={4}>
                                        <Form.Group controlId="featureImg">
                                            <Form.ControlLabel>Feature Image</Form.ControlLabel>
                                            <Button onClick={handleSetFeatureImg}>Select</Button>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={4}
                                         style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="postFormat">
                                            <Form.ControlLabel>Post Type</Form.ControlLabel>
                                            <Form.Control name="postFormat" accepter={SelectPicker}
                                                          data={postFormatList}/>
                                        </Form.Group>
                                        <IoIosAddCircleOutline size={"2em"} className={"btn-add"}
                                                               onClick={handleAddItem}/>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="cate_slug">
                                            <Form.ControlLabel>Category</Form.ControlLabel>
                                            <Form.Control name="cate_slug" accepter={SelectPicker} data={cateList}/>
                                        </Form.Group>
                                        <IoIosAddCircleOutline size={"2em"} className={"btn-add"}
                                                               onClick={handleAddItem}/>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="author_slug">
                                            <Form.ControlLabel>Author</Form.ControlLabel>
                                            <Form.Control name="author_slug" accepter={SelectPicker} data={authorList}/>
                                        </Form.Group>
                                        <IoIosAddCircleOutline size={"2em"} className={"btn-add"}
                                                               onClick={handleAddItem}/>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="tags">
                                            <Form.ControlLabel>Tags</Form.ControlLabel>
                                            <Form.Control name="tags" accepter={CheckPicker} data={tagList}/>
                                        </Form.Group>
                                        <IoIosAddCircleOutline size={"2em"} className={"btn-add"}
                                                               onClick={handleAddItem}/>
                                    </Col>
                                </Row>
                            </Grid>
                            {featureImg.length !== 0 &&
                                <Image src={featureImg} alt="feature image" width={100} height={100}/>}
                            <Divider/>
                            <Form.Group controlId="contentImg">
                                <Form.ControlLabel>Content Image</Form.ControlLabel>
                                <Button onClick={handleSetContentImg}>Select</Button>
                            </Form.Group>
                            {formValue && renderPostFormat()}
                            {urlImg && (
                                <div className="lh-1">
                                    <span className="badge bg-primary text-wrap">Insert these links to anyplace in the content</span>
                                    <p className="whitespace-pre fs-4">{urlImg}</p>
                                </div>
                            )}
                        </Panel>
                        <Panel header="English Content">
                            <Form.Group controlId="titleEN">
                                <Form.ControlLabel>Title</Form.ControlLabel>
                                <Form.Control
                                    name="titleEN"
                                    readOnly={action === "UPDATE"}
                                    style={{backgroundColor: action === "UPDATE" ? "#f5f5f5" : "white"}}
                                />
                            </Form.Group>
                            <Form.Group controlId="excerptEN">
                                <Form.ControlLabel>Excerpt</Form.ControlLabel>
                                <Form.Control name="excerptEN"/>
                            </Form.Group>
                            {formValue.postFormat === "quote" && <Form.Group controlId="quoteTextEN">
                                <Form.ControlLabel>Quote</Form.ControlLabel>
                                <Form.Control name="quoteTextEN"/>
                            </Form.Group>}
                            <Form.Group controlId="contentEN">
                                <Form.ControlLabel>Content</Form.ControlLabel>
                                <Form.Control name="contentEN" accepter={Textarea} rows={28}/>
                            </Form.Group>
                        </Panel>
                        <Panel header="Vietnamese Content">
                            <Form.Group controlId="titleVI">
                                <Form.ControlLabel>Title</Form.ControlLabel>
                                <Form.Control
                                    name="titleVI"
                                    readOnly={action === "UPDATE"}
                                    style={{backgroundColor: action === "UPDATE" ? "#f5f5f5" : "white"}}
                                />
                            </Form.Group>
                            <Form.Group controlId="excerptVI">
                                <Form.ControlLabel>Excerpt</Form.ControlLabel>
                                <Form.Control name="excerptVI"/>
                            </Form.Group>
                            {formValue.postFormat === "quote" && <Form.Group controlId="quoteTextVI">
                                <Form.ControlLabel>Quote</Form.ControlLabel>
                                <Form.Control name="quoteTextVI"/>
                            </Form.Group>}
                            <Form.Group controlId="contentVI">
                                <Form.ControlLabel>Content</Form.ControlLabel>
                                <Form.Control name="contentVI" accepter={Textarea} rows={28}/>
                            </Form.Group>
                        </Panel>
                    </PanelGroup>
                </Row>
                <ButtonToolbar style={{marginTop: "20px", marginRight: "10px", float: "right"}}>
                    <Button appearance="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button appearance="default" onClick={handleClose}>
                        Cancel
                    </Button>
                </ButtonToolbar>
                <ModalImage open={openModalImage} handleClose={handleCloseModalImage} typeSelectImg={typeSelectImg}
                            setURLImg={setURLImg} setFeatureImg={setFeatureImg}/>
            </Form>
        </>
    );
};

export default FormTwo;
