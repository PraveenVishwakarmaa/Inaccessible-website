// Configuration - IP addresses are now checked in index.html before loading this script
// This script only loads for authorized IP addresses

// Demo credentials (change these for production)
const VALID_CREDENTIALS = {
    username: "admin",
    password: "123"
};

// DOM elements
const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard');
const loggedUsername = document.getElementById('logged-username');
const loggedIp = document.getElementById('logged-ip');
const loginTime = document.getElementById('login-time');
const authForm = document.getElementById('auth-form');
const loginBtn = document.querySelector('.login-btn');
const btnSpinner = document.querySelector('.btn-spinner');

let userIP = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Since this script only loads for authorized IPs, directly show login form
    showLoginForm();
});

// Get user's IP for display purposes
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userIP = data.ip;
        return userIP;
    } catch (error) {
        console.error('Error getting IP:', error);
        return 'Unknown';
    }
}

// Show login form
function showLoginForm() {
    loginForm.classList.remove('hidden');
}

// This function is no longer needed as IP check happens before script loads

// Show dashboard after successful login
async function showDashboard(username) {
    loginForm.classList.add('hidden');
    dashboard.classList.remove('hidden');
    
    // Update dashboard information
    loggedUsername.textContent = username;
    loggedIp.textContent = await getUserIP();
    loginTime.textContent = new Date().toLocaleString();
}

// Handle login form submission
authForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    loginBtn.disabled = true;
    btnSpinner.classList.remove('hidden');
    loginBtn.querySelector('span').textContent = 'Signing In...';
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validate credentials
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        showDashboard(username);
    } else {
        // Show error
        alert('Invalid username or password. Please try again.');
        
        // Reset form
        document.getElementById('password').value = '';
    }
    
    // Reset button state
    loginBtn.disabled = false;
    btnSpinner.classList.add('hidden');
    loginBtn.querySelector('span').textContent = 'Sign In';
});

// Logout function
function logout() {
    // Clear stored data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('loginTime');
    
    // Reset form
    authForm.reset();
    
    // Show login form
    dashboard.classList.add('hidden');
    loginForm.classList.remove('hidden');
}

// Check if user is already logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    if (isLoggedIn === 'true' && username) {
        showDashboard(username);
    }
}

// Security features
function addSecurityFeatures() {
    // Prevent right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Prevent F12, Ctrl+Shift+I, Ctrl+U
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
        }
    });
    
    // Auto-logout after inactivity (30 minutes)
    let inactivityTimer;
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if (localStorage.getItem('isLoggedIn') === 'true') {
                logout();
                alert('Session expired due to inactivity. Please login again.');
            }
        }, 30 * 60 * 1000); // 30 minutes
    }
    
    // Reset timer on user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetInactivityTimer, true);
    });
    
    // Initialize timer
    resetInactivityTimer();
}

// Initialize security features
addSecurityFeatures();

// Check login status on page load
checkLoginStatus();

// Export functions for global access
window.logout = logout; 