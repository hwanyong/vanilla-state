# Changelog

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