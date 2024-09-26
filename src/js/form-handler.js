document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('email-form');
    const messageDiv = document.getElementById('form-message'); // For displaying the success message

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('/submit-email', {
            method: 'POST',
            body: new URLSearchParams(formData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.text())
            .then(data => {
                // Display the success message
                messageDiv.textContent = 'I will contact you soon!';

                // Show the message div for 3 seconds, then clear the message
                setTimeout(() => {
                    messageDiv.textContent = ''; // Clears the message after 3 seconds
                }, 3000);

                // Optionally, reset the form fields after submission
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
