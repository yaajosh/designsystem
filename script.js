document.getElementById('generate-button').addEventListener('click', function() {
    const baseColor = document.getElementById('base-color').value;
    const primaryFont = document.getElementById('primary-font').value;
    const secondaryFont = document.getElementById('secondary-font').value;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Generate Color Palette
    const colors = generateColorPalette(baseColor);
    const colorSection = document.createElement('div');
    colorSection.innerHTML = '<h2>Color Palette</h2>';
    Object.keys(colors).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<h3>${category.charAt(0).toUpperCase() + category.slice(1)} Colors</h3>`;
        if (Array.isArray(colors[category])) {
            colors[category].forEach(color => {
                const colorBox = createColorBox(color);
                categoryDiv.appendChild(colorBox);
            });
        } else {
            Object.keys(colors[category]).forEach(subCategory => {
                const colorBox = createColorBox(colors[category][subCategory]);
                categoryDiv.appendChild(colorBox);
            });
        }
        colorSection.appendChild(categoryDiv);
    });
    resultsDiv.appendChild(colorSection);

    // Display Color JSON
    const colorJsonSection = document.createElement('div');
    colorJsonSection.innerHTML = '<h2>Color Variables</h2>';
    const colorJson = {
        "colors": colors
    };
    colorJsonSection.innerHTML += `<code class="json-display">${JSON.stringify(colorJson, null, 2)}<button class="copy-button" onclick="copyToClipboard(this)">Copy</button></code>`;
    resultsDiv.appendChild(colorJsonSection);

    // Generate Typography
    const typographySection = document.createElement('div');
    typographySection.className = 'typography-sample';
    typographySection.innerHTML = `<h2>Typography</h2>
        <div style="font-family: ${primaryFont}; font-size: 12px;">Primary Font XS: ${primaryFont}</div>
        <div style="font-family: ${primaryFont}; font-size: 14px;">Primary Font S: ${primaryFont}</div>
        <div style="font-family: ${primaryFont}; font-size: 16px;">Primary Font M: ${primaryFont}</div>
        <div style="font-family: ${primaryFont}; font-size: 18px;">Primary Font L: ${primaryFont}</div>
        <div style="font-family: ${primaryFont}; font-size: 24px;">Primary Font XL: ${primaryFont}</div>
        <div style="font-family: ${primaryFont}; font-size: 32px;">Primary Font XXL: ${primaryFont}</div>
        <div style="font-family: ${primaryFont}; font-size: 48px;">Primary Font XXXL: ${primaryFont}</div>
        <div style="font-family: ${secondaryFont}; font-size: 16px;">Secondary Font: ${secondaryFont}</div>`;
    resultsDiv.appendChild(typographySection);

    // Display Typography JSON
    const typographyJsonSection = document.createElement('div');
    typographyJsonSection.innerHTML = '<h2>Typography Variables</h2>';
    const typographyJson = {
        "typography": {
            "fontFamily": {
                "primary": primaryFont,
                "secondary": secondaryFont
            },
            "fontSize": {
                "xs": "12px",
                "s": "14px",
                "m": "16px",
                "l": "18px",
                "xl": "24px",
                "xxl": "32px",
                "xxxl": "48px"
            },
            "fontWeight": {
                "light": "300",
                "regular": "400",
                "medium": "500",
                "bold": "700"
            },
            "lineHeight": {
                "tight": "1.2",
                "normal": "1.5",
                "loose": "1.8"
            }
        }
    };
    typographyJsonSection.innerHTML += `<code class="json-display">${JSON.stringify(typographyJson, null, 2)}<button class="copy-button" onclick="copyToClipboard(this)">Copy</button></code>`;
    resultsDiv.appendChild(typographyJsonSection);

    // Generate Components
    const componentsSection = document.createElement('div');
    componentsSection.className = 'component';
    componentsSection.innerHTML = `
        <h2>Components</h2>
        ${generateComponentHTML('Primary Button', `<button style="background-color: ${baseColor}; color: #fff; padding: 8px 16px; border: none; border-radius: 4px;">Primary Button</button>`, {
            "button": {
                "padding": "8px 16px",
                "borderRadius": "4px",
                "backgroundColor": baseColor,
                "color": "#fff"
            }
        })}
        ${generateComponentHTML('Text Input', `<input type="text" style="padding: 8px; border: 1px solid ${baseColor}; border-radius: 4px;">`, {
            "input": {
                "padding": "8px",
                "borderRadius": "4px",
                "borderColor": baseColor
            }
        })}
        ${generateComponentHTML('Header 1', `<h1 style="font-family: ${primaryFont}; color: ${baseColor};">Header 1</h1>`, {
            "header": {
                "fontFamily": primaryFont,
                "color": baseColor
            }
        })}
        ${generateComponentHTML('Card', `<div style="border: 1px solid ${baseColor}; border-radius: 4px; padding: 16px;">
                <h2 style="font-family: ${primaryFont};">Card Title</h2>
                <p style="font-family: ${secondaryFont};">This is a card component with some text content. It can be used to display grouped information.</p>
            </div>`, {
            "card": {
                "border": `1px solid ${baseColor}`,
                "borderRadius": "4px",
                "padding": "16px",
                "titleFontFamily": primaryFont,
                "textFontFamily": secondaryFont
            }
        })}
        ${generateComponentHTML('Error Alert', `<div style="padding: 16px; background-color: #ffcccc; border: 1px solid ${baseColor}; border-radius: 4px;">
                <p style="font-family: ${secondaryFont};">This is an error alert message.</p>
            </div>`, {
            "alert": {
                "padding": "16px",
                "border": `1px solid ${baseColor}`,
                "borderRadius": "4px",
                "backgroundColor": "#ffcccc",
                "textFontFamily": secondaryFont
            }
        })}
        ${generateComponentHTML('Styled Link', `<a href="#" style="color: ${baseColor}; font-family: ${primaryFont};">Styled Link</a>`, {
            "link": {
                "color": baseColor,
                "fontFamily": primaryFont
            }
        })}
        ${generateComponentHTML('Badge', `<span style="background-color: ${baseColor}; color: #fff; padding: 4px 8px; border-radius: 4px;">Badge</span>`, {
            "badge": {
                "backgroundColor": baseColor,
                "color": "#fff",
                "padding": "4px 8px",
                "borderRadius": "4px"
            }
        })}
        ${generateComponentHTML('Dropdown', `<select style="padding: 8px; border: 1px solid ${baseColor}; border-radius: 4px;">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
            </select>`, {
            "dropdown": {
                "padding": "8px",
                "borderRadius": "4px",
                "borderColor": baseColor
            }
        })}
        ${generateComponentHTML('Checkbox', `<label style="font-family: ${secondaryFont};"><input type="checkbox" style="accent-color: ${baseColor};"> Checkbox</label>`, {
            "checkbox": {
                "fontFamily": secondaryFont,
                "accentColor": baseColor
            }
        })}
        ${generateComponentHTML('Radio Button', `<label style="font-family: ${secondaryFont};"><input type="radio" name="radio" style="accent-color: ${baseColor};"> Radio Button</label>`, {
            "radioButton": {
                "fontFamily": secondaryFont,
                "accentColor": baseColor
            }
        })}
        ${generateComponentHTML('Text Area', `<textarea style="padding: 8px; border: 1px solid ${baseColor}; border-radius: 4px;"></textarea>`, {
            "textArea": {
                "padding": "8px",
                "borderRadius": "4px",
                "borderColor": baseColor
            }
        })}
        ${generateComponentHTML('Modal', `<button onclick="showModal()" style="background-color: ${baseColor}; color: #fff; padding: 8px 16px; border: none; border-radius: 4px;">Open Modal</button>
            <div id="modal" style="display:none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 16px; background-color: #fff; border: 1px solid ${baseColor}; border-radius: 4px;">
                <h2 style="font-family: ${primaryFont};">Modal Title</h2>
                <p style="font-family: ${secondaryFont};">This is a modal content.</p>
                <button onclick="closeModal()" style="background-color: ${baseColor}; color: #fff; padding: 8px 16px; border: none; border-radius: 4px;">Close</button>
            </div>`, {
            "modal": {
                "button": {
                    "backgroundColor": baseColor,
                    "color": "#fff",
                    "padding": "8px 16px",
                    "border": "none",
                    "borderRadius": "4px"
                },
                "modalContainer": {
                    "display": "none",
                    "position": "fixed",
                    "top": "50%",
                    "left": "50%",
                    "transform": "translate(-50%, -50%)",
                    "padding": "16px",
                    "backgroundColor": "#fff",
                    "border": `1px solid ${baseColor}`,
                    "borderRadius": "4px"
                }
            }
        })}
    `;
    resultsDiv.appendChild(componentsSection);
});

function generateComponentHTML(title, htmlSnippet, jsonObject) {
    return `
        <div class="component-preview">
            <h3>${title}</h3>
            ${htmlSnippet}
            <div class="tabs">
                <button class="tab-button active" onclick="openTab(event, 'html', this)">HTML</button>
                <button class="tab-button" onclick="openTab(event, 'css', this)">CSS</button>
            </div>
            <div class="tab-content html-tab" style="display: block;">
                <code>${htmlSnippet.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
                <button class="copy-button" onclick="copyToClipboard(this)">Copy</button>
            </div>
            <div class="tab-content css-tab" style="display: none;">
                <code>${generateCSSFromJSON(jsonObject)}</code>
                <button class="copy-button" onclick="copyToClipboard(this)">Copy</button>
            </div>
            <code class="json-display">${JSON.stringify(jsonObject, null, 2)}</code>
            <button class="copy-button" onclick="copyToClipboard(this)">Copy</button>
        </div>
    `;
}

function openTab(evt, tabName, button) {
    const parent = button.closest('.component-preview');
    const tabContents = parent.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });

    const tabButtons = parent.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    parent.querySelector(`.${tabName}-tab`).style.display = 'block';
    button.classList.add('active');
}

function generateCSSFromJSON(json) {
    let css = '';
    Object.keys(json).forEach(component => {
        css += `${component} {`;
        Object.keys(json[component]).forEach(property => {
            css += `${property}: ${json[component][property]}; `;
        });
        css += '}\n';
    });
    return css;
}

function generateColorPalette(baseColor) {
    const intensity = getColorIntensity(baseColor);

    return {
        "primary": [baseColor],
        "secondary": [
            shadeColor(baseColor, 20),
            shadeColor(baseColor, -20)
        ],
        "accent": [
            generateComplementaryColor(baseColor),
            generateTriadicColor(baseColor)
        ],
        "neutral": [
            "#FFFFFF",
            "#F5F5F5",
            "#E0E0E0",
            "#9E9E9E",
            "#212121"
        ],
        "additionalShades": [
            lightenColor(baseColor, 20),
            darkenColor(baseColor, 20)
        ],
        "system": {
            "warning": adjustColorIntensity("#FFA500", intensity),
            "error": adjustColorIntensity("#FF0000", intensity),
            "success": adjustColorIntensity("#00FF00", intensity)
        }
    };
}

function getColorIntensity(color) {
    const R = parseInt(color.substring(1, 3), 16);
    const G = parseInt(color.substring(3, 5), 16);
    const B = parseInt(color.substring(5, 7), 16);

    return (R + G + B) / 3;
}

function adjustColorIntensity(color, targetIntensity) {
    const R = parseInt(color.substring(1, 3), 16);
    const G = parseInt(color.substring(3, 5), 16);
    const B = parseInt(color.substring(5, 7), 16);

    const currentIntensity = (R + G + B) / 3;
    const adjustmentFactor = targetIntensity / currentIntensity;

    const newR = Math.min(255, Math.max(0, Math.round(R * adjustmentFactor)));
    const newG = Math.min(255, Math.max(0, Math.round(G * adjustmentFactor)));
    const newB = Math.min(255, Math.max(0, Math.round(B * adjustmentFactor)));

    const RR = ((newR.toString(16).length === 1) ? "0" + newR.toString(16) : newR.toString(16));
    const GG = ((newG.toString(16).length === 1) ? "0" + newG.toString(16) : newG.toString(16));
    const BB = ((newB.toString(16).length === 1) ? "0" + newB.toString(16) : newB.toString(16));

    return "#" + RR + GG + BB;
}

function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

function lightenColor(color, percent) {
    return shadeColor(color, -percent);
}

function darkenColor(color, percent) {
    return shadeColor(color, percent);
}

function generateComplementaryColor(color) {
    let R = 255 - parseInt(color.substring(1, 3), 16);
    let G = 255 - parseInt(color.substring(3, 5), 16);
    let B = 255 - parseInt(color.substring(5, 7), 16);

    const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

function generateTriadicColor(color) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    // Rotate the hue by 120 degrees for triadic color
    [R, G, B] = [G, B, R];

    const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

function createColorBox(color) {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;
    colorBox.title = color;

    const colorChip = document.createElement('div');
    colorChip.className = 'color-chip';
    colorChip.textContent = color;
    colorChip.addEventListener('click', () => {
        copyTextToClipboard(color);
    });

    colorBox.appendChild(colorChip);
    return colorBox;
}

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied: ' + text);
    });
}

function copyToClipboard(button) {
    const codeElement = button.previousSibling;
    const text = codeElement.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}

function showModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
