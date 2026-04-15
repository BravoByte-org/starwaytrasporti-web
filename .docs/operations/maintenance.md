# Maintenance

## Routine tasks

- **Dependency updates:** review and update dependencies periodically
- **Content updates:** managed via Directus CMS — no code changes needed
- **Vercel deployment:** auto-deploys on push to main
- **Monitoring:** check Vercel analytics and error logs

## Emergency procedures

- **Site down:** check Vercel status, check Directus instance status
- **CMS unreachable:** verify Directus URL and token in Vercel environment variables
- **Build failures:** check GitHub Actions logs, verify dependency compatibility
