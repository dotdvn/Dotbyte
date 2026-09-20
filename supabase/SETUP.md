# Works backend setup

1. In the Supabase SQL editor for project `ndapsrixpdxvvqkefayy`, run `works.sql` once. It creates new works tables, admin membership, row-level security, and a private image bucket in a transaction. If it fails, nothing is committed; resolve the error before rerunning. Do not rerun after success.
2. In Authentication > Users, create your admin user using your own email and a strong password. Disable public signups in the authentication settings. Account creation alone does not give editing access.
3. Run the commented membership INSERT at the end of `works.sql`, replacing YOUR_ADMIN_EMAIL with the email of the user you created. Only do this for your own admin account.
4. Local `.env.local` already has the supplied project URL and public key. For production, set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in Vercel and redeploy once. This Vite application does not use NEXT_PUBLIC variables. Never add a service-role key to frontend variables.
5. Open `/admin`, log in, create a draft, save, upload images, and choose Published when ready. Subsequent project changes do not need a code deployment.

## Publishing behavior
- Public pages only read published, non-deleted projects. Drafts are visible to authorized admins.
- The first gallery image is the cover; arrow controls reorder images. Image upload/removal/details save separately from project text. Uploads become WebP with a maximum dimension of 1920px.
- Trash hides the project and sets it to draft. Restore also leaves it as a draft. Permanent deletion removes image files then the database record. If an operation fails, retry; it is not a cross-service transaction.
- Private image URLs expire after one hour. A previously issued URL can remain accessible until expiration even after unpublishing; new URLs are denied. Homepage refreshes image URLs every five minutes while open.
- Vercel functions render project HTML with per-project metadata and generate `/sitemap.xml` from published projects on each request. Local Vite uses React detail pages; server routes require Vercel runtime. Social image URLs are signed and may expire in third-party caches.
- The works section is hidden when empty. Backend errors do not break the main marketing page.

## Acceptance checks after setup
Use one temporary project and a non-admin account:
- Logged-out and non-admin users cannot read drafts, upload, edit, delete, or add themselves as admins.
- Admin can save a draft and upload/reorder/caption/delete images; the first image appears as the cover.
- Publish shows the project publicly at its slug; edit updates it without deployment.
- Trash removes it from the homepage, project route, and sitemap; restore keeps it private until republished.
- Check desktop/mobile, keyboard navigation, invalid login, duplicate slugs, oversized files, reload persistence, and failed network requests.
- Production `/admin` includes noindex, `/works/SLUG` contains the project text in page source, and `/sitemap.xml` includes only published projects.

The public key cannot run this SQL or create administrator users. Initial setup needs dashboard access. Never commit passwords, private access tokens, or service-role keys.
