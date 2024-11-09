function selectGame() {
    const dropdown = document.getElementById('gameDropdown');
    const gameInput = document.getElementById('gameInput');
    gameInput.value = dropdown.value;
}

function checkGame() {
    // DOM event
    const gameInput = document.getElementById('gameInput').value.trim().toLowerCase();
    if (gameInput === 'pong') {
        window.location.href = 'pong.html';
    } else {
        alert("Game not found.");
    }
}

document.getElementById('gameInput').addEventListener('input', function() {
    const startButton = document.querySelector('.btn-primary');
    if (this.value.trim().length > 0) {
        // DOM method
        startButton.classList.remove('disabled');
    } else {
        // DOM method
        startButton.classList.add('disabled');
    }
});
