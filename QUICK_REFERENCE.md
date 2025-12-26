# ⚡ Quick Command Reference - Windows

Quick copy-paste commands for working with Foodie Canteen System on Windows.

---

## 🚀 First Time Setup

```cmd
# 1. Navigate to project folder
cd C:\Users\YourName\Desktop\foodie-canteen-system

# 2. Install all dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 📦 Project Commands

### Development
```cmd
# Start development server (hot-reload enabled)
npm run dev

# Start on different port
set PORT=3001 && npm run dev
```

### Build
```cmd
# Create production build
npm run build

# Preview production build
npm run preview
```

### Quality Checks
```cmd
# Check TypeScript types
npm run type-check

# Lint code for errors
npm run lint

# Fix linting issues automatically
npm run lint -- --fix
```

---

## 🔧 Maintenance Commands

### Clean Install
```cmd
# Remove old installations
rmdir /s /q node_modules
del package-lock.json

# Fresh install
npm install
```

### Cache Management
```cmd
# Clear npm cache
npm cache clean --force

# Verify cache integrity
npm cache verify
```

### Update Dependencies
```cmd
# Check for outdated packages
npm outdated

# Update all packages to latest
npm update

# Update specific package
npm install package-name@latest
```

---

## 🐛 Debugging Commands

### Check Versions
```cmd
# Node.js version
node --version

# npm version
npm --version

# List all package versions
npm list --depth=0

# Check specific package version
npm list react
```

### Process Management
```cmd
# Find what's using port 3000
netstat -ano | findstr :3000

# Find all Node.js processes
tasklist | findstr node

# Kill process by PID
taskkill /PID 12345 /F

# Kill all Node.js processes
taskkill /IM node.exe /F
```

### Environment
```cmd
# Show PATH variable
echo %PATH%

# Show all environment variables
set

# Check if Node is in PATH
where node

# Check if npm is in PATH
where npm
```

---

## 📁 File Operations

### Navigation
```cmd
# Show current directory
cd

# Go to project root
cd C:\Users\YourName\Desktop\foodie-canteen-system

# Go up one level
cd ..

# List files in current directory
dir

# List files in subdirectory
dir components
```

### File Management
```cmd
# Create new directory
mkdir new-folder

# Delete directory and contents
rmdir /s /q folder-name

# Delete file
del filename.txt

# Copy file
copy source.txt destination.txt

# Move file
move source.txt destination.txt
```

---

## 🌐 Network & Server

### Port Management
```cmd
# Check if port 3000 is available
netstat -ano | findstr :3000

# Check all listening ports
netstat -ano | findstr LISTENING

# Find process using specific port
netstat -ano | findstr :3000
```

### Local Network Access
```cmd
# Find your computer's IP address
ipconfig

# Look for "IPv4 Address" in output
# Example: 192.168.1.100
# Access from other device: http://192.168.1.100:3000
```

---

## 🔍 Logs & Information

### View Logs
```cmd
# View npm debug log
type npm-debug.log

# View specific log file
type error.log

# Clear screen
cls
```

### Package Information
```cmd
# View package details
npm view package-name

# View package homepage
npm home package-name

# View package repository
npm repo package-name

# View package documentation
npm docs package-name
```

---

## 🎯 Common Workflows

### Starting Work
```cmd
# 1. Navigate to project
cd C:\Users\YourName\Desktop\foodie-canteen-system

# 2. Pull latest changes (if using Git)
git pull

# 3. Install any new dependencies
npm install

# 4. Start dev server
npm run dev
```

### Before Committing Changes
```cmd
# 1. Check for TypeScript errors
npm run type-check

# 2. Run linter
npm run lint

# 3. Build to check for issues
npm run build

# 4. If all pass, commit your code
git add .
git commit -m "Your message"
git push
```

### Fixing Issues
```cmd
# 1. Stop the server (Ctrl+C)

# 2. Clear cache
npm cache clean --force

# 3. Delete node_modules
rmdir /s /q node_modules

# 4. Delete package-lock.json
del package-lock.json

# 5. Reinstall
npm install

# 6. Restart server
npm run dev
```

---

## 📚 Git Commands (If Using Version Control)

### Basic Git
```cmd
# Initialize repository
git init

# Check status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Description of changes"

# View commit history
git log

# View recent commits (short)
git log --oneline -10
```

### Branches
```cmd
# List branches
git branch

# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch to new branch
git checkout -b feature-name

# Delete branch
git branch -d feature-name
```

### Remote Repository
```cmd
# Add remote repository
git remote add origin https://github.com/user/repo.git

# View remotes
git remote -v

# Push to remote
git push origin main

# Pull from remote
git pull origin main

# Clone repository
git clone https://github.com/user/repo.git
```

---

## 🔐 Permissions & Security

### Run as Administrator
```cmd
# In Command Prompt search:
# Right-click "Command Prompt"
# Select "Run as administrator"

# Or use this keyboard shortcut:
# Win + X, then press A
```

### Fix Permission Issues
```cmd
# Give full control to current user
icacls "C:\Path\To\Project" /grant %username%:F /T

