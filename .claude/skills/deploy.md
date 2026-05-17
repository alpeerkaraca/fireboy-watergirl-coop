# Deploy Skill

Deploy the Fireboy & Watergirl Co-op project to production.

## Trigger
- User asks to "deploy", "ship", "go live", "put this in production"

## Steps
1. Run security audit: `cd server && npm run security:audit`
2. Run performance audit: `cd server && npm run perf:audit`
3. Run test suite: `cd server && npm test`
4. Verify all audits pass (no FAIL results)
5. Set production environment variables:
   - `NODE_ENV=production`
   - `JWT_SECRET=<random 64-byte hex>`
   - `CORS_ORIGIN=<frontend domain>`
   - `DATABASE_URL=<PostgreSQL connection string>`
   - `APP_URL=<production API URL>`
   - SMTP credentials for email delivery
6. Run Prisma migrations: `npx prisma migrate deploy`
7. Build frontend assets (if using bundler)
8. Deploy backend (Railway, Fly.io, Render, or VPS)
9. Deploy frontend (Vercel, Netlify, or static hosting)
10. Verify health endpoint: `GET /api/health`
11. Test magic link flow end-to-end
12. Test WebSocket connection + room creation
13. Smoke test a full 2-player game session

## Post-deploy
- Monitor error rates (first 24h)
- Check leaderboard writes are working
- Verify magic link email delivery
