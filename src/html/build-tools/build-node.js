const fs = require('fs');
const path = require('path');

// Paths to directories
const partsDirectory = path.join(__dirname, '../parts');
const templatesDirectory = path.join(__dirname, '../templates');
const outputDir = path.join(__dirname, '../output');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read the parts directory and get all subfolders
fs.readdir(partsDirectory, (err, folders) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }

    // Iterate over each subfolder
    folders.forEach(folder => {
        const folderPath = path.join(partsDirectory, folder);

        // Check if the current folder is indeed a directory
        fs.stat(folderPath, (err, stats) => {
            if (err) {
                return console.error('Error accessing ' + folder + ': ' + err);
            }

            if (stats.isDirectory()) {
                // Read the files inside each subfolder
                fs.readdir(folderPath, (err, files) => {
                    if (err) {
                        return console.error('Unable to scan subfolder ' + folder + ': ' + err);
                    }

                    // Initialize compiled HTML with the main template
                    const templatePath = path.join(templatesDirectory, `${folder}.html`);
                    fs.readFile(templatePath, 'utf8', (err, compiledHtml) => {
                        if (err) {
                            return console.error(`Failed to read ${templatePath}:`, err);
                        }

                        let readCount = 0;

                        // Process each file
                        files.forEach(file => {
                            const placeholder = `{{ ${folder}_${file} }}`; // Updated placeholder format
                            const filePath = path.join(folderPath, file);

                            // Read the content of the file to replace the placeholder
                            fs.readFile(filePath, 'utf8', (err, content) => {
                                if (err) {
                                    return console.error(`Failed to read ${filePath}:`, err);
                                }

                                // Replace placeholder with the content of the file
                                compiledHtml = compiledHtml.replace(placeholder, content);
                                readCount++;

                                // Once all files are read, write the compiled HTML
                                if (readCount === files.length) {
                                    const outputFileName = `index_${folder}.html`;
                                    fs.writeFile(path.join(outputDir, outputFileName), compiledHtml, err => {
                                        if (err) {
                                            return console.error(`Failed to write ${outputFileName}:`, err);
                                        }
                                        console.log(`Successfully compiled ${outputFileName}!`);
                                    });
                                }
                            });
                        });
                    });
                });
            }
        });
    });
});
