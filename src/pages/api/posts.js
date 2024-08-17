import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "../../../lib/constant";
import prisma from "../../../lib/prisma";

const postHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getPosts(req, res);
        case "POST":
            return createPost(req, res);
        case "PUT":
            return updatePost(req, res);
        case "DELETE":
            return deletePost(req, res);
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                translations: true,
                tags: {
                    include: {
                        translations: true,
                    }
                },
                author: {
                    include: {
                        translations: true,
                    }
                },
                category: {
                    include: {
                        translations: true,
                    }
                },
            },
            orderBy: {
                id: 'asc'
            }
        });

        res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: posts});
    } catch (error) {
        console.log(error)
        res.status(500).json({success: true, code: ERROR_CODE, message: error, data: []});
    }
}

const createPost = async (req, res) => {
    try {
        const { data } = req.body;
        console.log(data.tags.map(tag => {
                    return {
                        tag_slug: tag
                    }
                }))
        const newPost = await prisma.post.create({
            data: {
                postFormat: data.postFormat,
                slug: data.slug,
                featureImg: data.featureImg,
                date: data.date,
                post_views: data.post_views,
                post_share: data.post_share,
                videoLink: data.videoLink ? data.videoLink : "",
                audioLink: data.audioLink ? data.audioLink : "",
                gallery: data.gallery ? data.gallery : [],
                story: data.story ? data.story : false,
                trending: data.trending ? data.trending : false,
                published: data.published ? data.published : false,
                translations: {
                    create: [{
                        title: data.titleEN,
                        excerpt: data.excerptEN,
                        content: data.contentEN,
                        quoteText: data.quoteTextEN,
                        language: {connect: {code: "en"}},
                    }, {
                        title: data.titleVI,
                        excerpt: data.excerptVI,
                        content: data.contentVI,
                        quoteText: data.quoteTextVI,
                        language: {connect: {code: "vi"}},
                    }],
                },
                author: {
                    connect: {author_slug: data.author_slug},
                },
                category: {
                    connect: {cate_slug: data.cate_slug},
                },
                tags: {
                    connect: data.tags.map(tag => {
                        return {
                            tag_slug: tag
                        }
                    })
                }
            },
        });

        res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newPost});
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const updatePost = async (req, res) => {
    try {
        const { data } = req.body;

        const updatedPostTranslationsEN = await prisma.postTranslation.update({
            where: {
                postId_languageCode: {
                    postId: data.id,
                    languageCode: "en"
                }
            },
            data: {
                title: data.titleEN,
                excerpt: data.excerptEN,
                content: data.contentEN,
                quoteText: data.quoteTextEN,
            }
        })
        const updatedPostTranslationsVN = await prisma.postTranslation.update({
            where: {
                postId_languageCode: {
                    postId: data.id,
                    languageCode: "vi"
                }
            },
            data: {
                title: data.titleVI,
                excerpt: data.excerptVI,
                content: data.contentVI,
                quoteText: data.quoteTextVI,
            }
        })

        const updatedPost = await prisma.post.update({
            where: {
                id: data.id
            },
            data: {
                postFormat: data.postFormat,
                featureImg: data.featureImg,
                date: data.date,
                post_views: data.post_views,
                post_share: data.post_share,
                videoLink: data.videoLink ? data.videoLink : "",
                audioLink: data.audioLink ? data.audioLink : "",
                gallery: data.gallery ? data.gallery : [],
                story: data.story ? data.story : false,
                trending: data.trending ? data.trending : false,
                published: data.published ? data.published : false,
                author: {
                    connect: {author_slug: data.author_slug},
                },
                category: {
                    connect: {cate_slug: data.cate_slug},
                },
                tags: {
                    connect: data.tags.map(tag => {
                        return {
                            tag_slug: tag
                        }
                    })
                },
            }
        });

        res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: updatedPost});
    } catch
        (error) {
        console.log(error)
        res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const deletePost = async (req, res) => {
    try {
        const { slug } = req.body;
        const {id} = await prisma.post.findUnique({
            where: {
                slug: slug
            },
            select: {
                id: true
            }
        });

        const deletedPostTranslate = await prisma.postTranslation.deleteMany({
            where: {
                postId: id
            }
        });
        const deletedPost = await prisma.post.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: deletedPost});
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default postHandler;