# 🔧 Troubleshooting Guide - Foodie Canteen System

Quick solutions to common problems on Windows.

---

## 📋 Quick Diagnostic Checklist

Before troubleshooting, check these basics:

- [ ] Node.js is installed (run `node --version`)
- [ ] npm is installed (run `npm --version`)
- [ ] You're in the correct project folder
- [ ] Internet connection is working
- [ ] You have at least 1GB free disk space
- [ ] No other app is using port 3000
- [ ] Command Prompt is not running as regular user (try Administrator)

---

## 🚨 Error Categories

### Category 1: Installation Errors

#### Error: "node is not recognized"

```
'node' is not recognized as an internal or external command
```

**Cause:** Node.js is not installed or not in PATH

**Solution:**
1. Install Node.js from https://nodejs.org/
2. During installation, ensure "Add to PATH" is checked
3. Restart your computer
4. Open a NEW Command Prompt
5. Test: `node --version`

---

#### Error: "npm install" fails with EACCES

```
Error: EACCES: permission denied
```

**Cause:** Insufficient permissions

**Solution Option 1 (Recommended):**
1. Close Command Prompt
2. Right-click Command Prompt
3. Select "Run as Administrator"
4. Navigate to project: `cd path\to\project`
5. Run: `npm install`

**Solution Option 2:**
1. Open Windows Settings
2. Go to "Update & Security" → "For developers"
3. Enable "Developer Mode"
4. Restart computer
5. Try `npm install` again

---

#### Error: npm install is very slow

```
npm install takes more than 10 minutes
```

**Cause:** Slow internet or npm cache issues

**Solution:**
1. Check internet connection speed
2. Clear npm cache:
   ```cmd
   npm cache clean --force
   ```
3. Try installing again:
   ```cmd
   npm install
   ```
4. If still slow, use a different network

---

#### Error: "Cannot find module"

```
Error: Cannot find module 'react'
```

**Cause:** Dependencies not installed properly

