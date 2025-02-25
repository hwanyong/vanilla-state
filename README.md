# Vanilla State

🚀 A lightweight, proxy-based state management solution in vanilla JavaScript/TypeScript with zero dependencies. Perfect for modern web applications looking for a simple yet powerful state management solution.

[English](README.md) | [한국어](README.ko.md)

[![npm version](https://badge.fury.io/js/@uhd_kr/vanilla-state.svg)](https://badge.fury.io/js/@uhd_kr/vanilla-state)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

const state = new VnlState();

// Add state listener
state.addEventListener('count', (value) => {
  console.log('Count changed:', value);
});

// Update state
state.count = 1; // logs: Count changed: 1
```

### TypeScript

```typescript
import VnlState from '@uhd_kr/vanilla-state';

const state = new VnlState();

// Type-safe event listener
state.addEventListener<number>('count', (value) => {
  console.log('Count changed:', value.toFixed(0));
});

state.count = 1; // logs: Count changed: 1
```

### Advanced Usage

#### Silent Updates
Update state without triggering listeners:
```javascript
state.setWithoutNotify('count', 2);
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

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Hwanyong Yoo(UHD)](https://github.com/hwanyong)
