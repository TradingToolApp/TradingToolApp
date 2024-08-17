const MdxPostGenerator = (
    {
        title,
        excerpt,
        postFormat,
        featureImg,
        date,
        cate,
        cate_img,
        cate_bg,
        tags,
        content,
        author_name,
        author_desg,
        author_img,
        author_bio,
        author_social,
        post_view,
        post_share,
    }
) => {
    let authorSocial = "";
    author_social.map(item => {
        authorSocial +=
            `
        -
            icon: '${item.icon}' 
            url: '${item.url}'`
    });
    let postTags = "";
    tags.map(item => {
        postTags +=
            `
            - ${item}`
    });
    let cateBackground = "";
    switch (cate) {
        case "News":
            cateBackground = "bg-color-red-one";
            break;
        case "Tools":
            cateBackground = "bg-color-green-one";
            break;
        case "Study":
            cateBackground = "bg-color-blue-one";
            break;
        case "Discussion":
            cateBackground = "bg-color-purple-one";
            break;
    }
    const data =
`---
postFormat: '${postFormat}'
title: '${title}'
excerpt: '${excerpt}'
featureImg: '${featureImg}'
date: '${date}'
cate: '${cate}'
cate_bg: '${cateBackground}'
cate_img: '${cate_img}'
post_views: '${post_view}'
post_share: '${post_share}'
author_name: '${author_name}'
author_desg: '${author_desg}'
author_img: '${author_img}'
author_bio: '${author_bio}'
author_social: ${authorSocial}
tags: ${postTags}

---
${content}


`
    return data;
}

export default MdxPostGenerator;