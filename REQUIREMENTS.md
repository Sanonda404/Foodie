# Windows Installation Requirements

This file explains what you need to install to run the Foodie Canteen System on Windows.

## System Requirements

- **Operating System**: Windows 10 or Windows 11
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 1GB free space
- **Internet Connection**: Required for initial setup

## Required Software

### 1. Node.js (Required)

**What is it?**
Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a browser. It's essential for running React applications.

**Version Required:** 18.0.0 or higher

**Download & Install:**
1. Visit: https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
   - Current LTS: 20.x.x (recommended)
   - Minimum: 18.x.x
3. Run the installer (`.msi` file)
4. Follow the installation wizard:
   - Accept the license agreement
   - Keep default installation path
   - **IMPORTANT**: Check "Automatically install necessary tools"
   - **IMPORTANT**: Check "Add to PATH" (usually checked by default)
5. Click Install
6. Restart your computer after installation

**Verify Installation:**
Open Command Prompt and type:
```cmd
node --version
```
Should output: `v20.x.x` or `v18.x.x`

```cmd
npm --version
```
Should output: `10.x.x` or `9.x.x`

**npm (Node Package Manager)** comes automatically with Node.js. You don't need to install it separately.

---

## Project Dependencies

Once Node.js is installed, all other dependencies are installed automatically using npm.

### What Gets Installed?

When you run `npm install`, the following libraries will be downloaded:

#### Core Framework
- **React 18.3.1** - User interface framework
- **React DOM 18.3.1** - React renderer for web

#### Build Tools
- **Vite 6.0.11** - Fast build tool and dev server
- **TypeScript 5.7.2** - Type-safe JavaScript
- **Tailwind CSS 4.0.0** - Utility-first CSS framework

#### UI Component Libraries
- **Radix UI** - Accessible component primitives
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog
  - Dropdown Menu, Popover, Select, Slider, Switch
  - Tabs, Toast, Tooltip, and more
- **Lucide React 0.462.0** - Icon library (1000+ icons)
- **Recharts 2.13.3** - Chart library for analytics

#### Utility Libraries
- **clsx** - Conditional CSS class names
- **class-variance-authority** - CSS variant utilities
- **tailwind-merge** - Merge Tailwind classes intelligently
- **sonner** - Toast notifications
- **date-fns** - Date formatting
- **cmdk** - Command menu component
- **vaul** - Drawer component

#### Development Tools
- **ESLint 9.17.0** - Code quality checker
- **TypeScript ESLint** - TypeScript linting rules
- **Vite Plugin React** - React support for Vite

**Total Size:** Approximately 400-500 MB

**Installation Time:** 3-5 minutes (depends on internet speed)

---

## Optional Tools (Recommended)

### Visual Studio Code (Code Editor)

**What is it?**
A powerful, free code editor perfect for web development.

**Download:** https://code.visualstudio.com/

**Recommended Extensions:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier - Code formatter
- Auto Rename Tag
- Path Intellisense

### Git (Version Control)

**What is it?**
Version control system to track changes in your code.

**Download:** https://git-scm.com/

**Installation:**
1. Download the installer for Windows
2. Run the installer
3. Keep default settings
4. Click Next until installation completes

### Modern Web Browser

**Recommended:**
- Google Chrome (best for development)
- Microsoft Edge (Chromium-based)
- Firefox Developer Edition

**Why?**
These browsers have excellent developer tools (F12) for debugging React applications.

---

## Installation Steps Summary

### Step 1: Install Node.js
1. Download from https://nodejs.org/ (LTS version)
2. Run installer
3. Keep default settings
4. Restart computer

### Step 2: Verify Installation
Open Command Prompt:
```cmd
node --version
npm --version
```

### Step 3: Navigate to Project
```cmd
cd path\to\foodie-canteen-system
```

### Step 4: Install Dependencies
```cmd
npm install
```
Wait 3-5 minutes for completion.

### Step 5: Start Application
```cmd
npm run dev
```
Browser opens automatically to `http://localhost:3000`

---

## Quick Setup (Using Batch Files)

If you prefer a simpler approach:

