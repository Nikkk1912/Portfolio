const fs = require('fs');
const path = require('path');

// Define directories
// const pagesDirectory = path.join(__dirname, '../src/html/pages');
const pagesDirectory = path.join(__dirname, '../pages');
const outputDirectory = path.join(__dirname, '../output');
const linksJsonPath = path.join(__dirname, '../links/links.json');

// Load and map links from JSON file
const linksMap = new Map();
try {
    const jsonString = fs.readFileSync(linksJsonPath);
    const links = JSON.parse(jsonString);

    links.socials.forEach(social => {
        linksMap.set(social.name, social.link);
    });
} catch (err) {
    console.error('Failed to load links JSON:', err);
    return;
}

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
}

// Read the pages directory and get all HTML files
fs.readdir(pagesDirectory, (err, files) => {
    if (err) {
        console.error('Unable to scan pages directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(pagesDirectory, file);

        // Read each HTML file from the pages folder
        fs.readFile(filePath, 'utf-8', (err, fileContent) => {
            if (err) {
                console.error(`Failed to read ${file}:`, err);
                return;
            }

            // Inject links into placeholders within the file content
            const updatedContent = fileContent.replace(/\[\[--link:(\w+)\]\]/g, (match, key) => {
                const link = linksMap.get(key);
                if (link) {
                    return link;
                } else {
                    console.log("Found invalid link template:", match, "- skipping...");
                    return match;
                }
            });

            // Write the modified content to the output directory
            const outputFilePath = path.join(outputDirectory, file);
            fs.writeFile(outputFilePath, updatedContent, 'utf-8', err => {
                if (err) {
                    console.error(`Failed to write ${outputFilePath}:`, err);
                    return;
                }
                console.log(`File ${file} copied and links injected successfully to ${outputFilePath}`);
            });
        });
    });
});