# Reset folder permissions
icacls "C:\Path\To\Project" /reset /T
```

---

## 🌟 Advanced Commands

### Performance Analysis
```cmd
# Analyze bundle size
npm run build -- --mode production

# Run with debugging
set DEBUG=vite:* && npm run dev

# Increase Node.js memory
set NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

### Package Management
```cmd
# Install specific version
npm install react@18.3.1

# Install without saving to package.json
npm install package-name --no-save

# Install globally
npm install -g package-name

# Uninstall package
npm uninstall package-name

# Uninstall global package
npm uninstall -g package-name
```

### Audit & Security
```cmd
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may break compatibility)
npm audit fix --force

# View security report
npm audit --json
```

---

## 💾 Backup Commands

### Backup Important Files
```cmd
# Create backup folder
mkdir C:\Backup

# Copy project (excluding node_modules)
xcopy /E /I /EXCLUDE:exclude.txt "C:\Path\To\Project" "C:\Backup\Project"

# Create exclude.txt file first:
echo node_modules\ > exclude.txt
echo dist\ >> exclude.txt
echo .vite\ >> exclude.txt
```

### Quick Backup
```cmd
# Zip project folder (requires 7-Zip)
"C:\Program Files\7-Zip\7z.exe" a project-backup.zip * -xr!node_modules -xr!dist
```

---

## 🎨 Editor Commands (VS Code)

### Open in VS Code
```cmd
# Open current folder
code .

# Open specific file
code App.tsx

# Open with elevated permissions
code --user-data-dir="C:\Temp" .
```

### VS Code Keyboard Shortcuts
```
Ctrl + `          : Open terminal
Ctrl + P          : Quick file open
Ctrl + Shift + P  : Command palette
Ctrl + /          : Toggle comment
Alt + Up/Down     : Move line
Ctrl + D          : Select next occurrence
F2                : Rename symbol
```

---

## 🖥️ System Commands

### System Information
```cmd
# Windows version
winver

# Detailed system info
systeminfo

# Check RAM usage
tasklist /FI "IMAGENAME eq node.exe"

# Check disk space
wmic logicaldisk get size,freespace,caption
```

### Performance
```cmd
# Clear temporary files
del /q/f/s %TEMP%\*

# Empty recycle bin
rd /s /q %systemdrive%\$Recycle.bin

# Flush DNS cache
ipconfig /flushdns
```

---

## 📋 Clipboard & Export

### Save Output to File
```cmd
# Save command output to file
npm list > packages.txt

# Append to existing file
npm outdated >> packages.txt

# Save error output
npm run build 2> errors.txt
```

### Copy to Clipboard
```cmd
# Copy command output to clipboard (requires clip)
npm list | clip

# Copy file contents
type package.json | clip
```

---

## ✨ One-Line Problem Solvers

```cmd
# Fix "command not found" errors
where node && where npm

# Fix port in use
netstat -ano | findstr :3000 && taskkill /F /PID [PID_NUMBER]

# Complete clean reinstall
rmdir /s /q node_modules && del package-lock.json && npm install && npm run dev

# Fix Vite cache issues
rmdir /s /q node_modules\.vite && npm run dev

# Update everything
npm update && npm install && npm run dev

# Check if everything is working
node --version && npm --version && npm list --depth=0
```

---

## 🎯 Batch File Scripts

### Create custom shortcuts

**quick-clean.bat**
```batch
@echo off
echo Cleaning project...
rmdir /s /q node_modules
del package-lock.json
echo Installing dependencies...
npm install
echo Done!
pause
```

**quick-restart.bat**
```batch
@echo off
taskkill /F /IM node.exe
timeout /t 2
npm run dev
```

**full-check.bat**
```batch
@echo off
echo Running full project check...
call npm run type-check
call npm run lint
call npm run build
echo All checks complete!
pause
```

---

## 📖 Help & Documentation

```cmd
# Get help for npm commands
npm help

# Get help for specific command
npm help install

# Get help for configuration
npm help config

# Open npm documentation in browser
npm docs

# View package README
npm view react readme
```

---

## 🎁 Useful Aliases

### Create aliases (PowerShell)
```powershell
# Add to your PowerShell profile
# Find profile location: $PROFILE

# Create aliases
Set-Alias -Name dev -Value npm run dev
Set-Alias -Name build -Value npm run build

# Use like this:
dev
build
```

### Create batch shortcuts
```cmd
# Create nd.bat for "npm run dev"
echo npm run dev > nd.bat

# Create nb.bat for "npm run build"
echo npm run build > nb.bat

# Add folder to PATH to use anywhere
```

---

## 📞 Quick Help

**Need help? Try these in order:**

1. Check error in console
2. Search error on Google
3. Check TROUBLESHOOTING.md
4. Run: `npm run type-check`
5. Clear cache: `npm cache clean --force`
6. Reinstall: Delete node_modules, run `npm install`
7. Ask for help with full error message

---

## 🔗 Useful Links

- Node.js Docs: https://nodejs.org/docs
- npm Docs: https://docs.npmjs.com
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- TypeScript Docs: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

**Pro Tip:** Keep this file open in a browser tab for quick reference while developing!

**Copy-Paste Friendly:** All commands are tested and ready to use on Windows 10/11.

---

**Happy Coding! 🚀**
