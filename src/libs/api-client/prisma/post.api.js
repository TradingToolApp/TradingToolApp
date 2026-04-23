import db from "@/libs/prisma/db";
import {StatusType} from "@prisma/client";

export const getPosts = async (fields = []) => {
    const data = await db.post.findMany({
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
            {
                id: 'asc',
            }
        ],
    });

    if (fields.length === 0) {
        return JSON.parse(JSON.stringify(data));
    }

    const posts = data.map((post) => {
        const items = {};
        fields.map((field) => {
                if (typeof post[field] !== 'undefined') {
                    items[field] = post[field]
                }
            }
        )
        return items;
    })

    return JSON.parse(JSON.stringify(posts));
}

export const getPublicPosts = async (fields = []) => {
    try {
        const data = await db.post.findMany({
            where: {
                status: StatusType.PUBLIC,
            },
            include: {
                translations: {
                    select: {
                        id: true,
                        postId: true,
                        languageCode: true,
                        title: true,
                        excerpt: true,
                        quoteText: true,
                    }
                },
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

        if (fields.length === 0) {
            return JSON.parse(JSON.stringify(data));
        }

        const posts = data.map((post) => {
            const items = {};
            fields.map((field) => {
                    if (typeof post[field] !== 'undefined') {
                        items[field] = post[field]
                    }
                }
            )
            return items;
        })

        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.log(error.stack);
        return error;
    }
}

export const getPostsByCategory = async (cate_slug, limit = 8, page = 1) => {
    const where = {status: StatusType.PUBLIC, category: {cate_slug}};
    const [posts, total, category] = await Promise.all([
        db.post.findMany({
            where,
            take: limit,
            skip: (page - 1) * limit,
            include: {
                translations: {
                    select: {id: true, postId: true, languageCode: true, title: true, excerpt: true, quoteText: true}
                },
                author: {include: {translations: true}},
                category: {include: {translations: true}},
                tags: {include: {translations: true}},
            },
            orderBy: [{trending: 'desc'}, {updatedAt: 'desc'}],
        }),
        db.post.count({where}),
        db.category.findFirst({where: {cate_slug}, include: {translations: true}}),
    ]);
    return JSON.parse(JSON.stringify({posts, total, category}));
}

export const getPostBySlug = async (slug) => {
    const post = await db.post.findUnique({
        where: {
            slug: slug,
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
        },
    });
    return JSON.parse(JSON.stringify(post));
}