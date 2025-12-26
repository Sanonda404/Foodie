# 🪟 Windows Setup Guide - Foodie Canteen System

This guide will help you set up and run the Foodie Canteen System on your Windows machine.

## ⚡ Quick Start (Easiest Method)

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose the "LTS" version (recommended)
   - Run the installer and follow the setup wizard
   - **Important**: Make sure to check "Add to PATH" during installation

2. **Open the project folder**
   - Extract the project ZIP file to a location like `C:\Users\YourName\Desktop\foodie-canteen-system`
   - Open the folder

3. **Run the setup script**
   - Double-click `setup-windows.bat`
   - Wait for the installation to complete (3-5 minutes)

4. **Start the application**
   - Double-click `start-dev.bat`
   - The app will open automatically in your browser at `http://localhost:3000`

That's it! 🎉

---

## 📋 Manual Setup (Alternative Method)

If the batch files don't work, follow these steps:

### Step 1: Install Prerequisites

#### Install Node.js and npm

1. Go to https://nodejs.org/
2. Download the **LTS version** (e.g., 18.x.x or 20.x.x)
3. Run the installer
4. Accept the license agreement
5. Keep default installation options
6. **Important**: Ensure "Add to PATH" is checked
7. Click Install and wait for completion
8. Restart your computer (recommended)

#### Verify Installation

1. Press `Win + R` to open Run dialog
2. Type `cmd` and press Enter
3. In the Command Prompt, type:
   ```cmd
   node --version
   ```
   You should see something like: `v18.19.0`

4. Then type:
   ```cmd
   npm --version
   ```
   You should see something like: `10.2.3`

If you see version numbers, you're good to go! ✅

### Step 2: Navigate to Project Folder

1. Open **Command Prompt**:
   - Press `Win + R`
   - Type `cmd`
   - Press Enter

2. Change to your project directory:
   ```cmd
   cd C:\Users\YourName\Desktop\foodie-canteen-system
   ```
   (Replace with your actual project path)

### Step 3: Install Dependencies

In the Command Prompt, type:

```cmd
npm install
```

**What this does:**
- Downloads all required packages and libraries
- Creates a `node_modules` folder
- Takes 3-5 minutes depending on internet speed

**If you see errors:**
- Try running Command Prompt as Administrator:
  - Right-click Command Prompt
  - Select "Run as Administrator"
  - Navigate to project folder again
  - Run `npm install` again

### Step 4: Start the Development Server

After installation completes, type:

```cmd
npm run dev
```

**What happens:**
- Vite development server starts
- Application compiles
- Browser opens automatically to `http://localhost:3000`
- You'll see the Foodie landing page! 🎉

### Step 5: Stop the Server

When you're done:
- Press `Ctrl + C` in the Command Prompt
- Type `Y` when asked "Terminate batch job (Y/N)?"
- Close the Command Prompt window

---

## 🔧 Troubleshooting

### Problem: "node is not recognized as an internal or external command"

**Solution:**
1. Node.js is not installed or not added to PATH
2. Reinstall Node.js and ensure "Add to PATH" is checked
3. Restart your computer
4. Try again

### Problem: "npm install" fails with EACCES or permission errors

**Solution:**
1. Close all Command Prompt windows
2. Right-click Command Prompt
3. Select "Run as Administrator"
4. Navigate to project folder
5. Run `npm install` again

### Problem: Port 3000 is already in use

**Solution:**
1. Check if another application is using port 3000
2. Stop that application, or
3. Edit `vite.config.ts` and change the port number:
   ```typescript
   server: {
     port: 3001, // Change to any available port
     open: true,
   }
   ```

### Problem: Browser doesn't open automatically

**Solution:**
1. Manually open your browser
2. Go to: `http://localhost:3000`
3. Bookmark it for easy access

### Problem: White screen or errors in browser

**Solution:**
1. Check the Command Prompt for error messages
2. Try stopping the server (Ctrl+C)
3. Delete `node_modules` folder
4. Delete `package-lock.json` file
5. Run `npm install` again
6. Run `npm run dev` again

### Problem: "Cannot find module" errors

**Solution:**
1. Stop the dev server (Ctrl+C)
2. Run:
   ```cmd
   npm cache clean --force
   npm install
   npm run dev
   ```

### Problem: TypeScript errors

**Solution:**
1. Check that all files are properly saved
2. Run:
   ```cmd
   npm run type-check
   ```