1. **Install Node.js** (see Step 1 above)
2. **Double-click** `setup-windows.bat` in the project folder
3. **Wait** for installation to complete
4. **Double-click** `start-dev.bat` to run the app

---

## Troubleshooting Installation Issues

### Node.js Not Found
**Error:** `'node' is not recognized as an internal or external command`

**Solution:**
- Node.js not installed OR not added to PATH
- Reinstall Node.js and ensure "Add to PATH" is checked
- Restart your computer
- Open a NEW Command Prompt window

### npm Install Fails
**Error:** Permission denied or EACCES errors

**Solution:**
- Run Command Prompt as Administrator
  - Right-click Command Prompt
  - Select "Run as Administrator"
- Navigate to project folder
- Run `npm install` again

### Slow Download Speed
**Issue:** npm install is very slow

**Solution:**
- Check your internet connection
- Wait patiently (first install takes longer)
- Close unnecessary applications using internet
- Try again during off-peak hours

### Firewall Blocks Installation
**Issue:** Antivirus or firewall blocks npm

**Solution:**
- Temporarily disable antivirus
- Run installation
- Re-enable antivirus after installation
- Add Node.js to firewall exceptions

---

## What Each File Does

### Configuration Files (Auto-generated)
- `node_modules/` - All installed packages (400-500 MB)
- `package-lock.json` - Exact versions of installed packages

### Project Files (You maintain these)
- `package.json` - Lists all dependencies
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `main.tsx` - Application entry point
- `App.tsx` - Main React component

---

## Disk Space Breakdown

After full installation:

```
Project Folder Structure:
├── node_modules/          (~400-500 MB)
├── components/            (~50 KB)
├── data/                  (~5 KB)
├── styles/                (~10 KB)
├── types/                 (~2 KB)
├── Other files            (~50 KB)
└── Total: ~500 MB
```

After building for production:
```
└── dist/                  (~500 KB - 1 MB)
```

---

## Network Requirements

### Initial Setup
- **Data Download:** ~100-150 MB
- **Packages:** ~400 packages to download
- **Time:** 3-5 minutes on average internet

### Development
- **No internet required** once installed
- **Hot-reload** works offline
- **Local server** at http://localhost:3000

### Production Build
- No internet required
- Build time: ~30-60 seconds
- Output: Optimized static files

---

## System PATH Explained

**What is PATH?**
PATH is an environment variable that tells Windows where to find executable programs.

**Why It Matters:**
When you type `node` or `npm` in Command Prompt, Windows searches all folders in PATH to find these programs.

**How to Check PATH:**
1. Open Command Prompt
2. Type: `echo %PATH%`
3. Look for paths containing "nodejs"

**Example PATH entry:**
```
C:\Program Files\nodejs\
```

If Node.js is not in PATH, you'll get "command not found" errors.

---

## Next Steps After Installation

1. ✅ **Verify Everything Works**
   - Run `npm run dev`
   - Browser opens to http://localhost:3000
   - See the Foodie landing page

2. 📚 **Read Documentation**
   - `README.md` - Full project documentation
   - `SETUP_GUIDE.md` - Detailed Windows setup guide
   - This file - Understanding requirements

3. 💻 **Start Development**
   - Explore the code in `components/`
   - Make changes and see live updates
   - Build features!

---

## Getting Help

If you encounter issues:

1. **Check Error Messages**
   - Read the full error in Command Prompt
   - Copy and search on Google
   - Most errors have common solutions

2. **Common Resources**
   - Node.js documentation: https://nodejs.org/docs
   - npm documentation: https://docs.npmjs.com
   - Stack Overflow: https://stackoverflow.com

3. **Ask Your Team**
   - Share error screenshots
   - Describe what you tried
   - Include system information

---

## Checklist Before Starting

- [ ] Windows 10 or 11 installed
- [ ] At least 1GB free disk space
- [ ] Stable internet connection
- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Command Prompt can run `node --version`
- [ ] Project files extracted
- [ ] Ready to run `npm install`

---

**That's everything you need to know about installing the Foodie Canteen System on Windows!**

For step-by-step instructions, see `SETUP_GUIDE.md`.

For project features and usage, see `README.md`.

**Happy Coding! 🚀**
