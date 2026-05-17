# Security Audit Skill

Run a full OWASP Top 10 security audit against the backend.

## Trigger
- User asks for "security audit", "security review", "check for vulnerabilities"
- Before any production deployment
- After adding new API routes or auth changes

## Steps
1. Ensure the server is running: `cd server && npm run dev`
2. Run the automated audit: `cd server && npm run security:audit`
3. Review the generated report in `server/.audits/`
4. Manually verify any FAIL or WARN results
5. Present findings to user with severity ratings

## What it checks
- A01: Broken Access Control (JWT on protected routes)
- A02: Cryptographic Failures (JWT secret strength)
- A03: Injection (SQL injection via raw queries, input validation)
- A04: Insecure Design (rate limiting presence)
- A05: Security Misconfiguration (Helmet headers)
- A06: Vulnerable Components (npm audit)
- A07: Auth Failures (token expiry, single-use, invalidation)
- A08: Software Integrity (eval usage)
- A09: Logging & Monitoring (error logging)
- WebSocket auth, payload limits, room player caps
- CORS configuration, CSRF protections, email enumeration
