import moment from "moment/moment";

export const getValueByLanguage = (obj, language) => {
    if (typeof obj === 'undefined') return {};
    const element = obj.filter(translation => translation.languageCode === language);
    return element[0];
}

export const translatePosts = (posts, language) => {
    try {
        if (posts === undefined) return [];
        return posts.map(post => {
            return {
                id: post.id,
                slug: post.slug,
                featureImg: post.featureImg,
                post_views: post.post_views,
                title: getValueByLanguage(post.translations, language).title,
                excerpt: getValueByLanguage(post.translations, language).excerpt,
                date: post.date,
                cate_slug: post.category.cate_slug,
                cate: getValueByLanguage(post.category.translations, language).cate,
                cate_img: post.category.cate_img,
                author_slug: post.author.author_slug,
                author_name: post.author.author_name,
                author_img: post.author.author_img,
                author_social: post.author.author_social,
            };
        });
    } catch (error) {
        console.log(error);
    }
}

export const translateOnePost = (post, language) => {
    try {
        if (post === undefined) return {}
        return {
            slug: post.slug,
            postFormat: post.postFormat,
            featureImg: post.featureImg,
            title: getValueByLanguage(post.translations, language).title,
            excerpt: getValueByLanguage(post.translations, language).excerpt,
            date: post.createdAt.slice(0, 10),
            content: getValueByLanguage(post.translations, language).content,
            videoLink: post.videoLink,
            audioLink: post.audioLink,
            quoteText: getValueByLanguage(post.translations, language).quoteText,
            cate_slug: post.category.cate_slug,
            cate: getValueByLanguage(post.category.translations, language).cate,
            cate_bg: post.category.cate_bg,
            cate_img: post.category.cate_img,
            author_slug: post.author.author_slug,
            author_name: post.author.author_name,
            author_social: post.author.author_social,
            author_img: post.author.author_img,
            author_bio: post.author.author_bio,
            post_views: post.post_views,
            post_share: post.post_share,
        };
    } catch (error) {
        console.log(error);
    }
}

export const formatPosts = (posts, language) => {
    try {
        if (posts === undefined || posts.length === 0) return [];
        return posts.map(post => {
            return {
                id: post.id,
                slug: post.slug,
                postFormat: post.postFormat,
                featureImg: post.featureImg,
                date: post.date,
                createdAt: post.createdAt.slice(0, 10),
                updatedAt: post.updatedAt.slice(0, 10),
                status: post.status,
                trending: post.trending,
                videoLink: post.videoLink,
                audioLink: post.audioLink,
                cate_slug: post.category.cate_slug,
                cate: getValueByLanguage(post.category.translations, language).cate,
                cate_img: post.category.cate_img,
                cate_bg: post.category.cate_bg,
                author_slug: post.author.author_slug,
                author_name: post.author.author_name,
                author_img: post.author.author_img,
                author_social: post.author.author_social,
                author_desg: getValueByLanguage(post.author.translations, language).author_desg,
                author_bio: getValueByLanguage(post.author.translations, language).author_bio,
                tags: post.tags.map(tag => tag.tag_slug),
                title: getValueByLanguage(post.translations, language).title,
                excerpt: getValueByLanguage(post.translations, language).excerpt,
                content: getValueByLanguage(post.translations, language).content,
                quoteText: getValueByLanguage(post.translations, language).quoteText,
                titleEN: getValueByLanguage(post.translations, "en").title,
                excerptEN: getValueByLanguage(post.translations, "en").excerpt,
                contentEN: getValueByLanguage(post.translations, "en").content,
                quoteTextEN: getValueByLanguage(post.translations, "en").quoteText,
                titleVI: getValueByLanguage(post.translations, "vi").title,
                excerptVI: getValueByLanguage(post.translations, "vi").excerpt,
                contentVI: getValueByLanguage(post.translations, "vi").content,
                quoteTextVI: getValueByLanguage(post.translations, "vi").quoteText,
            };
        });
    } catch (error) {
        console.log(error);
    }
}

