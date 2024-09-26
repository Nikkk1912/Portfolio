const fs = require('fs');
const path = require('path');


const dataFilePath = path.join(__dirname, '../storage/emails-storage.json');


exports.handleEmailSubmission = (req, res) => {
    const { name, email } = req.body;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).send('An error occurred while processing the form.');
        }

        // Parse the existing data (if any)
        let emailData = { emails: [] };
        if (data) {
            emailData = JSON.parse(data);
        }

        // Add the new email submission to the array
        emailData.emails.push({ name, email });

        // Write the updated data back to the JSON file
        fs.writeFile(dataFilePath, JSON.stringify(emailData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
                return res.status(500).send('An error occurred while saving the data.');
            }

            // Send a success response
            res.send('Email submitted successfully!');
        });
    });
};
