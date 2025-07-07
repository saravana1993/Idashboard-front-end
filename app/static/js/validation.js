// flask_app/app/static/js/validation.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Additional validation logic can be added here

            this.submit();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!username || !email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Additional validation logic can be added here

            this.submit();
        });
    }
});