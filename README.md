# Vanilla State

🚀 A lightweight, proxy-based state management solution in vanilla JavaScript/TypeScript with zero dependencies. Perfect for modern web applications looking for a simple yet powerful state management solution.

[English](README.md) | [한국어](README.ko.md)

[![npm version](https://badge.fury.io/js/@uhd_kr/vanilla-state.svg)](https://badge.fury.io/js/@uhd_kr/vanilla-state)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚨 Important: v3.0.0 Breaking Changes

Version 3.0.0 includes significant API improvements that require migration:

- **New Event Listener API**: Changed from `(e) => e.detail` format to direct `(value, originalEvent)` format
- **Enhanced Primitive Value Support**: Direct initialization and arithmetic operations
- **Custom Event System**: New `emit()` method for custom events

See the [Migration Guide](docs/MIGRATION.md) for detailed instructions on updating from v2.x to v3.0.0.

## Features

- 🚀 Lightweight and Zero Dependencies
- 🔄 Proxy-based Reactivity
- 📦 TypeScript Support
- 🎯 Event-based State Updates
- 💡 Simple and Intuitive API
- 📱 Browser and Node.js Support

## Installation

### 1. NPM
```bash
npm install @uhd_kr/vanilla-state
# or
yarn add @uhd_kr/vanilla-state
# or
pnpm add @uhd_kr/vanilla-state
```

```javascript
import VnlState from '@uhd_kr/vanilla-state';
```

### 2. CDN
```html
<!-- Modern browsers (recommended) -->
<script type="module">
  import VnlState from 'https://unpkg.com/@uhd_kr/vanilla-state/dist/vanilla-state.esm.js';
</script>

<!-- Traditional script tag -->
<script src="https://unpkg.com/@uhd_kr/vanilla-state"></script>
```

### 3. Direct Download
Download from the `dist` folder:
- `vanilla-state.min.js` - Minified UMD build (browsers)
- `vanilla-state.esm.js` - ES Module build
- `vanilla-state.cjs.js` - CommonJS build

## Usage

### JavaScript

```javascript
import VnlState from '@uhd_kr/vanilla-state';

// Object state management
const state = new VnlState({
  name: 'Vanilla State',
  version: '3.0.0'
});

// Add state listener - new v3.0.0 API
state.addEventListener('change', (changeInfo) => {
  console.log(`${changeInfo.property} changed to: ${changeInfo.value}`);
});

// Update state
state.name = 'Updated Name'; // Triggers change event

// Primitive state management - new in v3.0.0
const count = new VnlState(0);

count.addEventListener('change', (value) => {
  console.log('Count changed to:', value);
});

// Update primitive state
count.set(count + 1); // Triggers change event
```

### TypeScript

```typescript
import VnlState from '@uhd_kr/vanilla-state';

// Type-safe event listener with v3.0.0 API
const count = new VnlState(0);

count.addEventListener<number>('change', (value) => {
  console.log('Count changed to:', value.toFixed(0));
});

count.set(count + 1); // Triggers event with number value
```

### Advanced Usage

#### Silent Updates
Update state without triggering listeners:
```javascript
state.setWithoutNotify('count', 2);
```

#### Batch Updates
Group multiple state updates and trigger listeners only once at the end:
```javascript
state.batch((s) => {
  s.count = 1;
  s.loading = true;
  s.user.name = "John";
  s.user.role = "Admin";
});
// All listeners will be notified only once after all updates are complete
```

#### Custom Events (New in v3.0.0)
```javascript
// Emit a custom event
state.emit('save-completed', { success: true, timestamp: Date.now() });

// Listen for custom events
state.addEventListener('save-completed', (result) => {
  if (result.success) {
    showNotification('Save completed successfully!');
  }
});
```

#### Multiple Listeners
```javascript
// Add multiple listeners
state.addEventListener('count', value => console.log('Listener 1:', value));
state.addEventListener('count', value => console.log('Listener 2:', value));

// Remove specific listener
const listener = value => console.log('Removable:', value);
state.addEventListener('count', listener);
state.removeEventListener('count', listener);
```

#### Object Properties
```javascript
// Objects are supported
state.user = { name: 'John', age: 25 };
state.addEventListener('user', user => {
  console.log('User updated:', user);
});

// Update object
state.user = { ...state.user, age: 26 };
```

## Development

### Prerequisites
- Node.js >= 14
- pnpm (recommended) or npm

### Setup
```bash
# Clone the repository
git clone https://github.com/hwanyong/vanilla-state.git

# Install dependencies
pnpm install

# Build the package
pnpm build
```

### Scripts
- `pnpm build`: Build the package
- `pnpm typecheck`: Run TypeScript type checking
- `pnpm format`: Format code with Prettier
- `pnpm changeset`: Create a new changeset
- `pnpm release`: Publish to npm

For more detailed development guidelines, see our [Contributing Guide](CONTRIBUTING.md).

## Documentation

- [Migration Guide](docs/MIGRATION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Changelog](docs/CHANGELOG.md)

## Best Practices

1. **Listener Cleanup**: Always remove listeners when they're no longer needed to prevent memory leaks.

2. **Immutable Updates**: When updating objects or arrays, create new references:
```javascript
// Good
state.items = [...state.items, newItem];

// Bad
state.items.push(newItem); // Won't trigger listeners
```

3. **Silent Updates**: Use `setWithoutNotify` when batching multiple updates:
```javascript
state.setWithoutNotify('loading', true);
state.setWithoutNotify('data', newData);
state.loading = false; // Only this update triggers listeners
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Node.js 14+

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Add tests if applicable
5. Create a changeset (`pnpm changeset`)
6. Submit a pull request

For more information about deploying new versions, see our [Deployment Guide](docs/DEPLOYMENT.md).

## License

MIT © [Hwanyong Yoo(UHD)](https://github.com/hwanyong)
