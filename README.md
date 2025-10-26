# QR Studio - Offline QR & Barcode Generator

> Production-ready React Native application for generating and managing QR codes and barcodes entirely offline.

[![CI/CD](https://github.com/qrstudio/qrstudio/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/qrstudio/qrstudio/actions)
[![Coverage](https://codecov.io/gh/qrstudio/qrstudio/branch/main/graph/badge.svg)](https://codecov.io/gh/qrstudio/qrstudio)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features

### Core Functionality
- ✅ **Offline-First**: Works entirely without network connectivity
- ✅ **Multi-Format Support**: QR, EAN-13, EAN-8, UPC, Code 128, Code 39, ITF-14, MSI, Pharmacode
- ✅ **Gesture-First UX**: Physics-based animations with Reanimated 3
- ✅ **Beautiful UI**: Skia-powered visual effects and smooth 60fps animations
- ✅ **Accessibility**: Full VoiceOver support, Dynamic Type, and semantic labels
- ✅ **Dark Mode**: Automatic theme switching with manual override

### Advanced Features
- 📤 **Multi-Format Export**: PNG, SVG, PDF, JSON, Markdown
- 📦 **Batch Operations**: Create and export multiple codes at once
- 🗂️ **Smart Organization**: Folders, tags, favorites, and search
- 💎 **In-App Purchases**: Pro unlock with additional features
- 🔔 **Local Notifications**: Scheduled reminders
- 📊 **Usage Analytics**: Track code usage offline

## Tech Stack

### Core
- **React Native** 0.75+ with New Architecture (Fabric/TurboModules)
- **TypeScript** 5.6+ for type safety
- **Hermes** engine for optimized performance

### UI & Animation
- **React Navigation** 6.x for navigation
- **Reanimated** 3.x for 60fps animations
- **Gesture Handler** 2.x for touch interactions
- **Skia** for advanced rendering and effects

### State & Data
- **Zustand** 4.x for state management
- **WatermelonDB** for offline-first SQLite database
- **RNFS** for file system operations

### Advanced
- **react-native-iap** for In-App Purchases
- **react-native-push-notification** for local notifications
- **react-native-svg** for vector graphics
- **react-native-share** for native sharing

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Xcode 15+ (for iOS)
- Android Studio (for Android)
- CocoaPods 1.12+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/qrstudio/qrstudio.git
   cd qrstudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS pods**
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Start Metro Bundler
```bash
npm start
```

## Project Structure

```
qrstudio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── animations/      # Animated components
│   │   ├── qr/             # QR-specific components
│   │   └── ui/             # General UI components
│   ├── screens/            # Screen components
│   ├── navigation/         # Navigation configuration
│   ├── store/              # Zustand stores
│   ├── database/           # WatermelonDB models & schema
│   ├── services/           # Business logic services
│   ├── hooks/              # Custom React hooks
│   ├── theme/              # Design system (colors, typography, etc.)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── App.tsx             # Root component
├── __tests__/              # Unit & integration tests
├── e2e/                    # End-to-end tests (Detox)
├── ios/                    # iOS native code
├── android/                # Android native code
└── docs/                   # Additional documentation
```

## Development

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run typecheck

# Format code
npm run format
```

### Testing

```bash
# Unit tests
npm test

# Test with coverage
npm run test:coverage

# E2E tests (iOS)
npm run test:e2e:build:ios
npm run test:e2e -- --configuration ios.sim.debug

# E2E tests (Android)
npm run test:e2e:build:android
npm run test:e2e -- --configuration android.emu.debug
```

### Performance

The app meets the following performance budgets:
- ✅ 60fps animations (Reanimated on UI thread)
- ✅ <100ms interaction response time
- ✅ <2s app launch time
- ✅ <50MB memory usage for typical workload

## Building for Production

### iOS

1. **Configure signing**
   - Open `ios/QRStudio.xcworkspace` in Xcode
   - Select your team and provisioning profile

2. **Build archive**
   ```bash
   npm run build:ios:release
   ```

3. **Upload to App Store**
   - Use Xcode or `fastlane` for automated deployment

### Android

1. **Generate signing key**
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias qrstudio -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure gradle**
   - Add signing config to `android/app/build.gradle`

3. **Build APK/AAB**
   ```bash
   npm run build:android:release
   ```

4. **Upload to Play Store**
   - Use Play Console or `fastlane` for automated deployment

## Architecture

### Offline-First Design

All data is stored locally using WatermelonDB (SQLite):
- **Codes table**: QR/barcode data with metadata
- **Folders table**: Organization structure
- **Purchases table**: IAP transaction records

### State Management

Zustand stores organized by domain:
- `codeStore`: Code CRUD operations and filtering
- `folderStore`: Folder management
- `settingsStore`: App preferences
- `uiStore`: UI state (modals, toasts, loading)

### Animation Architecture

Reanimated worklets run on UI thread for 60fps:
- `onPressScaleSpring`: Button press feedback
- `onFocusTransition`: Input focus animations
- `onDismissSwipe`: Swipe-to-dismiss gestures
- `onRevealFling`: Pull-to-reveal interactions

## Component Catalog

The app includes 70+ production-ready components (Components 1.1-1.70), each with:
- Gesture handlers (tap, pan, pinch, fling, etc.)
- Reanimated worklets for smooth animations
- Skia effects (shadows, gradients, path morphs)
- Full accessibility support
- Comprehensive prop validation

See `/docs/COMPONENTS.md` for detailed component documentation.

## Accessibility

- ✅ VoiceOver/TalkBack support on all interactive elements
- ✅ Dynamic Type with 7 size categories
- ✅ Semantic labels and hints
- ✅ Focus management for keyboard navigation
- ✅ WCAG AA contrast ratios
- ✅ Large hit targets (minimum 44x44pt)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build process or auxiliary tool changes

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@qrstudio.app
- 🐛 Issues: [GitHub Issues](https://github.com/qrstudio/qrstudio/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/qrstudio/qrstudio/discussions)

## Acknowledgments

- Built with [React Native](https://reactnative.dev/)
- Animations powered by [Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- Graphics by [Skia](https://shopify.github.io/react-native-skia/)
- State management with [Zustand](https://zustand-demo.pmnd.rs/)
- Database by [WatermelonDB](https://nozbe.github.io/WatermelonDB/)

---

Made with ❤️ by the QR Studio team
