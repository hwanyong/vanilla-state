# Vanilla State

🚀 A lightweight, proxy-based state management solution in vanilla JavaScript with zero dependencies. Perfect for modern web applications looking for a simple yet powerful state management solution.

[English](README.md) | [한국어](README.ko.md)

[![npm version](https://badge.fury.io/js/vanilla-state.svg)](https://badge.fury.io/js/vanilla-state)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🪶 Lightweight (less than 1KB minified + gzipped)
- 🚫 Zero dependencies
- 🎯 Simple and intuitive API
- 🔄 Proxy-based reactivity
- 📦 Multiple distribution formats (ESM, UMD, CommonJS)
- 🌐 Works in all modern browsers
- ⚡ High performance
- 🛡️ TypeScript friendly

## Installation

### 1. NPM
```bash
npm install vanilla-state
```

```javascript
import VnlState from 'vanilla-state';
```

### 2. CDN
```html
<!-- Modern browsers (recommended) -->
<script type="module">
  import VnlState from 'https://unpkg.com/vanilla-state/dist/vanilla-state.esm.js';
</script>

<!-- Traditional script tag -->
<script src="https://unpkg.com/vanilla-state"></script>
```

### 3. Direct Download
Download from the `dist` folder:
- `vanilla-state.min.js` - Minified UMD build (browsers)
- `vanilla-state.esm.js` - ES Module build
- `vanilla-state.cjs.js` - CommonJS build

## Usage

### Basic Usage
```javascript
const state = new VnlState();

// Set initial state
state.count = 0;

// Add listener
state.addEventListener('count', (newValue) => {
  console.log('Count changed to:', newValue);
});

// Update state (triggers listener)
state.count = 1; // Console: "Count changed to: 1"
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
