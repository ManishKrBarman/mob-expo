# Development Environment Setup 🔧

> Complete guide to setting up your development environment for React Native learning and testing.

## 📋 Prerequisites

### System Requirements
- **Node.js** 18.0 or higher
- **npm** 8.0 or higher (comes with Node.js)
- **Git** for version control
- **Code Editor** (VS Code recommended)

### Platform-Specific Requirements

#### For iOS Development (Mac Only)
- **Xcode** 14+ with iOS Simulator
- **CocoaPods** (installed automatically with React Native)
- **Watchman** (optional but recommended for file watching)

#### For Android Development (All Platforms)
- **Android Studio** with Android SDK
- **Java Development Kit (JDK)** 17
- **Android Emulator** or physical Android device

## 🚀 Quick Setup

### 1. Install Node.js and npm
```bash
# Check current versions
node --version  # Should be 18+
npm --version   # Should be 8+

# If not installed, download from: https://nodejs.org/
```

### 2. Install Expo CLI
```bash
npm install -g @expo/cli
expo --version
```

### 3. Clone and Setup Repository
```bash
git clone https://github.com/ManishKrBarman/mob-expo.git
cd react-native-learning

# Setup playground environment
cd playground/test-app
npm install
```

### 4. Test Installation
```bash
# Start the development server
npm start

# Follow the prompts to:
# - Open iOS Simulator (Mac only)
# - Open Android Emulator 
# - Open in Expo Go app on physical device
```

## 🔧 Detailed Platform Setup

### iOS Setup (Mac Users)

#### Install Xcode
1. Download Xcode from the Mac App Store
2. Open Xcode and accept license agreements
3. Install additional components when prompted

#### Verify iOS Setup
```bash
# Check Xcode installation
xcode-select --print-path

# Should output something like:
# /Applications/Xcode.app/Contents/Developer
```

### Android Setup (All Platforms)

#### Install Android Studio
1. Download Android Studio from https://developer.android.com/studio
2. Follow installation wizard
3. Install Android SDK (API level 33+)
4. Create Android Virtual Device (AVD)

#### Setup Environment Variables
Add to your shell profile (`.bashrc`, `.zshrc`, etc.):
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # Mac
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
export ANDROID_HOME=c:\Users\USERNAME\AppData\Local\Android\Sdk  # Windows

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### Verify Android Setup
```bash
# Check Android SDK
android --version

# List available emulators
emulator -list-avds
```

## 📱 Testing Options

### Option 1: Physical Device (Recommended)
1. Install Expo Go app from App Store/Google Play
2. Scan QR code from `npm start`
3. Instant testing on real device

### Option 2: iOS Simulator (Mac Only)
```bash
cd playground/test-app
npm run ios
```

### Option 3: Android Emulator
```bash
cd playground/test-app
npm run android
```

### Option 4: Web Browser
```bash
cd playground/test-app
npm run web
```

## 🔍 Troubleshooting

### Common Issues and Solutions

#### Node.js Version Issues
```bash
# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 18
nvm install 18
nvm use 18
```

#### iOS Simulator Not Opening
```bash
# Reset iOS Simulator
xcrun simctl erase all

# Open simulator manually
open -a Simulator
```

#### Android Emulator Issues
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator @Pixel_4_API_33

# Kill any stuck processes
adb kill-server
adb start-server
```

#### Port Already in Use
```bash
# Kill process on port 8081
npx kill-port 8081

# Or use different port
npx expo start --port 8082
```

#### Metro Bundler Cache Issues
```bash
# Clear Metro cache
npx expo start --clear

# Or clear npm cache
npm start -- --reset-cache
```

## 🛠️ Development Tools

### Recommended VS Code Extensions
- **React Native Tools** - Microsoft
- **ES7+ React/Redux/React-Native snippets** - dsznajder
- **Auto Rename Tag** - Jun Han
- **Bracket Pair Colorizer** - CoenraadS
- **GitLens** - GitKraken

### Debugging Tools
- **React Native Debugger** - Standalone debugging app
- **Flipper** - Platform for debugging React Native apps
- **Chrome DevTools** - Built-in web debugging

## 📊 Performance Monitoring

### Development Performance
```bash
# Monitor Metro bundler performance
npx expo start --verbose

# Profile bundle size
npx expo export --analyze
```

### Device Performance
- Use Xcode Instruments (iOS)
- Use Android Studio Profiler (Android)
- Monitor FPS and memory usage

## 🔄 Workflow Integration

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-example

# Make changes and test
cp concepts/new-example.tsx playground/test-app/app/index.tsx
npm start  # Test changes

# Commit when working
git add .
git commit -m "Add new example: feature description"
```

### Testing Workflow
```bash
# Quick test any example
cp concepts/section/example.tsx playground/test-app/app/index.tsx

# Development server auto-reloads
# Test on multiple platforms
# Iterate and improve
```

## 📚 Learning Environment Optimization

### Playground Usage
The `playground/test-app` is specifically configured for learning:
- Hot reload for instant feedback
- TypeScript support for better development experience
- Expo managed workflow for cross-platform testing
- All React Native dependencies pre-configured

### Efficient Learning Process
1. **Read Theory** - Start with notes/section
2. **Copy Example** - Copy concepts to playground
3. **Experiment** - Modify and test variations
4. **Understand** - Read comments and documentation
5. **Practice** - Create your own variations

## 🚀 Next Steps

### Environment Verification
```bash
# Run this verification script
cd playground/test-app
npm install
npm start

# You should see:
# ✅ Metro bundler starts successfully
# ✅ QR code appears for device testing
# ✅ Can open on simulator/emulator
# ✅ Hot reload works when editing files
```

### Ready for Learning
Once setup is complete:
1. Start with [React Native Fundamentals](../notes/01-fundamentals.md)
2. Test examples in the playground
3. Progress through the learning path
4. Experiment and build your own examples

---

*A properly configured development environment is essential for effective React Native learning. Take time to set this up correctly—it will save hours of troubleshooting later.*
git clone <your-repo-url>
cd react-native-learning-repository
cd playground/test-app
npm install

# Start testing
npm start
```

## Testing Concepts

1. Copy any concept file to `playground/test-app/app/`
2. Run `npm start` 
3. Scan QR code with Expo Go
4. See your concept running!

That's it! 🎉
