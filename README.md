# 🔐 Secure Login Portal

A modern, secure login website with IP address restrictions that can be hosted on GitHub Pages. This portal allows access only from specific IP addresses (your device and your friend's device).

## ✨ Features

- **IP Address Restriction**: Only allows access from pre-configured IP addresses
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Security Features**: 
  - Prevents right-click context menu
  - Blocks developer tools shortcuts (F12, Ctrl+Shift+I, Ctrl+U)
  - Auto-logout after 30 minutes of inactivity
  - Session management with localStorage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **GitHub Pages Ready**: Can be hosted directly on GitHub Pages

## 🚀 Quick Start

### 1. Clone or Download
Download all files to your local machine or clone this repository.

### 2. Configure IP Addresses
Open `script.js` and update the `ALLOWED_IPS` array with your and your friend's IP addresses:

```javascript
const ALLOWED_IPS = [
    "YOUR_IP_ADDRESS_HERE",        // Your IP address
    "YOUR_FRIEND_IP_ADDRESS_HERE"  // Your friend's IP address
];
```

### 3. Update Credentials
Change the default login credentials in `script.js`:

```javascript
const VALID_CREDENTIALS = {
    username: "your_username",     // Change this
    password: "your_password"      // Change this
};
```

### 4. Find Your IP Address
To get your IP address:
1. Visit [whatismyipaddress.com](https://whatismyipaddress.com/)
2. Note down your public IP address
3. Add it to the `ALLOWED_IPS` array

### 5. Test Locally
Open `index.html` in your browser to test the website locally.

**Important**: You must configure at least one IP address in the `ALLOWED_IPS` array. If no IP addresses are configured, the website will show a 404 error for all users.

## 🌐 Hosting on GitHub Pages

### Method 1: Using GitHub Repository

1. **Create a new repository** on GitHub
2. **Upload all files** to the repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. **Go to Settings** → **Pages**
4. **Select source**: "Deploy from a branch"
5. **Choose branch**: "main" (or "master")
6. **Save** and wait for deployment
7. **Access your website** at: `https://yourusername.github.io/repositoryname`

### Method 2: Using GitHub Pages Direct Upload

1. Go to [GitHub Pages](https://pages.github.com/)
2. Create a new repository with your username: `yourusername.github.io`
3. Upload all files to this repository
4. Your website will be available at: `https://yourusername.github.io`

## 🔧 Configuration Options

### IP Address Management
- **Add IPs**: Add new IP addresses to the `ALLOWED_IPS` array
- **Remove IPs**: Remove IP addresses from the array to revoke access
- **No Demo Mode**: If no IPs are configured, the site shows 404 error (no access allowed)

### Security Settings
- **Session Timeout**: Change the inactivity timeout (currently 30 minutes) in `script.js`
- **Developer Tools**: Modify the blocked shortcuts in the `addSecurityFeatures()` function

### Styling
- **Colors**: Update the CSS variables in `styles.css` to change the color scheme
- **Fonts**: Change the Google Fonts import in `index.html`

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🔒 Security Notes

1. **IP Address Changes**: If your IP address changes (common with dynamic IPs), you'll need to update the `ALLOWED_IPS` array
2. **Public IP**: This uses your public IP address, not local network IP
3. **VPN**: If you use a VPN, your IP address will change
4. **Mobile Data**: Mobile data connections may have changing IP addresses

## 🛠️ Troubleshooting

### Access Denied Error
- Check if your IP address is correctly added to `ALLOWED_IPS`
- Visit [whatismyipaddress.com](https://whatismyipaddress.com/) to verify your current IP
- Update the IP address in the configuration

### Website Not Loading
- Ensure all files are uploaded to GitHub
- Check the repository settings for GitHub Pages
- Verify the repository is public (required for free GitHub Pages)

### Login Not Working
- Check the credentials in `VALID_CREDENTIALS`
- Clear browser cache and localStorage
- Try in an incognito/private window

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your IP address is correct
3. Ensure all files are properly uploaded
4. Test in different browsers

## 📄 License

This project is open source and available under the MIT License.

---

**Note**: This is a client-side only solution. For production use with sensitive data, consider implementing server-side authentication and IP validation. 