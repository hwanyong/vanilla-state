# Deployment Guide

This document describes the deployment process for the `@uhd_kr/vanilla-state` package.

## Deployment Methods

### 1. Manual Deployment

Follow these steps to deploy the package manually:

1. Record changes
```bash
npm run changeset
```

2. Update version
```bash
npm run version
```

3. Build and deploy
```bash
npm run build
npm run release
```

### 2. Automated Deployment (GitHub Actions)

Deployment automatically proceeds when changes are pushed to the main branch:

1. Create Changeset
```bash
npm run changeset
```

2. Commit and push changes
```bash
git add .
git commit -m "chore: release preparation"
git push origin main
```

3. GitHub Actions will automatically:
   - Build the package
   - Update versions
   - Deploy to NPM
   - Create Release PR

## Required Environment Variables

- `NPM_TOKEN`: Access token for NPM deployment
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

## Pre-deployment Checklist

1. Verify all tests have passed
2. Confirm CHANGELOG.md is updated
3. Ensure documentation is up to date
4. Verify TypeScript types are generated correctly

## Troubleshooting

### Common Issues

1. Build Failures
   - Run `npm run build` locally to check for errors
   - Run TypeScript type check: `npm run typecheck`

2. Deployment Failures
   - Verify NPM token is correct
   - Check if package.json version is correct

3. GitHub Actions Failures
   - Check workflow logs
   - Verify required secrets are configured

## Release Notes Writing Guide

1. Major Changes
   - Breaking changes
   - API changes
   - Major feature additions/removals

2. Minor Changes
   - New feature additions
   - Existing feature improvements

3. Patch Changes
   - Bug fixes
   - Documentation updates
   - Performance improvements