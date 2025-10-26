# Deployment Guide

Complete guide for deploying QRStudio to production.

## Pre-Deployment Checklist

- [ ] All tests passing (unit, integration, E2E)
- [ ] Code coverage >80%
- [ ] Performance budgets met
- [ ] Accessibility audit passed
- [ ] Security audit completed
- [ ] App Store assets prepared
- [ ] Privacy policy updated
- [ ] Terms of service updated

## iOS Deployment

### 1. App Store Connect Setup

1. Create app record in App Store Connect
2. Configure app information:
   - Bundle ID: `com.qrstudio`
   - SKU: `qrstudio-ios`
   - Primary language: English

3. Set up IAP products:
   - Pro Unlock: `com.qrstudio.pro`
   - Premium Pack 1: `com.qrstudio.premium.pack1`
   - Premium Pack 2: `com.qrstudio.premium.pack2`

### 2. Code Signing

1. Create distribution certificate:
   ```bash
   # In Xcode, go to Signing & Capabilities
   # Select your team
   # Xcode will automatically manage certificates
   ```

2. Create provisioning profile:
   - Distribution profile for App Store
   - Enable capabilities: In-App Purchase, Push Notifications

### 3. Build & Archive

1. Increment version:
   ```bash
   # Update in ios/QRStudio/Info.plist
   CFBundleShortVersionString: 1.0.0
   CFBundleVersion: 1
   ```

2. Build archive:
   ```bash
   npm run build:ios:release
   ```

3. Validate archive:
   - Open Xcode Organizer
   - Select archive
   - Click "Validate App"

4. Upload to App Store Connect:
   - Click "Distribute App"
   - Select "App Store Connect"
   - Upload archive

### 4. TestFlight

1. Add testers in App Store Connect
2. Submit build for TestFlight review
3. Distribute to internal testers
4. Collect feedback

### 5. App Review

1. Complete app information:
   - Screenshots (6.5", 6.7", 12.9" iPad)
   - Description
   - Keywords
   - Support URL
   - Marketing URL

2. Submit for review:
   - Review information
   - Demo account (if needed)
   - Notes for reviewer

## Android Deployment

### 1. Play Console Setup

1. Create app in Play Console
2. Configure app information:
   - Application ID: `com.qrstudio`
   - Default language: English

3. Set up IAP products:
   - Pro Unlock: `com.qrstudio.pro`
   - Premium Pack 1: `com.qrstudio.premium.pack1`
   - Premium Pack 2: `com.qrstudio.premium.pack2`

### 2. Generate Signing Key

```bash
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore release.keystore \
  -alias qrstudio \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Store keystore securely and never commit to version control.

### 3. Configure Gradle

Add to `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=release.keystore
MYAPP_RELEASE_KEY_ALIAS=qrstudio
MYAPP_RELEASE_STORE_PASSWORD=***
MYAPP_RELEASE_KEY_PASSWORD=***
```

Update `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### 4. Build Release

1. Increment version:
   ```gradle
   // In android/app/build.gradle
   versionCode 1
   versionName "1.0.0"
   ```

2. Build AAB:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

3. Build APK (optional):
   ```bash
   ./gradlew assembleRelease
   ```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### 5. Internal Testing

1. Upload AAB to Play Console
2. Create internal testing track
3. Add testers
4. Distribute build

### 6. Production Release

1. Complete store listing:
   - Screenshots (phone, tablet, 10" tablet)
   - Feature graphic
   - Description
   - Short description
   - App icon

2. Content rating questionnaire

3. Pricing & distribution

4. Submit for review

## Continuous Deployment

### Using Fastlane (Recommended)

Install Fastlane:
```bash
gem install fastlane
```

iOS Fastfile:
```ruby
platform :ios do
  lane :beta do
    increment_build_number
    build_app(scheme: "QRStudio")
    upload_to_testflight
  end

  lane :release do
    increment_build_number
    build_app(scheme: "QRStudio")
    upload_to_app_store
  end
end
```

Android Fastfile:
```ruby
platform :android do
  lane :beta do
    gradle(task: "bundleRelease")
    upload_to_play_store(track: "internal")
  end

  lane :release do
    gradle(task: "bundleRelease")
    upload_to_play_store
  end
end
```

### GitHub Actions

CI/CD pipeline configured in `.github/workflows/ci.yml`:
- Automatic builds on push
- Run tests
- Deploy to TestFlight/Play Console on tag

Create release:
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## Post-Deployment

### Monitoring

1. **Crashlytics**: Monitor crashes
2. **Analytics**: Track user behavior
3. **Performance**: Monitor app performance
4. **Reviews**: Respond to user reviews

### Rollback Plan

If critical issues found:

iOS:
1. Stop distribution in App Store Connect
2. Fix issue
3. Submit new build

Android:
1. Halt rollout in Play Console
2. Fix issue
3. Upload new AAB

### Version Management

Follow semantic versioning:
- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features
- **Patch** (1.0.1): Bug fixes

## Security

### API Keys

Never commit:
- Signing keys
- IAP shared secrets
- API keys
- Credentials

Use environment variables or secret management:
```bash
# .env (gitignored)
IAP_SHARED_SECRET=***
ANALYTICS_KEY=***
```

### Code Obfuscation

iOS: Enabled automatically in Release builds

Android: ProGuard configured in `proguard-rules.pro`

### Certificate Pinning

For future API integrations, implement certificate pinning.

## App Store Assets

### Required Screenshots

iOS:
- 6.7" iPhone (1290×2796)
- 6.5" iPhone (1284×2778)
- 5.5" iPhone (1242×2208)
- 12.9" iPad Pro (2048×2732)

Android:
- Phone (1080×1920)
- 7" Tablet (1200×1920)
- 10" Tablet (1600×2560)

### App Icon

- iOS: 1024×1024 (no alpha channel)
- Android: 512×512 (PNG)

### Feature Graphic (Android)

- 1024×500 PNG or JPEG

## Support URLs

- **Privacy Policy**: https://qrstudio.app/privacy
- **Terms of Service**: https://qrstudio.app/terms
- **Support**: https://qrstudio.app/support

## Compliance

- ✅ GDPR compliant (no user data collection)
- ✅ COPPA compliant (offline-first)
- ✅ App Store Guidelines
- ✅ Play Store Policies

---

For questions, contact: devops@qrstudio.app
