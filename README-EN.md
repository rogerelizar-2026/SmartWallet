# 💰 Smart Finance

[![Version](https://img.shields.io/badge/version-2.0.3-blue)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-pt--BR%7Cen--US-yellow)](README.md)
[![PWA](https://img.shields.io/badge/PWA-ready-orange)]()

> **Your personal finance assistant - Simple, secure, and offline**

---

## 📖 About the Project

**Smart Finance** is a Progressive Web App (PWA) designed to help you manage your personal finances in a simple, secure, and efficient way. It works completely offline, protects your data with encryption, and offers a modern experience on any device.

### ✨ Key Features

- 📊 **Complete Account Management** - Register checking accounts, investments, and credit cards
- 💹 **Income & Expense Tracking** - Record all your financial transactions
- 📈 **Interactive Charts** - Visualize your spending and income with Chart.js
- 🔐 **Advanced Security** - 256-bit AES-GCM encryption to protect your data
- 📱 **100% Offline** - Works without internet using IndexedDB and Service Workers
- 🌙 **Dark Mode** - Modern interface with light/dark theme
- 🔄 **Automatic Backup** - Easily export and import your data
- 📅 **Recurring Transactions** - Automate periodic entries
- 💳 **Smart Installments** - Track credit card installment purchases
- 🔍 **Advanced Search** - Filter transactions by description, category, amount, and date
- 🌐 **Multi-language** - Portuguese (BR), English (US), and Spanish (ES)

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling and responsiveness |
| JavaScript (ES6+) | Application logic |
| Chart.js 4.x | Interactive charts |
| IndexedDB | Local storage |
| Service Worker | Offline functionality |
| Web Crypto API | Data encryption |
| Manifest.json | PWA installation |

---

## 📁 Project Structure

```
smart-finance/
├── index.html              # Main page
├── manifest.json           # PWA configuration
├── sw.js                   # Service Worker
├── css/
│   └── style.css          # Stylesheets
├── js/
│   ├── app.js             # Main application
│   └── modules/
│       ├── constants.js   # Constants and categories
│       ├── crypto.js      # Encryption module
│       ├── smartfinance.js # Financial logic
│       └── utils.js       # Utility functions
├── README.md              # Portuguese version
├── README-EN.md           # This file (EN-US)
├── CHANGELOG.md           # Version history
├── LICENSE                # MIT License
└── USER_MANUAL.md         # Complete user guide
```

---

## 🚀 Installation

### Option 1: Local Use (Recommended)

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/your-username/smart-finance.git
   cd smart-finance
   ```

2. **Open directly in browser**
   - Simply open the `index.html` file in any modern browser
   - The app will work immediately, even without a web server

3. **Install as PWA (Optional)**
   - Chrome/Edge: Click the install icon in the address bar
   - Safari (iOS): Tap "Share" → "Add to Home Screen"
   - Firefox: Menu → "App" → "Install"

### Option 2: Free Hosting

Smart Finance can be hosted for free on:

- **[GitHub Pages](https://pages.github.com/)**
  ```bash
  # Enable GitHub Pages in repository settings
  ```

- **[Vercel](https://vercel.com/)**
  ```bash
  npm install -g vercel
  vercel deploy
  ```

- **[Netlify](https://netlify.com/)**
  - Drag the project folder to the Netlify dashboard

- **[Firebase Hosting](https://firebase.google.com/docs/hosting)**
  ```bash
  npm install -g firebase-tools
  firebase login
  firebase init hosting
  firebase deploy
  ```

---

## 📖 Getting Started

### 1️⃣ Initial Setup

When opening the app for the first time:

1. **Set your currency** (default: USD - US Dollar)
2. **Register your accounts**:
   - Checking Account (initial balance)
   - Investments (if any)
   - Credit Cards (with limit and closing date)

### 2️⃣ Add Transactions

- Click **"+ New Transaction"**
- Fill in:
  - **Description**: Ex: "Grocery Store", "Salary"
  - **Amount**: $500.00
  - **Category**: Select from the list (see below)
  - **Account**: Where the transaction occurred
  - **Date**: Transaction date
  - **Payment Method**: PIX, Debit, Credit, etc.

### 3️⃣ Track Your Results

- **Dashboard**: Monthly overview
- **Charts**: Distribution by category
- **Statements**: Complete transaction list
- **Reports**: Balance by period

---

## 📋 Default Categories

Smart Finance comes with **22 pre-configured categories** to organize your finances:

### 🟢 Income (8 categories)

| Category | Description | Color |
|----------|-------------|-------|
| 💼 Salary | Formal employment income | Green |
| 🎫 Meal Allowance | Meal vouchers, benefits | Yellow |
| 🤝 Assistance | Grants and scholarships | Turquoise |
| 🎁 Benefits | Bonuses, rewards | Light Blue |
| 💰 Refunds | Tax refunds, returns | Pink |
| 💻 Freelance | Freelance work | Orange |
| 📈 Earnings | Interest, dividends | Purple |
| 🏦 Withdrawals | Investment/reserve withdrawals | Indigo |

### 🔴 Expenses (14 categories)

| Category | Description | Color |
|----------|-------------|-------|
| 🏠 Housing | Rent, HOA, property tax, electricity, water, gas | Orange |
| 🛒 Groceries | Supermarket, farmers market, bakery, butcher | Teal |
| 🚗 Transportation | Uber, fuel, parking, tolls | Reddish Orange |
| 🏥 Healthcare | Pharmacy, doctor, dentist, health insurance | Red |
| 📚 Education | Courses, college, school, books | Blue |
| 💇 Personal Care | Salon, barbershop, gym, spa | Pink |
| 📱 Services | Subscriptions, streaming, phone | Light Purple |
| 🎉 Leisure | Movies, travel, shows, restaurants, food delivery | Rose |
| 🐾 Pets | Vet, pet food, pet shop | Purple |
| 🏦 Financial Institution | Bank fees, charges, IOF | Indigo |
| 📄 Document/Legal | Notary, lawyer, fines | Blue Gray |
| 💸 Loans | Loans and financing | Magenta |
| ❤️ Donation/Generosity | Donations, tithes, offerings | Lime Green |
| 💎 Savings/Investment | Investments, savings, CDs, treasury | Cyan |

> **Tip:** The system uses keywords for automatic categorization. For example, "Uber" will automatically be classified as **Transportation**.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + N` | New transaction |
| `Ctrl + S` | Save transaction |
| `Ctrl + F` | Search transactions |
| `Ctrl + D` | Toggle dark mode |
| `Esc` | Close modal |
| `Enter` | Confirm action |

---

## 📱 Mobile Gestures (Touch)

| Gesture | Action |
|---------|--------|
| 👆 Single tap | Select item |
| 👆👆 Double tap | Edit item |
| ➡️ Swipe right | Mark as paid/received |
| ⬅️ Swipe left | Delete item |
| ⬇️ Pull down | Refresh list |

---

## 🔐 Backup & Security

### Data Encryption

- Your data is encrypted locally using **256-bit AES-GCM**
- The encryption key is derived from your password using **PBKDF2**
- No data is sent to external servers

### Data Backup

1. **Export Backup**:
   - Go to **Settings** → **Backup**
   - Click **"Export Data"**
   - Save the `.json` file in a secure location

2. **Import Backup**:
   - Go to **Settings** → **Backup**
   - Click **"Import Data"**
   - Select the `.json` backup file

> **Important:** Make regular backups and store them in secure locations (cloud, external drive, etc.)

### Access Password

- Set a strong password on first use
- Use a combination of letters, numbers, and symbols
- Never share your password

---

## 🌐 Internationalization (i18n)

Smart Finance supports multiple languages:

| Language | Code | Status |
|----------|------|--------|
| Portuguese (Brazil) | pt-BR | ✅ Complete |
| English (US) | en-US | ✅ Complete |
| Spanish (Spain) | es-ES | ✅ Complete |

To change the language:
1. Go to **Settings**
2. Select **Language**
3. Choose your preferred language
4. The interface will update automatically

---

## 🖥️ Browser Compatibility

| Browser | Minimum Version | Status |
|---------|-----------------|--------|
| Google Chrome | 80+ | ✅ Full |
| Mozilla Firefox | 75+ | ✅ Full |
| Microsoft Edge | 80+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Opera | 70+ | ✅ Full |
| Samsung Internet | 13+ | ✅ Full |

### Technical Requirements

- **ES6+** support (modern JavaScript)
- **IndexedDB** for storage
- **Service Workers** for offline functionality
- **Web Crypto API** for encryption

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a **Pull Request**

### Contribution Guidelines

- Keep code clean and documented
- Follow the existing code standard
- Test on multiple browsers
- Update documentation if needed

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

You can:
- ✅ Use for personal purposes
- ✅ Use for commercial purposes
- ✅ Modify the code
- ✅ Distribute copies

As long as you maintain the original copyright notice.

---

## 📞 Contact & Support

- **📧 Email**: support@smartfinance.app (example)
- **💬 Issues**: [GitHub Issues](https://github.com/your-username/smart-finance/issues)
- **📖 Documentation**: See the [User Manual](USER_MANUAL.md)

### Help Resources

- [Complete User Manual](USER_MANUAL.md)
- [Change History](CHANGELOG.md)
- [Frequently Asked Questions (FAQ)](FAQ.md)

---

## 🗺️ Roadmap

### ✅ Version 2.0 (Current)
- Data encryption
- Multi-language support
- Smart categories
- Dark mode
- Complete PWA

### 🚧 Upcoming Versions
- [ ] PDF reports
- [ ] Open Finance integration (read-only)
- [ ] Financial goals
- [ ] Budget by category
- [ ] Push notifications
- [ ] Cloud sync (optional)

---

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Chart library
- [Font Awesome](https://fontawesome.com/) - Icons
- Open-source developer community

---

## ⚠️ Disclaimer

Smart Finance is provided "as is", without warranties of any kind. While we implement robust security measures, we recommend:

- Making regular backups of your data
- Using strong, unique passwords
- Keeping your browser up to date
- Not sharing your access password

This app does not connect to financial institutions and does not perform real banking transactions. It is a personal financial management tool.

---

<div align="center">

**Like the project?** ⭐ Leave a star on the repository!

[Back to top](#-smart-finance)

</div>