export const formatAuthors = (authors, language) => {
    try {
        if (authors === undefined) return [];
        return authors.map(author => {
            return {
                id: author.id,
                value: author.author_slug,
                label: author.author_name,
                author_slug: author.author_slug,
                author_name: author.author_name,
                author_img: author.author_img,
                author_social: author.author_social,
                author_desgEN: getValueByLanguage(author.translations, "en").author_desg,
                author_bioEN: getValueByLanguage(author.translations, "en").author_bio,
                author_desgVI: getValueByLanguage(author.translations, "vi").author_desg,
                author_bioVI: getValueByLanguage(author.translations, "vi").author_bio,
            }
        });
    } catch (error) {
        console.log(error);
    }

}

export const formatCategories = (categories, language) => {
    try {
        if (categories === undefined) return [];
        return categories.map(category => {
            return {
                id: category.id,
                value: category.cate_slug,
                label: getValueByLanguage(category.translations, language).cate,
                cate_slug: category.cate_slug,
                cate_bg: category.cate_bg,
                cate_img: category.cate_img,
                cateEN: getValueByLanguage(category.translations, "en").cate,
                descriptionEN: getValueByLanguage(category.translations, "en").description,
                cateVI: getValueByLanguage(category.translations, "vi").cate,
                descriptionVI: getValueByLanguage(category.translations, "vi").description,
            }
        });
    } catch (error) {
        console.log(error)
    }
}

export const formatTags = (tags, language) => {
    try {
        if (tags === undefined) return [];
        return tags.map(tag => {
            return {
                id: tag.id,
                value: tag.tag_slug,
                label: getValueByLanguage(tag.translations, language).tag,
                tag_slug: tag.tag_slug,
                tagEN: getValueByLanguage(tag.translations, "en").tag,
                tagVI: getValueByLanguage(tag.translations, "vi").tag,
            }
        });
    } catch (error) {
        console.log(error)
    }

}

export const formatProducts = (products, language) => {
    try {
        if (products === undefined) return [];
        return products.map(product => {
            return {
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                type: product.type,
                platform: product.platform,
                status: product.status,
                allowedVersion: product.allowedVersion,
                latestVersion: product.latestVersion,
                forceUpdateCode: product.forceUpdateCode,
                urlPost: product.urlPost,
                urlDownload: product.urlDownload,
                active: product.active,
                translations: product.translations,
                subscriptions: product.subscriptions,
                description: getValueByLanguage(product.translations, language).description,
                description_EN: getValueByLanguage(product.translations, "en").description,
                description_VI: getValueByLanguage(product.translations, "vi").description,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const formatPackages = (packages, language) => {
    try {
        if (packages === undefined) return [];
        return packages.map(packageItem => {
            return {
                id: packageItem.id,
                name: packageItem.name,
                image: packageItem.image,
                type: packageItem.type,
                platform: packageItem.platform,
                urlPost: packageItem.urlPost,
                urlDownload: packageItem.urlDownload,
                monthlyPrice: packageItem.monthlyPrice,
                originalMonthlyPrice: packageItem.originalMonthlyPrice,
                yearlyPrice: packageItem.yearlyPrice,
                originalYearlyPrice: packageItem.originalYearlyPrice,
                monthlyPriceByYearlyPrice: packageItem.monthlyPriceByYearlyPrice,
                status: packageItem.status,
                active: packageItem.active,
                subscriptions: packageItem.subscriptions,
                products: packageItem.products,
                description: getValueByLanguage(packageItem.translations, language).description,
                description_EN: getValueByLanguage(packageItem.translations, "en").description,
                description_VI: getValueByLanguage(packageItem.translations, "vi").description,
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const formatSubscribedUsers = (subscribedUsers, language) => {
    try {
        if (subscribedUsers === undefined) return [];
        return subscribedUsers.map(subscribedUser => {
            return {
                id: subscribedUser.id,
                userId: subscribedUser.userId,
                subscriptionType: subscribedUser.subscriptionType,
                startDate: moment(subscribedUser.startDate).format("DD-MM-YYYY"),
                endDate: moment(subscribedUser.endDate).format("DD-MM-YYYY"),
                registeredDevices: subscribedUser.registeredDevices,
                active: subscribedUser.active,
                name: subscribedUser.user.name,
                email: subscribedUser.user.email,
                phone: subscribedUser.user.phone,
            }
        });
    } catch (error) {
        console.log(error);
    }
}