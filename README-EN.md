# 📘 Smart Finance - Intelligent Personal Finance Manager

[![Version](https://img.shields.io/badge/version-2.0.2-blue.svg)](https://github.com/RogerElizar/smart-finance/releases)
[![License](https://img.shields.io/badge/license-CC0-lightgrey.svg)](LICENSE)
[![PT-BR](https://img.shields.io/badge/lang-pt--BR-green.svg)](README.md)
[![EN-US](https://img.shields.io/badge/lang-en--US-red.svg)](README-EN.md)

**Smart Finance** is a Progressive Web App (PWA) designed to help you organize your personal finances in a simple, secure, and intelligent way. **100% offline**, no registration or server installation required.

---

## 🌟 Key Features

### 💰 Complete Account Management
- **Multiple checking accounts**: Bank of America, Chase, Wells Fargo, etc.
- **Investment accounts**: Reserve and track your investments
- **Credit cards**: Register multiple cards with custom closing and due dates
- **Transfers**: Move money between your accounts easily

### 📊 Smart Visualizations
- **Complete dashboard**: Unified balance, income, expenses, and credit card totals
- **Interactive charts**: Pie, bar, and line charts with Chart.js
- **Financial projection**: Next month forecast based on recurring expenses and installments
- **Budget by category**: Set spending limits and track your progress

### 🎯 Financial Planning
- **Savings goals**: Calculate how long it will take to reach your emergency fund
- **Installment expenses**: Record purchases up to 48x and track automatically
- **Recurring expenses**: Automate fixed monthly entries
- **Due date alerts**: Visual warnings for upcoming payments

### 🔒 Security and Privacy
- **100% Offline**: All data is stored locally on your device
- **No registration**: No need to create an account or provide email
- **No tracking**: We don't use analytics cookies or tracking
- **Encrypted backup**: Export and import your data securely
- **Privacy mode**: Hide sensitive values when needed

### 📱 User Experience
- **PWA (Progressive Web App)**: Install as a native app on your device
- **Responsive design**: Works perfectly on desktop, tablet, and mobile
- **Customizable themes**: Light, dark, and colors matching your card brand
- **Multi-language**: Portuguese (BR) and English (US)
- **Keyboard shortcuts**: Maximum productivity with quick commands
- **Mobile gestures**: Swipe to edit and delete entries

---

## 🚀 Technologies Used

- **HTML5** - Semantic and accessible structure
- **CSS3** - Modern styling with CSS variables and Flexbox/Grid
- **JavaScript (ES6+)** - Business logic and DOM manipulation
- **Chart.js 4.4.0** - Interactive and responsive charts
- **LocalStorage** - Local data storage
- **Service Worker** - Offline functionality and caching
- **Web App Manifest** - PWA installation
- **Google Fonts (Inter)** - Modern and readable typography

---

## 📁 Project Structure

```
smart-finance/
├── index.html              # Main application
├── index.min.html          # Optimized version
├── styles.css              # Complete stylesheet
├── styles.min.css          # Minified version
├── js/
│   ├── app.js              # Main application logic
│   └── app.min.js          # Minified version
├── sw.js                   # Service Worker (offline)
├── sw.min.js               # Minified Service Worker
├── manifest.json           # PWA configuration
├── favicon.svg             # App icon
├── logo.svg                # Logo
├── logomarca.svg           # Alternative logo
├── README.md               # README in Portuguese
├── README-EN.md            # This file (English)
├── CHANGELOG.md            # Version history
├── LICENSE                 # CC0 1.0 License
└── ManualDoUsuário-SmartFinance.md  # Complete manual
```

---

## 📦 Installation

### Option 1: Local Use (Recommended)
1. **Download the files** from this repository
2. **Extract** to a folder on your computer
3. **Open** the `index.html` file in your preferred browser
4. **Install as PWA** (optional):
   - On Chrome/Edge: Click the install icon in the address bar
   - On Safari (iOS): Tap "Share" → "Add to Home Screen"

### Option 2: Free Hosting
You can host for free on:
- **GitHub Pages**: Enable in repository settings
- **Netlify**: Drag the folder to [netlify.com](https://netlify.com)
- **Vercel**: Import the repository at [vercel.com](https://vercel.com)

### System Requirements
- **Supported browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Storage**: Minimum 5MB free space in browser
- **Connection**: Only for initial loading (works offline afterwards)

---

## 🎯 Getting Started

### 1️⃣ Setting Up Your Accounts
Before registering transactions, set up your accounts:

1. Click **"My Accounts"** in the bottom menu
2. Tap **"➕ New Account"**
3. Fill in:
   - **Name**: Ex: "Bank of America", "Chase", "Wallet"
   - **Type**: Checking or Investment
   - **Initial Balance**: Current amount in the account
4. Click **"💾 Save"**

### 2️⃣ Registering Credit Cards
1. Go to **"My Cards"** in the menu
2. Click **"➕ New Card"**
3. Provide:
   - **Name**: Ex: "Chase Sapphire"
   - **Brand**: Visa, Mastercard, etc.
   - **Closing Day**: When the statement closes
   - **Due Day**: When you pay the bill
   - **Limit**: Total card limit
4. Save the settings

### 3️⃣ Recording Your First Transaction
At the top of the page, use the colored buttons:

- **💰 Income**: Salaries, earnings, sales
- **💸 Expense**: Purchases, bills, leisure
- **🔄 Transfer**: Movement between accounts

**Example of credit card expense:**
```
Type: 💸 Expense
Amount: $1,200.00 (total value)
Description: Refrigerator
Card: Chase
Installments: ✓ (4x of $300.00)
```

---

## ⌨️ Keyboard Shortcuts (Desktop)

| Shortcut | Action |
|----------|--------|
| `Ctrl + N` | New income |
| `Ctrl + D` | New expense |
| `Ctrl + T` | New transfer |
| `Ctrl + S` | Save form |
| `Ctrl + F` | Search transactions |
| `Esc` | Close modal |
| `F1` | Open help |

---

## 📱 Mobile Gestures

- **Swipe left**: Delete entry
- **Swipe right**: Edit entry
- **Long press**: Select multiple items
- **Pull to refresh**: Update dashboard

---

## 🗂️ Backup and Security

### Export Data
1. Go to **Settings** ⚙️
2. Click **"Export Data"**
3. Download the encrypted `.json` file
4. Store in a safe location (cloud, external drive)

### Import Data
1. In **Settings** ⚙️
2. Select **"Import Data"**
3. Choose the backup `.json` file
4. Confirm the import

### ⚠️ Important
- **Regular backup**: Export your data weekly
- **Responsibility**: Data is stored only on your device
- **Browser cleanup**: May erase all data if there's no backup

---

## 🏷️ Default Categories

### Income
- Salary
- Earnings
- Sales
- Gifts
- Other

### Expenses
- Food
- Housing
- Transportation
- Health
- Education
- Leisure
- Clothing
- Services
- Other

*You can create custom categories in Settings.*

---

## 🌐 Internationalization (i18n)

Smart Finance is available in:

- **🇧🇷 Português (Brasil)** - Default language
- **🇺🇸 English (United States)** - [Mudar para Português](README.md)

To change the language:
1. Go to **Settings** ⚙️
2. Under **Language**, select your preference
3. The interface will update automatically

---

## 🔧 Browser Compatibility

| Browser | Minimum Version | Status |
|---------|-----------------|--------|
| Google Chrome | 90+ | ✅ Full |
| Mozilla Firefox | 88+ | ✅ Full |
| Microsoft Edge | 90+ | ✅ Full |
| Apple Safari | 14+ | ✅ Full |
| Opera | 76+ | ✅ Full |
| Samsung Internet | 14+ | ✅ Full |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the project
2. Create a **branch** for your feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Development Guidelines
- Keep code clean and commented
- Follow ES6+ JavaScript standards
- Test on multiple browsers
- Document new features
- Respect the CC0 1.0 license

---

## 📄 License

This project is licensed under the **Creative Commons CC0 1.0 Universal**.

This means you can:
- ✅ Use for any purpose (personal or commercial)
- ✅ Modify and distribute
- ✅ Use without attribution (though we appreciate credits)

For more details, see the [LICENSE](LICENSE) file.

---

## 👨‍💻 Author and Contact

**Smart Finance** was conceived and developed by **RogerElizar™**

- **Email**: rogerelizar@gmail.com
- **GitHub**: [@RogerElizar](https://github.com/RogerElizar)

---

## 🆘 Support and Questions

### Need Help?
1. Check the [User Manual](ManualDoUsuário-SmartFinance.md)
2. Review the [CHANGELOG](CHANGELOG.md) for updates
3. Contact via email: rogerelizar@gmail.com

### Technical Issues?
- Clear browser cache
- Make sure JavaScript is enabled
- Try opening in incognito/private mode
- Update to the latest version

---

## 📈 Roadmap (Upcoming Versions)

- [ ] Custom PDF reports
- [ ] Integration with banking APIs (Open Banking)
- [ ] Push notifications for due bills
- [ ] Multi-user mode (family)
- [ ] Export to Excel/CSV spreadsheets
- [ ] Wealth evolution charts
- [ ] AI-based savings suggestions

---

## 🙏 Acknowledgments

- **Chart.js** - Open-source chart library
- **Google Fonts** - Inter typography
- **Dev Community** - For all support and inspiration

---

## ⚠️ Legal Disclaimer

**Smart Finance** is a personal financial control support tool and **does not replace professional financial advice**.

- All financial decisions are the sole responsibility of the user
- The developer is not liable for losses or damages resulting from the use of the application
- It is the user's responsibility to maintain regular backups of their data
- The application has no affiliation with mentioned financial institutions

---

## 📝 Changelog

To view all changes between versions, see the [CHANGELOG.md](CHANGELOG.md) file.

**Current Version**: 2.0.2
- ✨ HTML5 User Manual eBook
- 🎨 Interface and experience improvements
- 📊 New charts and visualizations
- 🔒 Security enhancements

---

<div align="center">

**Smart Finance © 2026** - Developed with ❤️ by RogerElizar™

[⬆️ Back to top](#-smart-finance---intelligent-personal-finance-manager)

</div>
