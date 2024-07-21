import React from "react";
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export function cateListGenerator(cateData) {
    const categories = cateData.map(data => {
        const obj = {
            name: data.cate,
            thumb: data.cate_img
        }
        return obj;
    });

    const category = categories.reduce((prev, curr) => {
        prev[curr.name] = (prev[curr.name] || 0) + 1
        return prev;
    }, {})

    var cateList = Object.keys(category).map(cateTitle => {
        const imgGet = categories.filter(post => post.name === cateTitle);

        return {
            name: cateTitle,
            // slug: slugify(cateTitle),
            // count: category[cateTitle],
            // cateImg: imgGet[0].thumb
        };
    });
    return cateList;
}

export function getCateList(cateData) {
    const categories = cateData.map(data => {
        const obj = {
            name: data.cate,
            thumb: data.cate_img
        }
        return obj;
    });
    const category = categories.reduce((prev, curr) => {
        prev[curr.name] = (prev[curr.name] || 0) + 1
        return prev;
    }, {})

    var cateList = Object.keys(category).map(cateTitle => {
        return {
            label: cateTitle,
            value: cateTitle,
        };
    });
    return cateList;
}