const getLuminance = (colorStr) => {
    const channels = colorStr.match(/\d+(\.\d+)?/g);
    console.log(colorStr, channels);
    if (!channels || channels.length < 3) return 255;
    const r = Number(channels[0]);
    const g = Number(channels[1]);
    const b = Number(channels[2]);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

console.log("Black background:", getLuminance("rgb(0, 0, 0)"));
console.log("White background:", getLuminance("rgb(255, 255, 255)"));
console.log("Footer (#050505):", getLuminance("rgb(5, 5, 5)"));
console.log("Intelligence (#EEEEEE):", getLuminance("rgb(238, 238, 238)"));
