# Architecture Documentation

Comprehensive architecture overview of QRStudio.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Screens    │  │  Components  │  │  Navigation  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Business Logic Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Services    │  │    Stores    │  │    Hooks     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ WatermelonDB │  │     RNFS     │  │     IAP      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Offline-First Architecture

```
User Action → Store Update → Database Write → UI Update
     ↓
Local Storage (SQLite)
     ↓
Export/Share (when requested)
```

### State Management Flow

```
Component → Store Selector → Zustand Store → Immer Update → Re-render
                                   ↓
                            Database Sync
```

## Core Patterns

### 1. Presentation Components

**Pattern**: Smart/Dumb Components

```typescript
// Screen (Smart Component)
export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {codes, getFilteredCodes} = useCodeStore();
  const recentCodes = getFilteredCodes().slice(0, 6);

  return <CodeList codes={recentCodes} />;
};

// Component (Dumb Component)
export const CodeList: React.FC<{codes: QRCode[]}> = ({codes}) => {
  return codes.map(code => <CodeCard key={code.id} code={code} />);
};
```

### 2. State Management

**Pattern**: Domain-Driven Stores

```typescript
// Store per domain
useCodeStore() // Code CRUD operations
useFolderStore() // Folder management
useSettingsStore() // App settings
useUIStore() // UI state
```

### 3. Data Persistence

**Pattern**: Repository Pattern

```typescript
// Database layer abstraction
class CodeRepository {
  async create(code: QRCode): Promise<QRCode> {...}
  async update(id: string, updates: Partial<QRCode>): Promise<void> {...}
  async delete(id: string): Promise<void> {...}
  async findById(id: string): Promise<QRCode | null> {...}
}
```

### 4. Service Layer

**Pattern**: Service Objects

```typescript
// Business logic encapsulation
class QRService {
  generateQRCode(data: string, options: Options): Promise<string> {...}
  validateCodeData(data: string, type: CodeType): boolean {...}
}
```

## Animation Architecture

### Reanimated Worklets

Worklets run on UI thread for 60fps performance:

```typescript
const onPressScaleSpring = (scale: SharedValue<number>) => {
  'worklet';
  scale.value = withSpring(0.96, {stiffness: 240, damping: 18});
};
```

### Gesture Handling

```typescript
const panGesture = Gesture.Pan()
  .onUpdate(e => {
    translateX.value = e.translationX;
  })
  .onEnd(e => {
    if (Math.abs(e.translationX) > THRESHOLD) {
      runOnJS(onDismiss)();
    }
  });
```

## Database Schema

### WatermelonDB Models

```typescript
// Code Model
@table('codes')
class Code extends Model {
  @field('type') type: CodeType;
  @field('data') data: string;
  @field('title') title?: string;
  @json('tags', tags => tags || []) tags: string[];
  @relation('folders', 'folder_id') folder?: Relation<Folder>;
}
```

### Schema Migrations

```typescript
schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'codes',
          columns: [{name: 'new_field', type: 'string'}],
        }),
      ],
    },
  ],
});
```

## Performance Optimizations

### 1. Lazy Loading

```typescript
// Lazy load screens
const EditorScreen = lazy(() => import('./screens/EditorScreen'));
```

### 2. Memoization

```typescript
// Memoize expensive computations
const filteredCodes = useMemo(
  () => codes.filter(c => c.data.includes(query)),
  [codes, query]
);
```

### 3. List Virtualization

```typescript
// FlatList with optimization props
<FlatList
  data={codes}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews
/>
```

### 4. Image Optimization

```typescript
// Lazy load images
<Image source={{uri: code.logo}} resizeMode="contain" />
```

## Security Architecture

### 1. Data Encryption

- SQLite database encrypted with SQLCipher (optional)
- Keychain/Keystore for sensitive data

### 2. Code Obfuscation

- ProGuard for Android
- Release builds stripped of debug info

### 3. Secure Storage

```typescript
// Store IAP receipts securely
import * as Keychain from 'react-native-keychain';

await Keychain.setGenericPassword('iap', JSON.stringify(receipt));
```

## Testing Strategy

### 1. Unit Tests

Test business logic in isolation:

```typescript
describe('QRService', () => {
  it('should validate QR data', () => {
    expect(qrService.validateCodeData('test', 'QR').success).toBe(true);
  });
});
```

### 2. Integration Tests

Test store + database integration:

```typescript
describe('CodeStore', () => {
  it('should persist code to database', async () => {
    const code = await codeStore.addCode({...});
    const found = await database.get('codes').find(code.id);
    expect(found).toBeDefined();
  });
});
```

### 3. E2E Tests

Test critical user journeys:

```typescript
it('should create and export code', async () => {
  await element(by.text('New QR Code')).tap();
  await element(by.id('data-input')).typeText('test');
  await element(by.text('Create')).tap();
  await expect(element(by.text('test'))).toBeVisible();
});
```

## Error Handling

### Error Boundary

```typescript
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, errorInfo);
    showErrorScreen();
  }
}
```

### Service Error Handling

```typescript
async function generateQR(data: string): Promise<ServiceResponse<string>> {
  try {
    const result = await nativeQRGenerator(data);
    return {success: true, data: result};
  } catch (error) {
    return {success: false, error: error as Error};
  }
}
```

## Accessibility

### Screen Reader Support

```typescript
<Button
  accessible
  accessibilityLabel="Create QR Code"
  accessibilityHint="Opens editor to create a new QR code"
  accessibilityRole="button"
/>
```

### Dynamic Type

```typescript
const {multiplier} = useDynamicType();
const fontSize = typography.body1.fontSize * multiplier;
```

## Internationalization (Future)

### i18n Structure

```typescript
// Prepare for future localization
const translations = {
  en: {
    home: {
      title: 'QR Studio',
      createButton: 'New QR Code',
    },
  },
};
```

## Monitoring & Analytics

### Crash Reporting

```typescript
// React Native Firebase Crashlytics (future)
import crashlytics from '@react-native-firebase/crashlytics';

crashlytics().log('User performed action');
crashlytics().recordError(new Error('Test error'));
```

### Performance Monitoring

```typescript
// Performance marks
performance.mark('qr-generation-start');
await generateQR(data);
performance.mark('qr-generation-end');
performance.measure('qr-generation', 'qr-generation-start', 'qr-generation-end');
```

## Build Optimization

### Hermes Engine

Enabled for both iOS and Android:
- Smaller app size
- Faster startup time
- Reduced memory usage

### Code Splitting

```typescript
// Split large dependencies
const QRCodeGenerator = lazy(() => import('./QRCodeGenerator'));
```

### Bundle Analysis

```bash
# Analyze bundle size
npx react-native-bundle-visualizer
```

## Deployment Architecture

### CI/CD Pipeline

```
GitHub Push → Run Tests → Build Apps → Deploy to TestFlight/PlayStore
```

### Environment Configuration

```typescript
// Environment-specific configs
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
  },
  production: {
    apiUrl: 'https://api.qrstudio.app',
  },
};
```

---

For questions, contact: architecture@qrstudio.app
