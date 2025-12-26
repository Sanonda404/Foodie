# Foodie - Smart Campus Canteen System

A comprehensive smart campus canteen system that solves the problem of long queues during class breaks by letting students pre-order food with pickup times while helping canteen staff manage rush hours more efficiently.

## Features

### Student View
- 🍔 **Live Menu Browsing** - Browse available items with search and category filters
- 🛒 **Pre-ordering System** - Order food with pickup time selection
- 🎫 **Order Tracking** - Track order status with unique tokens
- 👥 **Group Ordering** - Order together with friends
- 💬 **Rush Hour Chatbot** - Check live canteen rush hour updates
- 📝 **Review & Complaint System** - Submit food quality reviews, food poisoning reports, and harassment complaints

### Canteen Management View
- 📋 **Priority Queue Management** - Manage orders based on pickup times
- 📊 **Analytics Dashboard** - View daily analytics, peak hours, and popular items
- 🍽️ **Menu Manager** - Add, update, and manage menu items and stock
- ⚠️ **Complaints Manager** - Handle and resolve student complaints with status tracking

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks

## Prerequisites

Before you begin, ensure you have the following installed on your Windows machine:

1. **Node.js** (version 18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (version 9.0.0 or higher)
   - Comes with Node.js
   - Verify installation: `npm --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

## Installation Instructions for Windows

### Step 1: Clone or Download the Project

If you have Git installed:
```bash
git clone <repository-url>
cd foodie-canteen-system
```

Or download the ZIP file and extract it to your desired location.

### Step 2: Open Command Prompt or PowerShell

1. Press `Win + R`
2. Type `cmd` or `powershell` and press Enter
3. Navigate to your project folder:
   ```bash
   cd path\to\foodie-canteen-system
   ```

### Step 3: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will download and install all dependencies listed in `package.json`. The installation may take 3-5 minutes depending on your internet connection.

### Step 4: Run the Development Server

After installation is complete, start the development server:

```bash
npm run dev
```

The application should automatically open in your default browser at `http://localhost:3000`

If it doesn't open automatically, manually open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode with hot-reload enabled.

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run preview`
Preview the production build locally.

### `npm run lint`
Run ESLint to check for code quality issues.

### `npm run type-check`
Run TypeScript compiler to check for type errors.

## Project Structure

```
foodie-canteen-system/
├── components/
│   ├── canteen/
│   │   ├── Analytics.tsx
│   │   ├── ComplaintsManager.tsx
│   │   ├── MenuManager.tsx
│   │   └── OrderQueue.tsx
│   ├── student/
│   │   ├── MenuBrowser.tsx
│   │   ├── MyOrders.tsx
│   │   ├── OrderCart.tsx
│   │   ├── ReviewComplaint.tsx
│   │   └── RushHourChatbot.tsx
│   ├── ui/
│   │   └── [shadcn/ui components]
│   ├── CanteenView.tsx
│   ├── LandingPage.tsx
│   └── StudentView.tsx
├── data/
│   └── mockData.ts
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Troubleshooting

### Issue: `npm install` fails with permission errors
**Solution**: Run Command Prompt or PowerShell as Administrator
- Right-click on Command Prompt/PowerShell
- Select "Run as Administrator"
- Navigate to project folder and run `npm install` again

### Issue: Port 3000 is already in use
**Solution**: Either:
1. Stop the application using port 3000, or
2. Change the port in `vite.config.ts`:
   ```typescript
   server: {
     port: 3001, // Change to any available port
     open: true,
   }
   ```

### Issue: Module not found errors
**Solution**: 
1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` again
3. Restart the development server

### Issue: Hot-reload not working
**Solution**:
1. Stop the dev server (Ctrl + C)
2. Clear npm cache: `npm cache clean --force`
3. Run `npm run dev` again

### Issue: TypeScript errors
**Solution**:
1. Ensure all dependencies are installed correctly
2. Run `npm run type-check` to see detailed errors
3. Check that TypeScript version is compatible (5.7.2+)

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` folder. You can deploy these files to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

To preview the production build locally:

```bash
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features in Detail

### Student Features

1. **Menu Browsing**
   - Search functionality
   - Category-based filtering
   - Real-time stock availability
   - Item details with images

2. **Order Management**
   - Add items to cart
   - Select pickup time
   - Place individual or group orders
   - Track order status (Pending → Preparing → Ready → Completed)

3. **Rush Hour Chatbot**
   - Floating chatbot icon for quick access
   - Live canteen rush status
   - Wait time estimates
   - Best time recommendations

4. **Review & Complaints**
   - Food quality reviews
   - Food poisoning reports with medical proof uploads
   - Harassment complaints (student or staff)
   - Image/document evidence support
   - Order token linking

### Canteen Management Features

1. **Order Queue**
   - Priority-based order management
   - Status updates (Pending, Preparing, Ready, Completed)
   - Order details with customer information
   - Pickup time tracking

2. **Analytics Dashboard**
   - Daily revenue and order statistics
   - Peak hours visualization
   - Popular items tracking
   - Average wait time metrics

3. **Menu Manager**
   - Add new menu items
   - Update prices and stock
   - Toggle item availability
   - Manage preparation times

4. **Complaints Manager**
   - View all complaints with filters
   - Status tracking (Pending, Under Review, Resolved)
   - Priority alerts for urgent issues (food poisoning)
   - Resolution management
   - Image/document viewing

## Color Scheme

The application uses a professional and catchy color scheme:

- **Primary**: Orange-Red gradient (#f97316 to #dc2626)
- **Student View**: Orange tones for warmth and approachability
- **Canteen View**: Purple-Indigo gradient for professionalism
- **Success States**: Green shades
- **Warning States**: Yellow/Amber shades
- **Error States**: Red shades

## Performance Optimization

- Lazy loading of components
- Optimized images from Unsplash
- Efficient state management with React hooks
- Minimal re-renders
- Tree-shaking for smaller bundle sizes

## Security Considerations

- Input validation on all forms
- XSS protection through React's built-in escaping
- Type safety with TypeScript
- No sensitive data stored in localStorage

## Future Enhancements

- Real-time notifications using WebSockets
- Payment integration
- QR code generation for order tokens
- Mobile app (React Native)
- Push notifications
- Email notifications
- Multi-language support
- Dark mode theme

## Contributing

This project is currently in active development. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

## Acknowledgments

- UI Components: Radix UI & shadcn/ui
- Icons: Lucide React
- Images: Unsplash
- Charts: Recharts

---

**Made with ❤️ for Campus Communities**
