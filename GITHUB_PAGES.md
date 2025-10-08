# GitHub Pages Deployment

This project is configured to deploy to GitHub Pages using GitHub Actions.

## Setup Instructions

### 1. Repository Configuration

Make sure your repository name matches the `basePath` configured in `next.config.ts`. Currently set to `/school-project`.

If your repository has a different name, update the following in `next.config.ts`:

```typescript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
```

### 2. GitHub Pages Settings

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy when you push to the `main` branch

### 3. Environment Variables

The project uses different configurations for development and production:

- **Development**: Standard Next.js configuration
- **Production**: Configured for GitHub Pages with static export

### 4. Local Development

For regular development:
```bash
npm run dev
# or
pnpm dev
```

To test the GitHub Pages build locally:
```bash
npm run build:github
# or
pnpm build:github
```

### 5. Manual Deployment

The GitHub Actions workflow automatically deploys when you push to `main`. You can also trigger it manually from the Actions tab in your repository.

### 6. Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the `public` directory with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Update the `basePath` and `assetPrefix` in `next.config.ts` to empty strings

## Project Structure

- `.github/workflows/deploy.yml` - GitHub Actions workflow for deployment
- `next.config.ts` - Next.js configuration with GitHub Pages settings
- `src/utils/paths.ts` - Utility functions for handling asset paths
- `public/.nojekyll` - Prevents GitHub Pages from using Jekyll

## Troubleshooting

1. **404 errors**: Make sure the repository name matches the `basePath` configuration
2. **Missing assets**: Verify that all asset paths use the `getAssetPath()` utility function
3. **Build failures**: Check the Actions tab for detailed error logs

## Key Changes Made

1. ✅ Configured Next.js for static export
2. ✅ Updated `next.config.ts` with GitHub Pages settings
3. ✅ Created GitHub Actions workflow
4. ✅ Added path utilities for proper asset handling
5. ✅ Updated components to use proper paths
6. ✅ Added `.nojekyll` file to prevent Jekyll processing
7. ✅ Created environment-specific configuration

The site will be available at: `https://[username].github.io/school-project/`