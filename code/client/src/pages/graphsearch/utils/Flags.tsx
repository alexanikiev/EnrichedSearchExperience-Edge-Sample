export const imgs = [ process.env.PUBLIC_URL + '/img/flags/lr_unselected.png', 
process.env.PUBLIC_URL + '/img/flags/sl_unselected.png',
process.env.PUBLIC_URL + '/img/flags/gn_unselected.png',
process.env.PUBLIC_URL + '/img/flags/ci_unselected.png', 
process.env.PUBLIC_URL + '/img/flags/ci_unselected.png']
    .map(src => {
        const img = new Image();
        img.src = src;
        return img;
});