# Project Handover & Progress Notes

## Google Auth Platform Configuration

We successfully resolved the Google Sign-In identity issue where the prompt was showing "storelink" instead of "Speedtouch". 

### Current Setup details
* **Google Cloud Project Name**: `speedtouch`
* **Google Cloud Project ID**: `speedtouch-501617`
* **Google OAuth Client ID**: `855057696292-sr4hlikg56a99u1rimmlmeg9enrm3utp.apps.googleusercontent.com`
* **Environment Configuration**: Saved in [`.env`](file:///c:/Users/olabe/speedtouch/.env) under `VITE_GOOGLE_CLIENT_ID`.

### Configured Redirects & Origins
For the new Google Client ID, we set up the following:
* **Authorized JavaScript Origins**:
  * `http://localhost:5173` (Development)
  * `https://speedtouch.com.ng` (Production)
  * `https://www.speedtouch.com.ng` (Production fallback)
* **Authorized Redirect URIs**:
  * `http://localhost:5173` (Development)
  * `https://speedtouch.com.ng` (Production)
  * `https://www.speedtouch.com.ng` (Production fallback)

---

## Next Steps / Actions for Later
When you are ready to deploy to production or continue working:

1. **Verify Production Domains**:
   If the domain URL is configured as HTTPS in production, make sure the redirect URIs in the Google Cloud Console for the `speedtouch-501617` project exactly match your live site domain (`https://speedtouch.com.ng` and `https://www.speedtouch.com.ng`).
2. **Supabase Auth Redirects**:
   Ensure that in your Supabase Auth settings, the redirect URLs are updated if you deploy the app to production.
3. **Verify Consent Screen Verification**:
   If Google prompts that the app is unverified or in "Testing" mode in production, you might need to change the Publishing Status to "In Production" in the Google Cloud Console (under OAuth Consent Screen / Branding) to avoid the warning screen for external users.
