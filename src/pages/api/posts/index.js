import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import db from "@/libs/prisma/db";
import slugify from "slugify";
import {Prisma} from "@prisma/client";

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
        const posts = await db.post.findMany({
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
            orderBy: [
                {
                    trending: 'desc',
                },
                {
                    updatedAt: 'desc',
                },
            ],
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: posts
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: true, code: ERROR_CODE, message: error, data: []});
    }
}

const createPost = async (req, res) => {
    try {
        const {data} = req.body;

        const newPost = await db.post.create({
            data: {
                postFormat: data.postFormat,
                slug: slugify(data.titleEN.toLowerCase()),
                featureImg: data.featureImg,
                date: data.date,
                post_views: data.post_views,
                post_share: data.post_share,
                videoLink: data.videoLink ? data.videoLink : "",
                audioLink: data.audioLink ? data.audioLink : "",
                gallery: data.gallery ? data.gallery : [],
                story: data.story ? data.story : false,
                trending: data.trending ? data.trending : false,
                status: data.status,
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
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newPost});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    success: false,
                    code: ERROR_CODE,
                    message: 'This title already exists or title English, title Vietnamese are the same! Please try another title!',
                    data: []
                });
            }
        }
        console.log(error.code);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const updatePost = async (req, res) => {
    try {
        const {data} = req.body;
        const post = await db.post.findUnique({
            where: {
                id: data.id
            }
        });

        if (!post) {
            return res.status(404).json({success: false, code: ERROR_CODE, message: "Post not found", data: []});
        }

        await db.postTranslation.update({
            where: {
                postId_languageCode: {
                    postId: post.id,
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

        await db.postTranslation.update({
            where: {
                postId_languageCode: {
                    postId: post.id,
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

        const updatedPost = await db.post.update({
            where: {
                id: post.id
            },
            data: {
                postFormat: data.postFormat,
                slug: slugify(data.titleEN.toLowerCase()),
                featureImg: data.featureImg,
                date: data.date,
                post_views: data.post_views,
                post_share: data.post_share,
                videoLink: data.videoLink ? data.videoLink : "",
                audioLink: data.audioLink ? data.audioLink : "",
                gallery: data.gallery ? data.gallery : [],
                story: data.story ? data.story : false,
                trending: data.trending ? data.trending : false,
                status: data.status,
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
            },
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
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: updatedPost});
    } catch
        (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    success: false,
                    code: ERROR_CODE,
                    message: 'This title already exists or title English, title Vietnamese are the same! Please try another title!',
                    data: []
                });
            }
        }
        console.log(error.code);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const deletePost = async (req, res) => {
    try {
        const {data} = req.body;

        const post = await db.post.findUnique({
            where: {
                id: data.id
            }
        });

        if (!post) {
            return res.status(404).json({success: false, code: ERROR_CODE, message: "Post not found", data: []});
        }

        await db.postTranslation.deleteMany({
            where: {
                postId: post.id
            }
        });

        const deletedPost = await db.post.delete({
            where: {
                id: post.id
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: deletedPost});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default postHandler;