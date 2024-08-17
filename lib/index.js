export function generateSlug (title) {
    return title.split(" ").join("-").toLowerCase()
}

export function getTodayDate () {
    let dateObj = new Date();
    let month = String(dateObj.getMonth() + 1).padStart(2, '0');
    let year = dateObj.getFullYear();
    let day = String(dateObj.getDate()).padStart(2, '0');
    let output = day + '-' + month + '-' + year;

    return output
}
