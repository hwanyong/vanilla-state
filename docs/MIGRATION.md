# Migration Guide

This document provides guidance for migrating from JavaScript to TypeScript versions of vanilla-state.

## Version Changes

- From: v1.0.1 (JavaScript)
- To: v1.1.0 (TypeScript)

## Changes Overview

1. Full TypeScript support added
2. Type definitions for better IDE support
3. No breaking changes in functionality
4. Added ESM, CommonJS, and UMD bundle support

## Migration Steps by Usage Type

### 1. NPM/Yarn/PNPM Users

#### JavaScript Projects
No changes required. Continue using as before:
```javascript
import VnlState from '@uhd_kr/vanilla-state';
```

#### TypeScript Projects
You now get full type support:
```typescript
import VnlState from '@uhd_kr/vanilla-state';

const state = new VnlState();
state.addEventListener<string>('name', (value) => {
    console.log(value.toLowerCase()); // Type-safe!
});
```

### 2. CDN Users

#### Using Latest Version
No changes required:
```html
<script src="https://unpkg.com/@uhd_kr/vanilla-state"></script>
```

#### Using Specific Version
If you need to use a specific version:
```html
<!-- JavaScript version -->
<script src="https://unpkg.com/@uhd_kr/vanilla-state@1.0.1"></script>

<!-- TypeScript version -->
<script src="https://unpkg.com/@uhd_kr/vanilla-state@1.1.0"></script>
```

### 3. Direct File Import Users

The bundle paths have been standardized:

- ESM: `dist/vanilla-state.esm.js`
- CommonJS: `dist/vanilla-state.cjs.js`
- UMD (minified): `dist/vanilla-state.min.js`
- TypeScript types: `dist/types/vanilla-state.d.ts`

## Type System

### Key Types

```typescript
type Listener<T> = (value: T) => void;

class VnlState {
    addEventListener<T>(prop: string, callback: Listener<T>): void;
    removeEventListener<T>(prop: string, callback: Listener<T>): void;
    setWithoutNotify<T>(prop: string, value: T): void;
}
```

### Generic Type Usage

```typescript
const state = new VnlState();

// Type-safe state management
state.addEventListener<string>('name', (value) => {
    console.log(value.toLowerCase());
});

state.addEventListener<number>('age', (value) => {
    console.log(value.toFixed(0));
});
```

## Troubleshooting

### Common Issues

1. Type Errors in TypeScript Projects
   ```typescript
   // Before (might cause type errors)
   state.addEventListener('count', (value) => value + 1);

   // After (type-safe)
   state.addEventListener<number>('count', (value) => value + 1);
   ```

2. Module Resolution Issues
   If you encounter module resolution issues, make sure your `tsconfig.json` includes:
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "bundler"
     }
   }
   ```

## Support

If you encounter any issues during migration, please:
1. Check this migration guide
2. Review the [README.md](../README.md)
3. Open an issue on our [GitHub repository](https://github.com/hwanyong/vanilla-state/issues)