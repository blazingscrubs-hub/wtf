# Deployment Guide for BetterThan.wtf

## Quick Deployment Options

### 1. Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `BetterThan.wtf` folder to the deployment area
3. Your site will be live instantly with a custom URL
4. Optionally connect a custom domain

### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the project directory
3. Follow the prompts
4. Your site will be deployed to vercel.app

### 3. GitHub Pages
1. Create a new GitHub repository
2. Push your code to GitHub
3. Go to repository Settings → Pages
4. Select main branch and root folder
5. Your site will be at `username.github.io/repository-name`

### 4. Cloudflare Pages
1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your GitHub repository
3. Configure build settings (no build command needed)
4. Deploy

## Custom Domain Setup

### For Netlify:
1. Go to your site settings in Netlify
2. Click "Domain settings"
3. Add your custom domain
4. Update your DNS records as instructed

### For GitHub Pages:
1. Add a `CNAME` file with your domain name
2. Update DNS records to point to GitHub Pages

## HTTPS/SSL
All major platforms provide automatic SSL certificates for custom domains.

## Environment Variables
If you add analytics or other services, configure environment variables through your hosting platform's dashboard.

## Performance Optimization
- Enable compression on your hosting platform
- Configure proper caching headers
- Consider adding a CDN for global distribution

## Monitoring
- Set up analytics (Google Analytics, Plausible, etc.)
- Monitor performance with Google Search Console
- Set up error tracking if needed