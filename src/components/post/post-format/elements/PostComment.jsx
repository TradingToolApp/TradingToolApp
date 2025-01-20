import React, {useState, useRef, useMemo} from 'react';
import axios from 'axios';
import FormGroup from "../../../contact/FormGroup";
import {useEffect} from "react";
import Image from "next/image";
import {Loader, Pagination} from "rsuite";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import commentAPI from "@/libs/api-client/restful/comment-api";

const PostComment = ({commentData}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const formRef = useRef();

    const renderComment = useMemo(() => {
        return data.slice(activePage * 4 - 4, activePage * 4);
    }, [data, activePage])

    const handlePostComment = async (e) => {
        try {
            e.preventDefault();

            const newComment = {
                post_slug: commentData.slug,
                comment: formRef.current[0].value,
                name: formRef.current[1].value,
                email: formRef.current[2].value,
            }

            await commentAPI.createComment(newComment);
            formRef.current[0].value = "";
            formRef.current[1].value = "";
            formRef.current[2].value = "";

            toast.success("Thank you for leaving reply!", toastConfig);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            setLoading(true);
            const fetchData = async () => {
                const res = await commentAPI.getCommentByPostSlug(commentData.slug);
                setData(res.data);
            }
            fetchData();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [commentData.slug])

    if (loading) return <Loader style={{marginTop: "25%"}} backdrop size="md" content="loading..."/>
    return (
        <div className="post-comment-area">
            <div className="comment-box">
                <h2>Leave A Reply</h2>
                <p>
                    Your email address will not be published.
                    <span className="primary-color">*</span>
                </p>
            </div>
            {/* End of .comment-box */}
            <form onSubmit={handlePostComment}
                  ref={formRef}
                  className="comment-form row m-b-xs-10">
                <div className="col-12">
                    <FormGroup pClass="comment-message-field" label="Comment" type="textarea" name="comment-message"
                               rows={3}/>
                </div>
                <div className="col-md-4">
                    <FormGroup type="text" name="name" label="Name"/>
                </div>
                <div className="col-md-4">
                    <FormGroup type="text" name="email" label="Email"/>
                </div>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-primary">POST COMMENT</button>
                </div>
            </form>
            {renderComment.length !== 0 &&
                <div className="reply-box">
                    <div style={{display: "flex", gap: "1rem", alignItems: "center", marginBottom: "20px"}}>
                        <span>Page: </span>
                        <Pagination size={"md"} total={data.length} limit={4} activePage={activePage}
                                    onChangePage={setActivePage}/>
                    </div>
                    <ul className="comment-list">
                        {
                            renderComment.map((comment, index) => (
                                <li key={comment.id}>
                                    <div className="comment">
                                        <div className="comment-user">
                                            <div className="comment-meta">
                                                <div className="user-meta">
                                                    <h4 className="comment-user-name">{comment.name}</h4>
                                                </div>
                                                <span className="comment-date">{comment.createdAt.slice(0, 10)}</span>
                                            </div>
                                            <div className="comment-body">
                                                <p>
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="comment-author">
                                            <div className="comment-meta">
                                                <div className="author-meta">
                                                    <Image src={commentData.author_img} height={50} width={50}
                                                           alt="author"/>
                                                    <h4 className="comment-author-name">{commentData.author_name}</h4>
                                                </div>
                                                <span className="comment-date">{comment.updatedAt.slice(0, 10)}</span>
                                            </div>
                                            <div className="comment-body">
                                                <p>
                                                    {comment.reply}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    );
};

export default PostComment;
