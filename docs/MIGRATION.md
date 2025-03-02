# Migration Guide

This document provides guidance for migrating between versions of vanilla-state.

## Support

If you encounter any issues during migration:
1. Check this migration guide
2. Review the [README.md](../README.md)
3. Review the [CHANGELOG.md](../docs/CHANGELOG.md)
4. Open an issue on our [GitHub repository](https://github.com/hwanyong/vanilla-state/issues)

## Migrating from v3.0.0 to v3.1.0

Version 3.1.0 introduces performance improvements and stability enhancements with no breaking changes.

### Improvements in v3.1.0

1. **Enhanced Primitive State Handling**
   - Better stability for primitive value operations
   - More consistent behavior with arithmetic operations

2. **TypeScript Integration**
   - Enhanced type definitions
   - Better type inference for event listeners

3. **Performance Optimizations**
   - Improved memory usage for large state objects
   - Optimized event dispatch for better performance

### Migration Steps

As v3.1.0 contains no breaking changes, upgrading is straightforward:

```bash
npm install @uhd_kr/vanilla-state@3.1.0
# or
yarn add @uhd_kr/vanilla-state@3.1.0
# or
pnpm add @uhd_kr/vanilla-state@3.1.0
```

### New Debug Features

You can take advantage of the improved debugging:

```javascript
const state = new VnlState({}, { debug: true });
// More detailed debug logs will be available in the console
```

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
<script src="https://unpkg.com/@uhd_kr/vanilla-state@2.1.0"></script>
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

## Migrating from v2.1.0 to v3.0.0

### Major Breaking Changes

1. **Event Listener API Changes**

   The biggest change in v3.0.0 is the event listener callback signature:

   ```typescript
   // v2.x - Using event.detail to access the value
   state.addEventListener('count', (e) => {
     console.log(e.detail); // access value via e.detail
   });

   // v3.0.0 - Value is directly passed as first parameter
   state.addEventListener('count', (value, originalEvent) => {
     console.log(value); // value is directly passed
     console.log(originalEvent); // optional, original CustomEvent object
   });
   ```

   **Migration Steps:**
   - Replace all `e.detail` references with direct parameter usage
   - If you need access to the original event, use the optional second parameter

2. **Primitive Value Handling**

   v3.0.0 has enhanced support for primitive values:

   ```typescript
   // v2.x - Less intuitive primitive handling
   const state = new VnlState();
   state.count = 0;

   // v3.0.0 - Direct primitive initialization
   const count = new VnlState(0);
   count.set(count + 1); // Can perform arithmetic operations directly
   ```

   **Migration Steps:**
   - Consider separating primitive state into dedicated instances
   - Replace direct property access with get()/set() methods for primitives

3. **Custom Event System**

   v3.0.0 introduces a new custom event system:

   ```typescript
   // v3.0.0 only - Custom events
   state.emit('custom-event', { data: 'value' });

   state.addEventListener('custom-event', (data) => {
     console.log(data); // { data: 'value' }
   });
   ```

### Step-by-Step Migration Guide

1. **Update Package**
   ```bash
   npm install @uhd_kr/vanilla-state@3.0.0
   ```

2. **Update Event Listeners**
   ```typescript
   // Find all instances like this:
   state.addEventListener('property', (e) => {
     doSomething(e.detail);
   });

   // Replace with:
   state.addEventListener('property', (value) => {
     doSomething(value);
   });
   ```

3. **Update Primitive State Usage**
   ```typescript
   // Find patterns like:
   const state = new VnlState();
   state.count = 0;
   state.count++;

   // Replace with:
   const count = new VnlState(0);
   count.set(count.get() + 1);
   // or
   count.set(count + 1); // Using valueOf()
   ```

4. **Test Your Implementation**
   - Start with small, isolated components
   - Progressively update your application
   - Use the browser console to verify event behavior

### v3.0.0 Type System

```typescript
// New type definitions
type Listener<T> = (value: T, originalEvent?: CustomEvent<T>) => void;

interface EventOptions {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

interface VnlState {
  addEventListener<T>(eventName: string, callback: Listener<T>): void;
  removeEventListener<T>(eventName: string, callback: Listener<T>): void;
  emit<T>(eventName: string, value?: T, options?: EventOptions): boolean;
  // For primitive states
  set(value: any): void;
  get(): any;
}
```

## Migrating from v1.x to v2.x

### Major Breaking Changes

1. **Event Listener API Changes**

   The biggest change in v2.0.0 is the event listener callback signature:

   ```typescript
   // v1.x - Using event.detail to access the value
   state.addEventListener('count', (e) => {
     console.log(e.detail); // access value via e.detail
   });

   // v2.0.0 - Value is directly passed as first parameter
   state.addEventListener('count', (value, originalEvent) => {
     console.log(value); // value is directly passed
     console.log(originalEvent); // optional, original CustomEvent object
   });
   ```

   **Migration Steps:**
   - Replace all `e.detail` references with direct parameter usage
   - If you need access to the original event, use the optional second parameter

2. **Primitive Value Handling**

   v2.0.0 has enhanced support for primitive values:

   ```typescript
   // v1.x - Less intuitive primitive handling
   const state = new VnlState();
   state.count = 0;

   // v2.0.0 - Direct primitive initialization
   const count = new VnlState(0);
   count.set(count + 1); // Can perform arithmetic operations directly
   ```

   **Migration Steps:**
   - Consider separating primitive state into dedicated instances
   - Replace direct property access with get()/set() methods for primitives

3. **Custom Event System**

   v2.0.0 introduces a new custom event system:

   ```typescript
   // v2.0.0 only - Custom events
   state.emit('custom-event', { data: 'value' });

   state.addEventListener('custom-event', (data) => {
     console.log(data); // { data: 'value' }
   });
   ```

### Step-by-Step Migration Guide

1. **Update Package**
   ```bash
   npm install @uhd_kr/vanilla-state@2.0.0
   ```

2. **Update Event Listeners**
   ```typescript
   // Find all instances like this:
   state.addEventListener('property', (e) => {
     doSomething(e.detail);
   });

   // Replace with:
   state.addEventListener('property', (value) => {
     doSomething(value);
   });
   ```

3. **Update Primitive State Usage**
   ```typescript
   // Find patterns like:
   const state = new VnlState();
   state.count = 0;
   state.count++;

   // Replace with:
   const count = new VnlState(0);
   count.set(count.get() + 1);
   // or
   count.set(count + 1); // Using valueOf()
   ```

4. **Test Your Implementation**
   - Start with small, isolated components
   - Progressively update your application
   - Use the browser console to verify event behavior

### v2.0.0 Type System

```typescript
// New type definitions
type Listener<T> = (value: T, originalEvent?: CustomEvent<T>) => void;

interface EventOptions {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

interface VnlState {
  addEventListener<T>(eventName: string, callback: Listener<T>): void;
  removeEventListener<T>(eventName: string, callback: Listener<T>): void;
  emit<T>(eventName: string, value?: T, options?: EventOptions): boolean;
  // For primitive states
  set(value: any): void;
  get(): any;
}