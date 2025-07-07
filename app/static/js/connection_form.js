document.addEventListener("DOMContentLoaded", () => {
    const continueButton = document.querySelector(".continue-btn");
    const urlParams = new URLSearchParams(window.location.search);
    const databaseName = urlParams.get('database');
    const databaseName2 = decodeURIComponent(urlParams.get('database'));
    document.getElementById('database-name').innerHTML = `Add your ${databaseName}`;

   


    const backButton = document.querySelector(".exit-btn");
  
    if (backButton) {
        backButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/add-database";
      });
    }

    continueButton.addEventListener('click', (e) => {
        console.log("Button clicked")
        const name = document.getElementById('name').value.trim();
        const host = document.getElementById('host').value.trim();
        const database = document.getElementById('database').value.trim();
        const user = document.getElementById('user').value.trim();
        const password = document.getElementById('password').value.trim();
        const port = document.getElementById('port').value.trim();

        let isValid = true;

        if (name === '') {
            document.getElementById('name').nextElementSibling.innerHTML = 'Name is required';
            isValid = false;
        } else {
            document.getElementById('name').nextElementSibling.innerHTML = '';
        }

        if (host === '') {
            document.getElementById('host').nextElementSibling.innerHTML = 'Host is required';
            isValid = false;
        } else {
            document.getElementById('host').nextElementSibling.innerHTML = '';
        }

        if (database === '') {
            document.getElementById('database').nextElementSibling.innerHTML = 'Database is required';
            isValid = false;
        } else {
            document.getElementById('database').nextElementSibling.innerHTML = '';
        }

        if (user === '') {
            document.getElementById('user').nextElementSibling.innerHTML = 'User is required';
            isValid = false;
        } else {
            document.getElementById('user').nextElementSibling.innerHTML = '';
        }

        if (password === '') {
            document.getElementById('password').nextElementSibling.innerHTML = 'Password is required';
            isValid = false;
        } else {
            document.getElementById('password').nextElementSibling.innerHTML = '';
        }

        if (port === '') {
            document.getElementById('port').nextElementSibling.innerHTML = 'Port is required';
            isValid = false;
        } else if (isNaN(port) || port < 1 || port > 65535) {
            document.getElementById('port').nextElementSibling.innerHTML = 'Invalid port number';
            isValid = false;
        } else {
            document.getElementById('port').nextElementSibling.innerHTML = '';
        }

        if (isValid) {
            // Form is valid, submit it or perform further actions
            console.log('Form is valid');
            // You can add your form submission logic here
        }

        if (isValid) {
            const data = {
                name: name,
                host: host,
                database: database,
                user: user,
                password: password,
                port: port,
                db_system : databaseName2
            };
        
            fetch('/save_connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status === 200) {
                    window.location.href = '/databases'; // Redirect to another page
                } else {
                    console.error('Error:', response.status);
                }
            })
            .catch(error => console.error('Error:', error));
        }

        
        });
});