**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json` file
3. Reinstall:
   ```cmd
   npm install
   ```
4. Wait for completion
5. Try running again: `npm run dev`

---

### Category 2: Server Start Errors

#### Error: Port 3000 already in use

```
EADDRINUSE: address already in use :::3000
```

**Cause:** Another application is using port 3000

**Solution Option 1 - Kill the process:**
1. Open Command Prompt as Administrator
2. Find the process:
   ```cmd
   netstat -ano | findstr :3000
   ```
3. Note the PID (Process ID) number
4. Kill the process:
   ```cmd
   taskkill /PID <PID_NUMBER> /F
   ```
5. Try `npm run dev` again

**Solution Option 2 - Change port:**
1. Open `vite.config.ts`
2. Change port number:
   ```typescript
   server: {
     port: 3001, // Change from 3000 to 3001
     open: true,
   }
   ```
3. Save file
4. Run: `npm run dev`
5. App will open at http://localhost:3001

---

#### Error: Cannot start dev server

```
Error: Failed to start dev server
```

**Cause:** Various reasons (firewall, antivirus, corrupted files)

**Solution:**
1. Check Windows Firewall:
   - Allow Node.js through firewall
   - Settings → Windows Security → Firewall
   - Allow an app → Add Node.js

2. Disable antivirus temporarily
3. Clear Vite cache:
   ```cmd
   npm run dev -- --force
   ```

4. If still failing, reinstall:
   ```cmd
   npm install --force
   npm run dev
   ```

---

### Category 3: Browser Issues

#### Browser doesn't open automatically

**Cause:** Default browser not set or Vite configuration

**Solution:**
1. Manually open your browser
2. Go to: http://localhost:3000
3. Bookmark the URL

**To fix auto-open:**
1. Open `vite.config.ts`
2. Verify this setting:
   ```typescript
   server: {
     port: 3000,
     open: true, // Make sure this is true
   }
   ```

---

#### White screen or blank page

**Cause:** JavaScript error or build issue

**Solution:**
1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Common fixes:
   ```cmd
   # Clear cache and restart
   npm cache clean --force
   
   # Delete build cache
   rmdir /s /q node_modules\.vite
   
   # Restart dev server
   npm run dev
   ```

4. Hard refresh browser: `Ctrl + Shift + R`

---

#### 404 Not Found errors

**Cause:** Files not found or routing issue

**Solution:**
1. Check that `index.html` exists in root
2. Check that `main.tsx` exists in root
3. Stop server (Ctrl+C)
4. Restart: `npm run dev`
5. Clear browser cache: `Ctrl + Shift + Delete`

---

### Category 4: TypeScript Errors

#### TypeScript compilation errors

```
error TS2307: Cannot find module 'react'
```

**Cause:** TypeScript can't find type definitions

**Solution:**
1. Check TypeScript version:
   ```cmd
   npx tsc --version
   ```
   Should be 5.7.2 or higher

2. Reinstall type definitions:
   ```cmd
   npm install --save-dev @types/react @types/react-dom
   ```

3. Run type check:
   ```cmd
   npm run type-check
   ```

4. If errors persist, check `tsconfig.json` exists

---

#### "Cannot use import statement outside a module"

**Cause:** Module system misconfiguration

**Solution:**
1. Check `package.json` has:
   ```json
   "type": "module"
   ```

2. Check file extensions are `.tsx` or `.ts`

3. Restart dev server

---

### Category 5: React Errors

#### "useState is not defined"

**Cause:** Missing React import

**Solution:**
Check that the file has:
```typescript
import { useState } from 'react';
```

---

#### "React is not defined"

**Cause:** In newer React, this shouldn't happen

**Solution:**
1. Check you're using React 18+
2. Verify `tsconfig.json` has:
   ```json
   "jsx": "react-jsx"
   ```
3. Restart dev server

---

#### Hooks errors (invalid hook call)

```
Error: Invalid hook call
```

**Cause:** Multiple React versions or wrong usage

**Solution:**
1. Check only one React version installed:
   ```cmd
   npm list react
   ```

2. If multiple versions, clean install:
   ```cmd
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   ```

3. Ensure hooks are only called inside components

---

### Category 6: Build Errors

#### Build fails with memory error

```
JavaScript heap out of memory
```

**Cause:** Not enough memory for build

**Solution:**
1. Close unnecessary applications
2. Increase Node.js memory:
   ```cmd
   set NODE_OPTIONS=--max_old_space_size=4096
   npm run build
   ```

3. Try building with more memory:
   ```cmd
   npm run build -- --mode production
   ```

---

#### Build succeeds but preview fails

**Cause:** Preview server issue

**Solution:**
1. Check `dist` folder exists
2. Try:
   ```cmd
   npm run build
   npm run preview
   ```

3. Clear browser cache
4. Try different browser

---

### Category 7: Styling Issues

#### Tailwind CSS not working

**Cause:** Tailwind not configured properly

**Solution:**
1. Check `styles/globals.css` exists
2. Check it's imported in `main.tsx`:
   ```typescript
   import './styles/globals.css';
   ```

3. Check Vite config has Tailwind plugin:
   ```typescript
   import tailwindcss from '@tailwindcss/vite';
   
   plugins: [react(), tailwindcss()]
   ```

4. Restart dev server

---

#### Styles not updating

**Cause:** Cache issue

**Solution:**
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Stop and restart dev server
4. Delete `.vite` cache:
   ```cmd
   rmdir /s /q node_modules\.vite
   ```

---

### Category 8: Performance Issues

#### App is very slow

**Cause:** Too many re-renders or large bundle

**Solution:**
1. Check browser DevTools Console for warnings
2. Use React DevTools Profiler
3. Memoize expensive components:
   ```typescript
   import { memo } from 'react';
   const MyComponent = memo(function MyComponent(props) {
     // ...
   });
   ```

---

#### Hot reload is slow

**Cause:** Large project or many files

**Solution:**
1. Close unused files in editor
2. Exclude unnecessary files in `vite.config.ts`:
   ```typescript
   server: {
     watch: {
       ignored: ['**/node_modules/**', '**/dist/**']
     }
   }
   ```

---

## 🔍 Debugging Tools

### Browser DevTools (F12)

**Console Tab:**
- See JavaScript errors
- View console.log messages
- Check for warnings

**Network Tab:**
- Check if files are loading
- Look for 404 errors
- Monitor API calls

**Elements Tab:**
- Inspect HTML structure
- Check CSS styles
- Modify live

**React DevTools:**
- Install: https://chrome.google.com/webstore
- Search: "React Developer Tools"
- View component tree
- Inspect props and state

---

### Command Prompt Tips

**Clear screen:**
```cmd
cls
```

**Check current directory:**
```cmd
cd
```

**List files:**
```cmd
dir
```

**Check Node.js processes:**
```cmd
tasklist | findstr node
```

**Kill a process:**
```cmd
taskkill /IM node.exe /F
```

---

## 📞 Getting More Help

### Before Asking for Help

Prepare this information:

1. **System Info:**
   - Windows version
   - Node.js version: `node --version`
   - npm version: `npm --version`

2. **Error Details:**
   - Full error message (screenshot)
   - When the error occurs
   - What you were doing

3. **What You've Tried:**
   - List all solutions attempted
   - Results of each attempt

### Where to Get Help

1. **Check Documentation:**
   - README.md
   - SETUP_GUIDE.md
   - This file (TROUBLESHOOTING.md)

2. **Search Online:**
   - Google the exact error message
   - Stack Overflow
   - GitHub Issues

3. **Ask Your Team:**
   - Provide system info
   - Share error screenshots
   - Explain steps to reproduce

---

## 🎯 Common Command Reference

### Installation Commands
```cmd
# Install dependencies
npm install

