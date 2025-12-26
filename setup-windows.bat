@echo off
echo ========================================
echo Foodie Canteen System Setup for Windows
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Minimum required version: 18.0.0
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed!
    echo npm should come with Node.js installation
    pause
    exit /b 1
)

echo npm version:
npm --version
echo.

echo ========================================
echo Installing dependencies...
echo This may take 3-5 minutes...
echo ========================================
echo.

npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Please check the error messages above.
    echo Try running Command Prompt as Administrator.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation completed successfully!
echo ========================================
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Or simply double-click 'start-dev.bat'
echo.
pause
