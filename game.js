// Simplified game.js

document.addEventListener('DOMContentLoaded', () => {
    const nextYearButton = document.getElementById('next-year');
    const statElements = document.querySelectorAll('.stat');

    nextYearButton.addEventListener('click', () => {
        // Functionality to handle the button event
        alert('Nākamais gads button clicked!');
        statElements.forEach(stat => {
            // Logic to update stats
            stat.textContent = parseInt(stat.textContent) + 1; // Example logic
        });
    });
});