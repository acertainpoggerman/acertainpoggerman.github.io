// Making Modulus [ .mod() ] Property
Number.prototype.mod = function(val) {
    return ((this % val) + val) % val;
}


// Sidebar for Pages
const body = document.querySelector("body"),
    sidebar = body.querySelector("div.sidebar"),
    sidebarToggle = sidebar.querySelector("div.toggle");

sidebarToggle.addEventListener("click", toggleSidebar);

function toggleSidebar() {
    sidebar.classList.toggle("opened");
}





function hexaToRGB(color) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);
    
    return [red, green, blue];
}

function rgbToHSL(color) {
    
    const red = color[0], green = color[1], blue = color[2];
    
    const maxColor = Math.max(...color);
    const minColor = Math.min(...color);
    const chroma = maxColor - minColor;
    
    const hueComplement = chroma === 0
     ? chroma
     : maxColor === red ? ((green - blue) / chroma).mod(6)
     : maxColor === green ? ((blue - red) / chroma) + 2
     : ((red - green) / chroma) + 4;
     
    const hue = 60 * hueComplement;
    const luminance = 0.5 * (maxColor + minColor);
    
    const saturation = luminance === 1 || luminance === 0
     ? 0 : chroma / (1 - Math.abs(2 * luminance - 1));
    
    return [hue, saturation, luminance];
}

function hslToRGB(color) {
    const hue = color[0], saturation = color[1], luminance = color[2];
    
    const chroma = saturation * (1 - Math.abs(2 * luminance - 1));
    hueComplement = hue / 60;
    xValue = chroma * (1 - Math.abs(hueComplement.mod(2) - 1));
    
    let [red, green, blue] = [0, 0, 0];
    if      (0 <= hueComplement && hueComplement < 1) { [red, green, blue] = [chroma, xValue, 0]; }
    else if (1 <= hueComplement && hueComplement < 2) { [red, green, blue] = [xValue, chroma, 0]; }
    else if (2 <= hueComplement && hueComplement < 3) { [red, green, blue] = [0, chroma, xValue]; }
    else if (3 <= hueComplement && hueComplement < 4) { [red, green, blue] = [0, xValue, chroma]; }
    else if (4 <= hueComplement && hueComplement < 5) { [red, green, blue] = [xValue, 0, chroma]; }
    else if (5 <= hueComplement && hueComplement < 6) { [red, green, blue] = [chroma, 0, xValue]; }
    
    match = luminance - chroma / 2;
    return [red + match, green + match, blue + match];
}





if (body.id === "explore") {
    const addButton = body
    .querySelector("div.main-page")
    .querySelector("div.add");
    
    const removeButton = body
    .querySelector("div.main-page")
    .querySelector("div.remove");
    
    const resetButton = body
    .querySelector("div.main-page")
    .querySelector("div.reset");
    
    addButton.addEventListener("click", generateColorBlocks);
    removeButton.addEventListener("click", removeColorBlocks);
    resetButton.addEventListener("click", clearColorBlocks);
    
    const deviationSlider = document.sliders.deviation,
        deviationText = document.querySelector("span.deviate-val");
                        
    deviationSlider.addEventListener("input", () => deviationText.innerText = `${deviation.value}%`);
}




function randomHexColorWithInfluence(colorAsHex, deviationAsInt, colorVariations) {
    const deviation = deviationAsInt / 100;
    const color = hexaToRGB(colorAsHex);
    colorVariations = colorVariations.map(value => value / 100)
    
    const ranges = [
        [ Math.floor(color[0] * (1 - deviation * colorVariations[0])), Math.floor(color[0] + ((255 - color[0]) * deviation * colorVariations[0])) ],
        [ Math.floor(color[1] * (1 - deviation * colorVariations[1])), Math.floor(color[1] + ((255 - color[1]) * deviation * colorVariations[1])) ],
        [ Math.floor(color[2] * (1 - deviation * colorVariations[2])), Math.floor(color[2] + ((255 - color[2]) * deviation * colorVariations[2])) ]
    ];
    let colorHex = '#';
    
    for (let i = 0; i < ranges.length; i++) {
        let [lowerLimit, upperLimit] = ranges[i];
        colorHex += (lowerLimit + Math.floor( Math.random() * (upperLimit - lowerLimit) )).toString(16).padStart(2, 0);
    }
    
    return colorHex;
}





function generateColorBlocks() {
    const count = 4;
    let colors = new Array();
    const exploreBody = document.querySelector("body#explore"),
    resultSection = exploreBody.querySelector("div.results");
        
    const influenceColor = '#' + document.colorselector.colorpicker.value;
    const deviation = document.sliders.deviation.value;
    
    const colorVariations = [
        document.sliders.redVariation.value,
        document.sliders.greenVariation.value,
        document.sliders.blueVariation.value
    ];
    
    for (let i = 0; i < count; i++) {
        colors.push(randomHexColorWithInfluence(influenceColor, deviation, colorVariations));
    }
    
    for (const color of colors) {
        resultSection.innerHTML += `
        <a href="item.html" style="background-color: ${color}; color: white"><span class="text">${color}</span></a>
        `;
    } 
}

function removeColorBlocks() {
    const count = 4;
    const exploreBody = document.querySelector("body#explore"),
    resultSection = exploreBody.querySelector("div.results");
    
    if (resultSection.children.length >= count) {
        for (let i = 0; i < count; i++) { resultSection.lastElementChild.remove(); }
    }
}

function clearColorBlocks() {
    const exploreBody = document.querySelector("body#explore"),
        resultSection = exploreBody.querySelector("div.results");
        
    resultSection.innerHTML = "";
}




function changeColorOfBlock() {
    const color = document.colorselector.colorpicker.value;
    const displayColor = document.querySelector(" div.color-display");
    displayColor.style.backgroundColor = `#${color}`;
}

console.log(rgbToHSL([1, 0, 0]));
console.log(hslToRGB([0, 1, 0.5]));