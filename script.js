document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login');
  const registerForm = document.getElementById('register');
  const messageDiv = document.getElementById('message');
  const formsDiv = document.getElementById('forms');

  // Function to save user data to localStorage
  const saveUser = (username, password) => {
      const userData = JSON.stringify({ username, password });
      localStorage.setItem(username, userData);
  };

  // Function to retrieve user data from localStorage
  const getUser = (username) => {
      const userData = localStorage.getItem(username);
      return JSON.parse(userData);
  };

  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const storedUser = getUser(username);

      if (storedUser && storedUser.password === password) {
          // Successful login
          messageDiv.innerHTML = `Welcome, ${username}!`;
          formsDiv.style.display = 'none'; // Hide the forms
      } else {
          // Display registration form
          registerForm.style.display = 'block';
          loginForm.style.display = 'none';
          messageDiv.innerHTML = 'User not found or incorrect password. Please register or try again.';
      }
  });

  registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newUsername = document.getElementById('new-username').value;
      const newPassword = document.getElementById('new-password').value;
      const storedUser = getUser(newUsername);

      if (storedUser) {
          messageDiv.innerHTML = 'Username already exists. Please choose another one.';
      } else {
          // Register the new user
          saveUser(newUsername, newPassword);
          messageDiv.innerHTML = 'Registration successful. You can now login.';
          registerForm.style.display = 'none';
          loginForm.style.display = 'block';
      }
  });
});
