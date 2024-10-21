import prisma from "@/lib/prisma";

export const getPosts = async ( fields = [] ) => {
    const data = await prisma.post.findMany({
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

    const posts = data.map(( post ) => {
        const items = {};
        fields.map(( field ) => {
                if (typeof post[field] !== 'undefined') {
                    items[field] = post[field]
                }
            }
        )
        return items;
    })

    return JSON.parse(JSON.stringify(posts));
}

export const getPublicPosts = async ( fields = [] ) => {
    const data = await prisma.post.findMany({
        where: {
            status: "public",
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

    const posts = data.map(( post ) => {
        const items = {};
        fields.map(( field ) => {
                if (typeof post[field] !== 'undefined') {
                    items[field] = post[field]
                }
            }
        )
        return items;
    })

    return JSON.parse(JSON.stringify(posts));
}

export const getPostBySlug = async ( slug ) => {
    const post = await prisma.post.findUnique({
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