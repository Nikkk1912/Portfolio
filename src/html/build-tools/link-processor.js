const fs = require("fs");
const path = require('path');

const linksMap = new Map();
const linksJsonPath = path.join(__dirname, '../links/links.json');
let links;

try {
    const jsonString = fs.readFileSync(linksJsonPath);
    links = JSON.parse(jsonString);
} catch (err) {
    console.error(err);
    return;
}

links.socials.forEach(social => {
    linksMap.set(social.name, social.link);
});

const wordDirPath = path.join(__dirname, '../output');

try {
    const filesToChange = fs.readdirSync(wordDirPath);
    filesToChange.forEach(file => {
        const filePath = path.join(wordDirPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const updatedFileContent = fileContent.replace(/\[\[--link:(\w+)\]\]/g, (match, key) => {
            const link = linksMap.get(key);
            if (link) {
                return link;
            } else {
                console.log("Found invalid link template: " + match + " skipping...");
                return match;
            }
        });

        fs.writeFileSync(filePath, updatedFileContent, 'utf-8');
    });
    console.log("Link successfully injected.")
} catch (err) {
    console.error(err);
    return;
}
