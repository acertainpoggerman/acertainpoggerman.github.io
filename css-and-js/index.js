// Making Modulus [ .mod() ] Property
Number.prototype.mod = function(val) {
    return ((this % val) + val) % val;
}

// Color Name 'Database'
const colorNames = {
    "#000000": "black",
    "#ffffff": "white",
    "#7f7f7f": "gray",
    
    "#ff0000": "red",
    "#0000ff": "green",
    "#0000ff": "blue",
    
    "#ff00ff": "magenta",
    "#ffff00": "yellow",
    "#00ffff": "cyan",
}


//
if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify([]));
    console.log("Hi");
}



// Sidebar for Pages
const body = document.querySelector("body"),
    sidebar = body.querySelector("div.sidebar"),
    sidebarToggle = sidebar.querySelector("div.toggle");
    sidebarProfileText = sidebar.querySelector("a.profile")
        .querySelector("span.name");

sidebarToggle.addEventListener("click", toggleSidebar);

if (JSON.parse(localStorage.getItem("currentUser")) == null) {
    sidebarProfileText.innerText = "Login / Register";
} else {
    // TODO: Make Available for Actual Website
    sidebarProfileText.innerText = JSON.parse(localStorage.getItem("currentUser")).username;
}


function toggleSidebar() {
    sidebar.classList.toggle("opened");
}


// RGB and HEX Conversions

function rgbToHex(color) {
    
    const red = Math.floor(color[0]).toString(16).padStart(2, 0);
    const green = Math.floor(color[1]).toString(16).padStart(2, 0);
    const blue = Math.floor(color[2]).toString(16).padStart(2, 0);
    
    return `#${red}${green}${blue}`;
}

function hexToRGB(color) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);
    
    return [red, green, blue];
}


// RGB and HSL Conversions

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
    return [Math.floor(red + match), Math.floor(green + match), Math.floor(blue + match)];
}


function complementColorFromHSL(color) {
    const [hue, saturation, luminance] = color;
    return [(hue + 180).mod(360), saturation, luminance];
}

function analogousColorsFromHSL(color, angle) {
    const [hue, saturation, luminance] = color;
    
    return [
        [(hue - 15).mod(360), saturation, luminance],
        [hue, saturation, luminance],
        [(hue + 15).mod(360), saturation, luminance]
    ];
}

function colorTriadFromHSL(color) {
    const [hue, saturation, luminance] = color;
    
    return [
        [hue, saturation, luminance],
        [(hue + 120).mod(360), saturation, luminance],
        [(hue + 240).mod(360), saturation, luminance]
    ];
}

function colorTetradFromHSL(color) {
    const [hue, saturation, luminance] = color;
    
    return [
        [hue, saturation, luminance],
        [(hue + 90).mod(360), saturation, luminance],
        [(hue + 180).mod(360), saturation, luminance],
        [(hue + 270).mod(360), saturation, luminance]
    ];
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


if (body.id === "item") {
    
    const mainColor = sessionStorage.getItem("currentColor");
    const mainColorAsHSL = rgbToHSL(hexToRGB(mainColor));
    const mainPage = body.querySelector("div.main-page");
    
    
    const colorInfoBlock = mainPage.querySelector("div.color-info");
    colorInfoBlock.querySelector("div.hex").lastChild.data = mainColor;
    
    const [redVal, greenVal, blueVal] = hexToRGB(mainColor);
    colorInfoBlock.querySelector("div.rgb").lastChild.data = `( ${redVal} , ${greenVal} , ${blueVal} )`;
    
    const [hueVal, satVal, lumVal] = rgbToHSL(hexToRGB(mainColor).map((color) => color / 255));
    colorInfoBlock.querySelector("div.hsl").lastChild.data = `( ${hueVal.toFixed(1)}° , ${satVal.toFixed(1)} , ${lumVal.toFixed(1)} )`;
    
    
    const mainColorBlock = mainPage
        .querySelector("div.main-color")
        .querySelector("div.color-block");
        
    mainColorBlock.style.backgroundColor = mainColor;
    
    
    const complementColorBlock = mainPage
        .querySelector("div.related-colors")
        .querySelector("div.color-complement")
        .querySelector("div.color-block");
        
    complementColorBlock.style.backgroundColor = rgbToHex(hslToRGB(complementColorFromHSL(mainColorAsHSL)));
    console.log(rgbToHex(hslToRGB(complementColorFromHSL(mainColorAsHSL))));
    
    
    
    const analogousBlock = mainPage.querySelector("div.color-analogous");
        
    const analogousColorBlocks = [
        analogousBlock.querySelector("div.color-block.left"),
        analogousBlock.querySelector("div.color-block.main"),
        analogousBlock.querySelector("div.color-block.right"),
    ];
    const analogousColors = analogousColorsFromHSL(mainColorAsHSL, 5).map((color) => {
        return rgbToHex(hslToRGB(color));
    });
    analogousColorBlocks.forEach((colorBlock, idx) => {
        colorBlock.style.backgroundColor = analogousColors[idx];
    });
    
    
    const triadBlock = mainPage.querySelector("div.color-triad");
    
    const colorTriadBlocks = [
        triadBlock.querySelector("div.color-block.main"),
        triadBlock.querySelector("div.color-block.angle120"),
        triadBlock.querySelector("div.color-block.angle240")
    ];
    
    const colorTriad = colorTriadFromHSL(mainColorAsHSL).map((color) => {
        return rgbToHex(hslToRGB(color));
    });
    colorTriadBlocks.forEach((colorBlock, idx) => {
        colorBlock.style.backgroundColor = colorTriad[idx];
    });
    
    
    const tetradBlock = mainPage.querySelector("div.color-tetrad");
    
    const colorTetradBlocks = [
        tetradBlock.querySelector("div.color-block.main"),
        tetradBlock.querySelector("div.color-block.angle90"),
        tetradBlock.querySelector("div.color-block.angle180"),
        tetradBlock.querySelector("div.color-block.angle270")
    ];
    
    const colorTetrad = colorTetradFromHSL(mainColorAsHSL).map((color) => {
        return rgbToHex(hslToRGB(color));
    });
    colorTetradBlocks.forEach((colorBlock, idx) => {
        colorBlock.style.backgroundColor = colorTetrad[idx];
    });
    
    
    
    const copyButton = mainColorBlock.querySelector("div.copy-wrapper");
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(mainColor);
        window.alert(`Copied Color: ${mainColor}`);
    });
    
    const saveButton = mainColorBlock.querySelector("div.save-wrapper");
    saveButton.addEventListener("click", () => {
        console.log("Hi");
        
        if (JSON.parse(localStorage.getItem("currentUser")) != null) {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            
            if (!currentUser.savedColors.includes(mainColor)) {
                currentUser.savedColors.push(mainColor);
            }
            window.alert(`Saved Color: ${mainColor}`)
        } else {
            window.location.assign("login-register.html#login");
        }
    })
}