# Install specific package
npm install package-name

# Install and save as dev dependency
npm install --save-dev package-name

# Clean install (remove node_modules first)
npm ci
```

### Development Commands
```cmd
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check TypeScript
npm run type-check

# Lint code
npm run lint
```

### Debugging Commands
```cmd
# Clear npm cache
npm cache clean --force

# View outdated packages
npm outdated

# Check for security issues
npm audit

# Fix security issues
npm audit fix

# List installed packages
npm list

# List global packages
npm list -g --depth=0
```

### Windows Commands
```cmd
# Check what's using a port
netstat -ano | findstr :3000

# Kill a process by PID
taskkill /PID 12345 /F

# Check Node.js processes
tasklist | findstr node

# Check environment variables
echo %PATH%

# Check if file exists
dir filename.txt
```

---

## ✅ Prevention Checklist

Avoid future issues by:

- [ ] Always install Node.js LTS version
- [ ] Keep npm updated: `npm install -g npm@latest`
- [ ] Regularly clear npm cache: `npm cache clean --force`
- [ ] Use Git to track changes
- [ ] Commit working code before making changes
- [ ] Keep dependencies updated: `npm outdated`
- [ ] Close dev server before making config changes
- [ ] Test in multiple browsers
- [ ] Check Console (F12) for warnings
- [ ] Keep project folder path short (avoid spaces)

---

## 🆘 Last Resort Solutions

If nothing works:

### Nuclear Option 1: Full Reinstall
```cmd
# 1. Backup your src/components files
# 2. Delete everything except your code
rmdir /s /q node_modules
del package-lock.json

# 3. Reinstall
npm install

# 4. Test
npm run dev
```

### Nuclear Option 2: Fresh Start
```cmd
# 1. Backup your code files
# 2. Delete entire project
# 3. Re-extract project ZIP
# 4. Copy your code back
# 5. Install and run
npm install
npm run dev
```

### Nuclear Option 3: Reinstall Node.js
1. Uninstall Node.js from Windows Settings
2. Delete `C:\Program Files\nodejs` folder
3. Delete `C:\Users\YourName\AppData\Roaming\npm`
4. Restart computer
5. Download and install Node.js again
6. Test: `node --version`
7. Go to project and run: `npm install`

---

## 📝 Issue Template

When reporting issues, use this template:

```
**Problem:**
[Describe what's wrong]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Steps to Reproduce:**
1. 
2. 
3. 

**System Information:**
- Windows Version: 
- Node.js Version: 
- npm Version: 
- Browser: 

**Error Message:**
```
[Paste full error here]
```

**What I've Tried:**
1. 
2. 
3. 

**Screenshots:**
[Attach screenshots if applicable]
```

---

**Remember: Most errors have simple solutions. Stay calm and follow the steps methodically!**

**Good luck! 🍀**
