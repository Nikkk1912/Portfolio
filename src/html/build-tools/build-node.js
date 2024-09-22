const fs = require('fs');
const path = require('path');

const mainHtmlPath = path.join(__dirname, '../templates/main.html');

// Parts for main page
const mainHeaderPath = path.join(__dirname, '../parts/main/main_header.html');
const mainAboutMePath = path.join(__dirname, '../parts/main/main_section_about_me.html');
const mainProjectsPath = path.join(__dirname, '../parts/main/main_section_projects.html');
const mainFooterPath = path.join(__dirname, '../parts/main/main_footer.html');

fs.readFile(mainHtmlPath, 'utf8', (err, compiledHtml) => {
    if (err) {
        return console.error("Failed to read main.html:", err);
    }

    const readParts = [
        { path: mainHeaderPath, placeholder: '{{ main_header.html }}' },
        { path: mainAboutMePath, placeholder: '{{ main_section_about_me.html }}' },
        { path: mainProjectsPath, placeholder: '{{ main_section_projects.html }}' },
        { path: mainFooterPath, placeholder: '{{ main_footer.html }}' }
    ];

    let readCount = 0;

    readParts.forEach(part => {
        fs.readFile(part.path, 'utf8', (err, content) => {
            if (err) {
                return console.error(`Failed to read ${part.placeholder}:`, err);
            }

            compiledHtml = compiledHtml.replace(part.placeholder, content);
            readCount++;

            if (readCount === readParts.length) {
                fs.writeFile(path.join(__dirname, '../output/main_index.html'), compiledHtml, err => {
                    if (err) {
                        return console.error("Failed to write main_index.html:", err);
                    }
                    console.log("Successfully compiled main_index.html!");
                });
            }
        });
    });
});
