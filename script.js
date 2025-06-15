document.addEventListener('DOMContentLoaded', () => {
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

    let currentStyleMode = 'green'; // 'green', 'white', or 'scribble' (background color for scribble)
    let currentBgColor = 'green'; // 'green' or 'white' - actual background for canvas
    let currentLang = 'id';

    const translations = {
        id: {
            metaTitle: "Generator Sampul Brat - Buat Sampul Album Kustom",
            metaDescription: "Buat gambar sampul kustom ala album Brat Charli XCX dengan teks Anda sendiri. Pilih latar belakang hijau, putih, atau gaya coretan. Cepat dan mudah!",
            logo: "Brat-Generator",
            navGenerator: "Generator",
            navHowItWorks: "Cara Kerja",
            navFeatures: "Fitur",
            generatorTitle: "Generator Sampul Brat - Charli XCX",
            typeWordsHere: "Masukkan teks Anda di sini ↓",
            inputPlaceholder: "Ketik apa saja yang Anda suka",
            greenMode: "Mode Hijau",
            whiteMode: "Mode Putih",
            scribbleMode: "Mode Coretan",
            generateButton: "Buat Sampul Brat Anda",
            scrollDown: "Gulir ke bawah untuk melihat sampul Brat Anda ↓",
            defaultCanvasText: "Klik buat untuk membuat sampul Brat Anda",
            takeScreenshot: "Screenshot untuk menyimpan ↑",
            howItWorksTitle: "Cara Kerja Generator Brat",
            howItWorksSubtitle: "Buat gambar gaya sampul album yang unik dengan kesederhanaan dan gaya Generator Brat.",
            step1Title: "Pilih Latar/Gaya",
            step1Desc: "Mulai dengan memilih latar hijau ikonik, putih mewah, atau gaya coretan untuk sampul album pribadi Anda.",
            step2Title: "Masukkan Teks",
            step2Desc: "Masukkan teks yang ingin Anda tampilkan di tengah gambar. Buatlah semenarik mungkin.",
            step3Title: "Buat Sampul",
            step3Desc: "Dengan sekali klik, Generator Brat mengubah teks Anda menjadi sampul album yang stylish. Pratinjau dan screenshot untuk menyimpan.",
            featuresTitle: "Fitur Generator Brat",
            featuresSubtitle: "Jelajahi fitur unik Generator Brat kami.",
            featureCustomizationTitle: "Kustomisasi",
            featureCustomizationDesc: "Pilih antara latar hijau, putih, atau gaya coretan dan masukkan teks kustom Anda.",
            featureEaseOfUseTitle: "Mudah Digunakan",
            featureEaseOfUseDesc: "Antarmuka kami intuitif dan mudah digunakan, mulailah membuat segera.",
            featureQualityTitle: "Kualitas Tinggi",
            featureQualityDesc: "Nikmati output gambar berkualitas tinggi, memastikan teks Anda jelas dan hidup.",
            featureCustomizationAlt: "Ikon Kustomisasi",
            featureEaseOfUseAlt: "Ikon Kemudahan Penggunaan",
            featureQualityAlt: "Ikon Kualitas",
            footerRights: "Hak cipta dilindungi.",
            languageLabel: "Bahasa:"
        },
        en: {
            metaTitle: "Brat Cover Generator - Create Custom Album Art",
            metaDescription: "Generate custom Brat album cover style images by Charli XCX with your own text. Choose green, white, or scribble style backgrounds. Fast and easy!",
            logo: "Brat-Generator",
            navGenerator: "Generator",
            navHowItWorks: "How it Works",
            navFeatures: "Features",
            generatorTitle: "Brat Generator - Charli XCX",
            typeWordsHere: "Enter your text here ↓",
            inputPlaceholder: "Type anything you like",
            greenMode: "Green Mode",
            whiteMode: "White Mode",
            scribbleMode: "Scribble Mode",
            generateButton: "Generate Your Brat Cover",
            scrollDown: "Scroll down to see your Brat cover ↓",
            defaultCanvasText: "Click generate to create your Brat cover",
            takeScreenshot: "Screenshot to save ↑",
            howItWorksTitle: "How the Brat Generator Works",
            howItWorksSubtitle: "Create unique album cover style images with the simplicity and style of the Brat Generator.",
            step1Title: "Choose Background/Style",
            step1Desc: "Start by selecting the iconic green, a luxurious white background, or a scribble style to set the tone for your personalized album cover.",
            step2Title: "Enter Text",
            step2Desc: "Input the text you want to feature in the center of your image. Whether it's a single word or a short phrase, make it catchy.",
            step3Title: "Generate Cover",
            step3Desc: "With a single click, the Brat Generator transforms your text into a stylish album cover. Preview it and take a screenshot to save.",
            featuresTitle: "Brat Generator Features",
            featuresSubtitle: "Explore the unique features of our Brat Generator.",
            featureCustomizationTitle: "Customization",
            featureCustomizationDesc: "Choose between bold green, pristine white backgrounds, or scribble style and enter your custom text.",
            featureEaseOfUseTitle: "Ease of Use",
            featureEaseOfUseDesc: "Our interface is intuitive and easy to use, start creating immediately.",
            featureQualityTitle: "High Quality",
            featureQualityDesc: "Enjoy high-quality image output, ensuring your text is clear and vivid.",
            featureCustomizationAlt: "Customization Icon",
            featureEaseOfUseAlt: "Ease of Use Icon",
            featureQualityAlt: "Quality Icon",
            footerRights: "All rights reserved.",
            languageLabel: "Language:"
        },
        zh: {
            metaTitle: "Brat 封面生成器 - 创建自定义专辑封面",
            metaDescription: "使用您自己的文本生成 Charli XCX 风格的 Brat 专辑封面图像。选择绿色、白色或涂鸦背景。快速简单！",
            logo: "Brat-Generator",
            navGenerator: "生成器",
            navHowItWorks: "工作原理",
            navFeatures: "特点",
            generatorTitle: "Brat 生成器 - Charli XCX",
            typeWordsHere: "在此输入你的文字 ↓",
            inputPlaceholder: "请输入任何你喜欢的文字",
            greenMode: "绿色模式",
            whiteMode: "白色模式",
            scribbleMode: "涂鸦模式",
            generateButton: "生成你的Brat封面",
            scrollDown: "向下滚动查看你的Brat封面 ↓",
            defaultCanvasText: "点击生成按钮创建你的Brat封面",
            takeScreenshot: "截图保存 ↑",
            howItWorksTitle: "Brat 生成器的工作原理",
            howItWorksSubtitle: "利用 Brat 生成器的简单和风格，创建独特的专辑封面风格图像。",
            step1Title: "选择背景/样式",
            step1Desc: "首先选择标志性的绿色、豪华的白色背景或涂鸦样式，为您的个性化专辑封面设定基调。",
            step2Title: "输入文本",
            step2Desc: "输入您希望显示在图像中心的文本。无论是一个单词还是一个简短的短语，都要让它吸引人。",
            step3Title: "生成封面",
            step3Desc: "只需点击一下，Brat 生成器就会将您的文本转换成时尚的专辑封面。预览并截图保存。",
            featuresTitle: "Brat 生成器特点",
            featuresSubtitle: "探索我们的 Brat 生成器的独特功能。",
            featureCustomizationTitle: "自定义",
            featureCustomizationDesc: "选择绿色、白色背景或涂鸦样式，并输入您的自定义文本。",
            featureEaseOfUseTitle: "易用性",
            featureEaseOfUseDesc: "界面直观易用，立即开始创建。",
            featureQualityTitle: "高质量",
            featureQualityDesc: "享受高质量的图像输出，文本清晰生动。",
            featureCustomizationAlt: "自定义图标",
            featureEaseOfUseAlt: "易用性图标",
            featureQualityAlt: "质量图标",
            footerRights: "版权所有.",
            languageLabel: "语言:"
        }
    };

    function updateTexts(lang) {
        currentLang = lang;
        document.documentElement.lang = lang; // Set HTML lang attribute for SEO
        const langPack = translations[lang];

        // Update title and meta description for SEO
        if (langPack.metaTitle) pageTitleElement.textContent = langPack.metaTitle;
        if (langPack.metaDescription) pageDescriptionElement.content = langPack.metaDescription;

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (langPack[key]) {
                if (el.tagName === 'INPUT' && el.type === 'text') {
                    if (el.placeholder && key.toLowerCase().includes('placeholder')) {
                        el.placeholder = langPack[key];
                    } else if (el.dataset.translateKey === key) { // For other input attributes if needed
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

        // Redraw canvas with new default text if input is empty
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
        const text = inputText.value.trim() || translations[currentLang].defaultCanvasText;
        const canvasWidth = bratCanvasElement.width;
        const canvasHeight = bratCanvasElement.height;

        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Set background color
       // ... (在 drawBratCanvas 函数内部)

// 清除画布
ctx.clearRect(0, 0, canvasWidth, canvasHeight);

// 获取 CSS 变量 --brat-green 计算后的实际颜色值
const bratGreenColor = getComputedStyle(document.documentElement).getPropertyValue('--brat-green').trim();

// 设置背景颜色
ctx.fillStyle = (currentBgColor === 'green') ? bratGreenColor : '#FFFFFF'; // 使用获取到的实际颜色值
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// ... (drawBratCanvas 函数的其余代码)

        // Draw scribbles if in scribble mode
        if (currentStyleMode === 'scribble') {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = Math.max(1, Math.min(3, canvasWidth / 200)); // Responsive line width
            const numLines = 20;
            for (let i = 0; i < numLines; i++) {
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
                // Simple straight lines for "chaotic" effect, can be bezier for more curves
                // ctx.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
                ctx.bezierCurveTo(
                    Math.random() * canvasWidth, Math.random() * canvasHeight,
                    Math.random() * canvasWidth, Math.random() * canvasHeight,
                    Math.random() * canvasWidth, Math.random() * canvasHeight
                );
                ctx.stroke();
            }
        }

        // Draw text
        ctx.fillStyle = '#000000'; // Black text
        // Responsive font size calculation
        let fontSize = Math.min(canvasWidth / (Math.max(5, text.length * 0.6)), canvasHeight * 0.2);
        fontSize = Math.max(20, Math.min(fontSize, 100)); // Clamp font size

        ctx.font = `700 ${fontSize}px ${getComputedStyle(document.body).fontFamily.split(',')[0].trim()}`; // Use primary font
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Apply blur
        ctx.filter = 'blur(1.5px)';
        // Simple text wrapping (split by space, draw line by line if too wide)
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

        // Reset filter
        ctx.filter = 'none';
    }


    greenModeButton.addEventListener('click', () => setMode('green', 'green'));
    whiteModeButton.addEventListener('click', () => setMode('white', 'white'));
    scribbleModeButton.addEventListener('click', () => {
        // Allow scribble on current background or default to green if needed
        setMode('scribble', currentBgColor);
    });


    generateButton.addEventListener('click', drawBratCanvas);
    inputText.addEventListener('input', drawBratCanvas); // Optional: live update as user types


    Object.entries(langButtonsHeader).forEach(([lang, button]) => {
        button.addEventListener('click', () => updateTexts(lang));
    });
    Object.entries(langButtonsFooter).forEach(([lang, button]) => {
        button.addEventListener('click', () => updateTexts(lang));
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Initial setup
    updateTexts('id'); // Default to Indonesian
    setMode('green', 'green'); // Default to green mode

});
