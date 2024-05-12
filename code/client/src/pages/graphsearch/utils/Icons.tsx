export const imgs = [
    process.env.PUBLIC_URL + '/img/icons/tag_unselected.png',
    process.env.PUBLIC_URL + '/img/icons/person_green_unselected.png',
    process.env.PUBLIC_URL + '/img/icons/organization_green_unselected.png',
    process.env.PUBLIC_URL + '/img/icons/location_green_unselected.png',
    process.env.PUBLIC_URL + '/img/icons/pencil_green_unselected.png', 
    process.env.PUBLIC_URL + '/img/icons/tag_selected.png',
    process.env.PUBLIC_URL + '/img/icons/person_selected.png',
    process.env.PUBLIC_URL + '/img/icons/organization_selected.png',
    process.env.PUBLIC_URL + '/img/icons/location_selected.png',
    process.env.PUBLIC_URL + '/img/icons/pencil_selected.png']
    .map(src => {
        const img = new Image();
        img.src = src;
        return img;
});