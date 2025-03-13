// Register Form Handler
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (data.message === 'User already exists') {
            // Show "Already Registered" message below the register button
            document.getElementById('alreadyRegisteredLink').style.display = 'block';
            return;
        }

        document.getElementById('message').textContent = data.message || 'User registered successfully';

        // Hide registration form and show login form
        document.getElementById('registerFormContainer').style.display = 'none';
        document.getElementById('loginFormContainer').style.display = 'block';

    } catch (err) {
        document.getElementById('message').textContent = 'User already exists';
    }
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.token) {
            document.getElementById('message').textContent = 'Login successful!';
        } else {
            document.getElementById('message').textContent = data.message || 'Login failed';
        }
    } catch (err) {
        document.getElementById('message').textContent = 'Error logging in';
    }
});

// Display login form when user clicks "Login" link
document.getElementById('loginRedirectLink').addEventListener('click', () => {
    // Hide the registration form and show the login form
    document.getElementById('registerFormContainer').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
});