3. Review any error messages
4. Ensure TypeScript version is 5.7.2 or higher

---

## 📁 Project Files Explained

### Configuration Files

- **package.json** - Lists all dependencies and npm scripts
- **tsconfig.json** - TypeScript configuration
- **vite.config.ts** - Vite build tool configuration
- **eslint.config.js** - Code quality rules

### Source Files

- **main.tsx** - Application entry point
- **App.tsx** - Main application component
- **index.html** - HTML template
- **components/** - All React components
- **styles/** - CSS styling
- **types/** - TypeScript type definitions
- **data/** - Mock data for development

### Setup Files (Windows)

- **setup-windows.bat** - Automated setup script
- **start-dev.bat** - Quick start script
- **README.md** - Main documentation
- **SETUP_GUIDE.md** - This file!

---

## 🎯 Available Commands

Open Command Prompt in the project folder and use these commands:

### Development Commands

```cmd
npm run dev
```
Start development server with hot-reload

```cmd
npm run build
```
Create production build in `dist` folder

```cmd
npm run preview
```
Preview production build locally

### Quality Assurance Commands

```cmd
npm run lint
```
Check code quality with ESLint

```cmd
npm run type-check
```
Check TypeScript types without building

---

## 🌐 Accessing the Application

Once the dev server is running:

1. **From the same computer:**
   - Open browser
   - Go to: `http://localhost:3000`

2. **From another device on the same network:**
   - Find your computer's IP address:
     ```cmd
     ipconfig
     ```
   - Look for "IPv4 Address" (e.g., 192.168.1.100)
   - On the other device, open browser
   - Go to: `http://192.168.1.100:3000`

---

## 🔐 Firewall Warning

When you first run `npm run dev`, Windows Firewall might ask for permission:
- Click "Allow Access"
- This lets other devices on your network access the app
- It's safe for development purposes

---

## 📦 What Gets Installed?

The `npm install` command installs approximately **400MB** of files:

**Main Dependencies:**
- React 18 - UI framework
- TypeScript - Type safety
- Vite - Build tool
- Tailwind CSS - Styling
- Radix UI - Component primitives
- Lucide React - Icons
- Recharts - Charts

**Total install size:** ~400-500 MB in `node_modules` folder

---

## 🚀 Next Steps After Setup

1. **Explore the App:**
   - Click "Join as Student" on landing page
   - Browse the menu
   - Add items to cart
   - Try the rush hour chatbot (bottom-right icon)
   - Submit a review/complaint

2. **Check Canteen View:**
   - Go back to landing page
   - Click "Join as Canteen"
   - Explore order queue
   - View analytics
   - Manage complaints

3. **Read the Documentation:**
   - Check `README.md` for detailed feature list
   - Review code in `components/` folder
   - Understand project structure

---

## 💡 Tips for Development

1. **Keep Command Prompt Open:**
   - Don't close it while developing
   - Watch for errors and warnings
   - Hot-reload works automatically

2. **Use a Good Code Editor:**
   - VS Code (recommended): https://code.visualstudio.com/
   - Sublime Text
   - Atom

3. **Browser DevTools:**
   - Press F12 in browser
   - Check Console for errors
   - Use Network tab for API calls

4. **Git for Version Control:**
   - Install Git: https://git-scm.com/
   - Track your changes
   - Collaborate with team

---

## 📞 Getting Help

If you're still having issues:

1. **Check Error Messages:**
   - Read the full error in Command Prompt
   - Google the error message
   - Check Stack Overflow

2. **Common Resources:**
   - Node.js docs: https://nodejs.org/docs
   - Vite docs: https://vitejs.dev
   - React docs: https://react.dev

3. **Ask for Help:**
   - Create an issue in the repository
   - Ask your team/instructor
   - Include error messages and screenshots

---

## ✅ Checklist

Before reporting issues, check:

- [ ] Node.js version is 18.0.0 or higher
- [ ] npm version is 9.0.0 or higher
- [ ] All files are extracted properly
- [ ] `npm install` completed without errors
- [ ] No other app is using port 3000
- [ ] Firewall is not blocking Node.js
- [ ] Internet connection is stable

---

## 🎉 You're All Set!

If the application is running in your browser, congratulations! You've successfully set up the Foodie Canteen System.

**Enjoy building and testing!** 🍔🚀

---

**Made with ❤️ for Windows Users**

*Last updated: December 2024*
