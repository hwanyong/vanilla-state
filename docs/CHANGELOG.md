# Changelog

## [3.2.0] - 2025-03-10

### Added
- Unified state update API with notification control
- New `set` function that supports optional notification control for both primitive and object states

### Changed
- Deprecated `setWithoutNotify` in favor of the enhanced `set` function
- Improved parameter validation in state update functions
- Enhanced error messages for incorrect API usage

### Migration
```javascript
// Old API - deprecated
state.setWithoutNotify('count', 5);

// New API - preferred
state.set('count', 5, { notify: false }); // Object state
count.set(5, { notify: false }); // Primitive state
```

## [3.1.0] - 2025-03-03

### Added
- Improved stability for primitive state management
- Enhanced typings for better TypeScript integration
- Optimized internal event handling for better performance

### Changed
- Improved documentation with more examples
- Refined debugging capabilities with more detailed debug logs
- Optimized memory usage for large state objects

## [3.0.0] - 2025-03-02

### Breaking Changes

- Completely redesigned event listener API
  - Changed from `(e) => e.detail` format to direct `(value, originalEvent)` format
  - This provides a cleaner, more intuitive API while maintaining access to the original event object when needed
  - Example:
    ```javascript
    // Old v2.x
    state.addEventListener('count', (e) => {
      console.log(e.detail); // access value via e.detail
    });

    // New v3.x
    state.addEventListener('count', (value) => {
      console.log(value); // value is directly passed as first parameter
    });
    ```

- Enhanced primitive value handling
  - Direct constructor initialization with primitive values
  - Full support for arithmetic operations via `valueOf()` implementation
  - Example:
    ```javascript
    const count = new VnlState(0);
    count.set(count + 1); // arithmetic operations supported
    ```

- Added custom event system
  - New `emit()` method for dispatching custom events
  - Full event options support: bubbles, cancelable, composed
  - Example:
    ```javascript
    state.emit('custom-event', { data: 'value' });
    state.addEventListener('custom-event', (data) => {
      console.log(data); // { data: 'value' }
    });
    ```

### Added
- Full TypeScript refinements
- Improved immutable state handling
- Enhanced batch processing system for multiple updates

### Changed
- Consolidated get/getState methods for better consistency
- Improved type safety across the entire codebase
- Optimized internal event handling

## [2.1.0] - 2025-02-28

### Minor Changes

- Added new batch function to group multiple state updates
  - Allows applying multiple state changes while notifying listeners only once
  - Improves performance when making related state changes
  - Example:
    ```javascript
    state.batch((s) => {
      s.count = 1;
      s.info.name = "New name";
      s.info.version = "2.0.0";
      s.info.description = "Updated description";
    });
    ```

## [2.0.1] - 2025-02-25

### Patch Changes

- Update CI/CD workflow with proper GitHub Actions permissions for automated releases

## [2.0.0] - 2025-02-25

### Added
- Project migration from JavaScript to TypeScript
- Type definitions added to all core functions
- Added support for ESM, CommonJS, and UMD bundles
- Added automated deployment through GitHub Actions
- Added deployment and migration guide documentation

### Changed
- Restructured project to support TypeScript
- Updated build system to process TypeScript
- Improved and cleaned up package.json scripts
- Enhanced README files with Korean translation

### No Breaking Changes
- Maintained backward compatibility for existing JavaScript users
- Ensured feature compatibility for v1.1.0 users
- No changes required for JavaScript users

## [1.1.0] - 2025-02-16

### Added
- Basic TypeScript support
- Generic type support
- Multiple bundle format support

### Changed
- Improved project structure
- Updated build system

## [1.0.1] - 2025-02-01

### Initial Release
- Basic state management functionality
- Event-based reactivity
- Proxy-based state updates
- JavaScript implementation