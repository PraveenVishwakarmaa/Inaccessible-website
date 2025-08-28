// Configuration - Update these with your and your friend's IP addresses
const ALLOWED_IPS = [
    "223.181.74.173",
    "103.214.119.248"
    // Add your IP address here
    // Example: "192.168.1.100",
    // Add your friend's IP address here
    // Example: "203.0.113.45"
];

// Demo credentials (change these for production)
const VALID_CREDENTIALS = {
    username: "admin",
    password: "123"
};

// DOM elements
const ipCheck = document.getElementById('ip-check');
const loginForm = document.getElementById('login-form');
const accessDenied = document.getElementById('access-denied');
const dashboard = document.getElementById('dashboard');
const userIpSpan = document.getElementById('user-ip');
const loggedUsername = document.getElementById('logged-username');
const loggedIp = document.getElementById('logged-ip');
const loginTime = document.getElementById('login-time');
const authForm = document.getElementById('auth-form');
const loginBtn = document.querySelector('.login-btn');
const btnSpinner = document.querySelector('.btn-spinner');

let userIP = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkIPAccess();
});

// Check if user's IP is allowed
async function checkIPAccess() {
    try {
        // Get user's IP address
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userIP = data.ip;
        
        // Update IP display
        userIpSpan.textContent = userIP;
        
        // Check if IP is in allowed list
        if (ALLOWED_IPS.length === 0) {
            // If no IPs are configured, show 404 error
            window.location.href = '/404.html';
        } else if (ALLOWED_IPS.includes(userIP)) {
            showLoginForm();
        } else {
            window.location.href = '/404.html';
        }
    } catch (error) {
        console.error('Error checking IP:', error);
        // Fallback: show login form if IP check fails
        showLoginForm();
    }
}

// Show login form
function showLoginForm() {
    ipCheck.classList.add('hidden');
    loginForm.classList.remove('hidden');
}

// Show access denied message
function showAccessDenied() {
    ipCheck.classList.add('hidden');
    accessDenied.classList.remove('hidden');
}

// Show dashboard after successful login
function showDashboard(username) {
    loginForm.classList.add('hidden');
    dashboard.classList.remove('hidden');
    
    // Update dashboard information
    loggedUsername.textContent = username;
    loggedIp.textContent = userIP;
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