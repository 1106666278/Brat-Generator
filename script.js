document.addEventListener('DOMContentLoaded', () => {
    // 从 window 对象获取在 index.html 中定义的 translations
    const translations = window.translations;

    const inputText = document.getElementById('inputText');
    const generateButton = document.getElementById('generateButton');
    const bratCanvasElement = document.getElementById('bratCanvasElement');
    const ctx = bratCanvasElement.getContext('2d');

    const greenModeButton = document.getElementById('greenMode');
    const whiteModeButton = document.getElementById('whiteMode');
    const scribbleModeButton = document.getElementById('scribbleMode');

    const pageTitleElement = document.getElementById('pageTitle');
    const pageDescriptionElement = document.getElementById('pageDescription');

    const langButtonsHeader = {
        id: document.getElementById('lang-id'),
        en: document.getElementById('lang-en'),
        zh: document.getElementById('lang-zh')
    };
    const langButtonsFooter = {
        id: document.getElementById('footer-lang-id'),
        en: document.getElementById('footer-lang-en'),
        zh: document.getElementById('footer-lang-zh')
    };

    let currentStyleMode = 'green';
    let currentBgColor = 'green';
    let currentLang = 'id';

    // 原来的 translations 对象定义已从此文件中移除

    function updateTexts(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        const langPack = translations[lang]; // 现在使用从 window.translations 获取的 translations

        if (langPack.metaTitle) pageTitleElement.textContent = langPack.metaTitle;
        if (langPack.metaDescription) pageDescriptionElement.content = langPack.metaDescription;

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (langPack[key]) {
                if (el.tagName === 'INPUT' && el.type === 'text') {
                    if (el.placeholder && key.toLowerCase().includes('placeholder')) {
                        el.placeholder = langPack[key];
                    } else if (el.dataset.translateKey === key) {
                        el.textContent = langPack[key];
                    }
                } else if (el.tagName === 'IMG' && el.alt && key.toLowerCase().includes('alt')) {
                    el.alt = langPack[key];
                }
                else {
                    el.textContent = langPack[key];
                }
            }
        });

        Object.values(langButtonsHeader).forEach(btn => btn.classList.remove('active'));
        Object.values(langButtonsFooter).forEach(btn => btn.classList.remove('active'));
        if (langButtonsHeader[lang]) langButtonsHeader[lang].classList.add('active');
        if (langButtonsFooter[lang]) langButtonsFooter[lang].classList.add('active');

        drawBratCanvas();
    }

    function setMode(style, bgColor) {
        currentStyleMode = style;
        currentBgColor = bgColor;

        greenModeButton.classList.remove('active');
        whiteModeButton.classList.remove('active');
        scribbleModeButton.classList.remove('active');

        if (style === 'green') greenModeButton.classList.add('active');
        else if (style === 'white') whiteModeButton.classList.add('active');
        else if (style === 'scribble') scribbleModeButton.classList.add('active');

        drawBratCanvas();
    }

    function drawBratCanvas() {
        const text = inputText.value.trim() || translations[currentLang].defaultCanvasText; // 使用 translations
        const canvasWidth = bratCanvasElement.width;
        const canvasHeight = bratCanvasElement.height;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const bratGreenColor = getComputedStyle(document.documentElement).getPropertyValue('--brat-green').trim();
        ctx.fillStyle = (currentBgColor === 'green') ? bratGreenColor : '#FFFFFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        if (currentStyleMode === 'scribble') {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = Math.max(1, Math.min(3, canvasWidth / 200));
            const numLines = 20;
            for (let i = 0; i < numLines; i++) {
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
                ctx.bezierCurveTo(
                    Math.random() * canvasWidth, Math.random() * canvasHeight,
                    Math.random() * canvasWidth, Math.random() * canvasHeight,
                    Math.random() * canvasWidth, Math.random() * canvasHeight
                );
                ctx.stroke();
            }
        }

        ctx.fillStyle = '#000000';
        let fontSize = Math.min(canvasWidth / (Math.max(5, text.length * 0.6)), canvasHeight * 0.2);
        fontSize = Math.max(20, Math.min(fontSize, 100));

        ctx.font = `700 ${fontSize}px ${getComputedStyle(document.body).fontFamily.split(',')[0].trim()}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.filter = 'blur(1.5px)';
        const maxTextWidth = canvasWidth * 0.85;
        const words = text.split(' ');
        let line = '';
        let lines = [];
        for(let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxTextWidth && n > 0) {
                lines.push(line.trim());
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line.trim());

        const lineHeight = fontSize * 1.2;
        const startY = (canvasHeight - (lines.length -1) * lineHeight) / 2;

        lines.forEach((singleLine, index) => {
            ctx.fillText(singleLine, canvasWidth / 2, startY + (index * lineHeight));
        });

        ctx.filter = 'none';
    }

    greenModeButton.addEventListener('click', () => setMode('green', 'green'));
    whiteModeButton.addEventListener('click', () => setMode('white', 'white'));
    scribbleModeButton.addEventListener('click', () => {
        setMode('scribble', currentBgColor);
    });

    generateButton.addEventListener('click', drawBratCanvas);
    inputText.addEventListener('input', drawBratCanvas);

    Object.entries(langButtonsHeader).forEach(([lang, button]) => {
        button.addEventListener('click', () => updateTexts(lang));
    });
    Object.entries(langButtonsFooter).forEach(([lang, button]) => {
        button.addEventListener('click', () => updateTexts(lang));
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 确保 translations 对象已加载
    if (translations) {
        updateTexts('id');
        setMode('green', 'green');
    } else {
        console.error("多语言数据 (translations) 未找到。请确保它在 index.html 中 script.js 加载之前已定义。");
    }
});
