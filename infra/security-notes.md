# Security Notes

## Secrets Management
Currently, the application uses `dotenv` to load secrets from environment variables.

### Future Integration: CyberArk / Conjur
To integrate with CyberArk:
1.  **Abstraction Layer:** Build a `SecretService` module in `backend/src/utils/secrets.ts`.
    ```typescript
    export async function getSecret(key: string): Promise<string> {
      // Logic to fetch from Conjur if deployed, else process.env
      if (process.env.USE_CYBERARK === 'true') {
         // Call CyberArk API
      }
      return process.env[key] || '';
    }
    ```
2.  **Usage:** Replace direct `process.env` access with `await getSecret('DB_URL')`.

### Current Security Measures
- **Helmet:** Sets secure HTTP headers.
- **CORS:** Restricts access to allowed origins (configured in `app.ts`).
- **Input Validation:** Basic validation is implied; strictly use `zod` schemas for all write operations in future.
- **Rate Limiting:** (To be implemented) Use `express-rate-limit` for API endpoints.