if (body.id === "log-reg") {
    
}

// TODO: Change for Actual Website (How to know: localStorage)

if (body.id === "profile") {
    const mainPage = body.querySelector("div.main-page");
    const title = document.querySelector("title");
    
    const profileUsername = mainPage.querySelector("span.name"),
    profileColorCount = mainPage.querySelector("span.color-count"),
    savedColorsTable = mainPage.querySelector("table.saved-colors");
    
    const savedColors = JSON.parse(localStorage.getItem("currentUser")).savedColors;
    const username = JSON.parse(localStorage.getItem("currentUser")).username;
    
    title.innerText = `HÜ - Profile (${username})`;
    profileUsername.innerHTML = `<h2>${username}</h2>`;
    profileColorCount.innerText = savedColors.length === 1
     ? `${savedColors.length} Saved Color`
     : `${savedColors.length} Saved Colors`;
    
    savedColorsTable.innerHTML = `
        <tr>
            <th>Color</th>
            <th>Hex</th>
        </tr>
    `;
    for (const color of savedColors) {
        savedColorsTable.innerHTML += `
        <tr>
            <td>
                <div class="color-block" style="background-color: ${color}"></div>
            </td>
            <td>${color}</td>
        </tr>
        `;
    }
}




function randomHexColorWithInfluence(colorAsHex, deviationAsInt, colorVariations) {
    const deviation = deviationAsInt / 100;
    const color = hexToRGB(colorAsHex);
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
        <div class="color-block" style="background-color: ${color}; color: white">
            <a href="javascript:colorInDepth('${color}')" >
                <span class="text">${color}</span>
            </a>
            <div class="copy-wrapper" title="Copy Color">
                <i class='unhov bx bx-copy'></i>
                <i class='hov bx bxs-copy'></i>
            </div>
        </div>
        `;
        
    }
    
    const colorBlocks = resultSection.querySelectorAll("div.color-block");
    
    for (const colorBlock of colorBlocks) {
        const color = colorBlock.querySelector("span.text").innerText,
            copyButton = colorBlock.querySelector("div.copy-wrapper");
        
        copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(color);
            window.alert(`Copied Color: ${color}`)
        })
    }
}


function colorInDepth(color) {
    window.sessionStorage.setItem("currentColor", color);
    window.location.assign("item.html");
}

function sayHi() {
    console.log("Hi");
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
    const displayColor = document.querySelector("div.color-display");
    displayColor.style.backgroundColor = `#${color}`;
}



function registerUser() {
    const username = document.registerForm.regUsername.value,
        password = document.registerForm.regPass.value,
        confirmPassword = document.registerForm.regConfirmPass.value;  
    
    if (password === confirmPassword) {
        let users = JSON.parse(localStorage.getItem("users"));
        
        const usernames = users.map((user) => user.username);
        if (usernames.includes(username)) {
            window.alert(`Username: [${username}] already in use`);
            return;
        }
        
        users.push(
            {
                username: username,
                password: password,
                savedColors: [],
            }
        );
        
        localStorage.setItem("users", JSON.stringify(users));
        window.alert(`Successfully Created Account: ${username}`);
        
        document.registerForm.regUsername.value = "";
        document.registerForm.regPass.value = "";
        document.registerForm.regConfirmPass.value = "";
        
    } else {
        window.alert("Passwords do not match.");
    }
}


function loginUser() {
    const username = document.loginForm.logUsername.value,
        password = document.loginForm.logPass.value;
    
    let users = JSON.parse(localStorage.getItem("users"));
    
    for (const user of users) {
        if (username === user.username) {
            if (password === user.password) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                window.alert(`Successfully logged in as: [${user.username}]`);
                return;
            } else {
                window.alert(`Wrong Password for Account: [${user.username}]`);
                return;
            }
        }
    }
    
    console.log(JSON.parse(localStorage.getItem("currentUser")));
}




function navigateProfile() {
    // TODO: Change for Final Website
    
    if (JSON.parse(localStorage.getItem("currentUser")) == null) {
        window.location.assign("login-register.html#login");
    } else {
        window.location.assign("profile.html");
    }
    // window.location.assign("profile.html");
}

function logoutUser() {
    localStorage.setItem("currentUser", null);
    window.location.assign("login-register.html#login");
}