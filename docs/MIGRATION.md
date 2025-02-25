# Migration Guide

This document provides guidance for migrating from JavaScript to TypeScript versions of vanilla-state.

## Version Changes

- From: v1.1.0 (JavaScript with basic TypeScript support)
- To: v2.0.0 (Full TypeScript migration)

## Changes Overview

1. Complete TypeScript migration
2. Enhanced type definitions
3. Backwards compatibility maintained
4. ESM, CommonJS, and UMD bundle support

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
<script src="https://unpkg.com/@uhd_kr/vanilla-state@1.1.0"></script>

<!-- Full TypeScript version -->
<script src="https://unpkg.com/@uhd_kr/vanilla-state@2.0.0"></script>
```

### 3. Direct File Import Users

The bundle paths remain standardized:

- ESM: `dist/vanilla-state.esm.js`
- CommonJS: `dist/vanilla-state.cjs.js`
- UMD (minified): `dist/vanilla-state.min.js`
- TypeScript types: `dist/types/vanilla-state.d.ts`

## Type System

### Key Types

```typescript
type Listener<T> = (value: T) => void;

interface VnlState {
  addEventListener<T>(prop: string, callback: Listener<T>): void;
  removeEventListener<T>(prop: string, callback: Listener<T>): void;
  setWithoutNotify<T>(prop: string, value: T): void;
}
```

### Generic Type Usage

```typescript
const state = new VnlState();

// Type-safe state management
interface User {
  name: string;
  age: number;
}

state.addEventListener<User>('user', (user) => {
  console.log(user.name.toUpperCase());
  console.log(user.age.toFixed(0));
});

// Property-specific listeners
state.addEventListener<string>('user.name', (name) => {
  console.log(name.toLowerCase());
});

state.addEventListener<number>('user.age', (age) => {
  console.log(age.toFixed(0));
});
```

## Troubleshooting

### Common Issues

1. Type Inference Issues
   ```typescript
   // Before (might have type inference issues)
   state.addEventListener('count', (value) => value + 1);

   // After (explicit type parameter)
   state.addEventListener<number>('count', (value) => value + 1);
   ```

2. Module Resolution Issues
   If you encounter module resolution issues, update your `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "bundler",
       "target": "ES2020",
       "module": "ESNext"
     }
   }
   ```

3. IDE Integration
   For better IDE support, make sure your project includes:
   ```json
   {
     "compilerOptions": {
       "skipLibCheck": true,
       "esModuleInterop": true
     }
   }
   ```

## Support

If you encounter any issues during migration:
1. Check this migration guide
2. Review the [README.md](../README.md)
3. Review the [CHANGELOG.md](../docs/CHANGELOG.md)
4. Open an issue on our [GitHub repository](https://github.com/hwanyong/vanilla-state/issues)