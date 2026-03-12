# cPanel Deployment Guide: Replace Old PHP/HTML Site with New React Codebase

## Pre-Deployment Checklist

- [ ] Verify `npm run build` completes successfully (already done)
- [ ] Backup current cPanel site in your local machine
- [ ] Verify dist folder contains: index.html, assets/, robots.txt, sitemap.xml

---

## Step-by-Step Deployment (Zero Downtime)

### Phase 1: Backup Old Site (5 minutes)

1. **Login to cPanel** → File Manager
2. Navigate to `public_html` (root directory for domain)
3. Create folder: `public_html/old_site_backup_[DATE]`
4. **Move/copy** entire old site content into backup folder:
   - All `.php` files
   - All `.html` files
   - All folders (`css/`, `js/`, `images/`, etc.)
5. Leave backup folder in place (safety net)

### Phase 2: Prepare New Site Locally

1. On your Windows machine, locate `d:\PROJECTS\st.-joseph-s-bloom\dist`
2. **Verify these files exist in dist:**
   - `index.html`
   - `robots.txt`
   - `sitemap.xml`
   - `assets/` folder (with all .js, .css, image files)

### Phase 3: Upload New Site to cPanel (Critical)

**Option A: Direct File Upload (Recommended for small sites)**

1. In cPanel File Manager → `public_html`
2. **Delete old files** (NOT folders yet) — keep folder structure initially:
   - Delete all `.php` files
   - Delete all `.html` files (except index.html from new build)
   - Delete old `assets/`, `css/`, `js/` folders
3. **Upload dist contents** (NOT the dist folder itself):
   - Right-click → Upload
   - Select all files/folders from your local `dist` folder
   - Upload directly into `public_html`
4. **Verify structure:** Should see in public_html:
   ```
   public_html/
   ├── index.html (new)
   ├── robots.txt (new)
   ├── sitemap.xml (new)
   ├── assets/ (new)
   │   ├── *.js
   │   ├── *.css
   │   └── *.jpg, *.png
   └── old_site_backup_[DATE]/ (safety backup)
   ```

**Option B: FTP/SFTP (Fastest for large uploads)**

1. Use FileZilla or WinSCP
2. Connect to cPanel via SFTP credentials
3. Download cPanel credentials:
   - cPanel → FTP Accounts → Copy SFTP info
4. Connect and navigate to `public_html`
5. Delete old files
6. Drag-and-drop `dist/` contents into `public_html`

### Phase 4: Configure Server for React Routing (Critical!)

React SPA requires `.htaccess` to handle client-side routing. Without this, direct page links (like /admissions) will return 404.

1. In cPanel File Manager → `public_html`
2. **Create new file:** `.htaccess`
3. **Add this content:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache control for assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
</IfModule>
```

4. Save and close

### Phase 5: Test & Verify

1. **Hard refresh** browser (Ctrl+F5 or Cmd+Shift+R)
2. Visit: `https://ka476cisce.org/`
3. **Test these pages:**
   - `/about` → Should load
   - `/academics` → Should load
   - `/gallery` → Should load
   - `/admin-login` → Should load
   - Direct image access: `https://ka476cisce.org/assets/[imagename].jpg` → Should display
4. **Open Developer Tools (F12):**
   - Console → No red errors?
   - Network → All .js/.css loaded (200 status)?
5. Check mobile responsiveness

### Phase 6: Post-Deployment Cleanup

1. Wait 24-48 hours for browser caching to clear
2. (Optional) After confirming all works perfectly, delete backup folder
3. Test Google Search Console submission (see below)

---

## Troubleshooting

### Problem: Blank Page / 404 at Root

**Cause:** index.html not found in public_html
**Fix:**

- Verify `index.html` exists in public_html (not in subfolder)
- Check cPanel error logs: `public_html/error_log`

### Problem: CSS/JS Not Loading (404 on assets)

**Cause:** Incorrect asset paths or .htaccess misconfigured
**Fix:**

- Check in F12 DevTools → Network tab → what URLs are requested?
- Verify `assets/` folder exists in public_html
- Ensure .htaccess is in public_html (not in assets/)

### Problem: Routes Return 404 (e.g., /admissions)

**Cause:** .htaccess not installed or not working
**Fix:**

- Confirm .htaccess exists in public_html
- Verify Apache `mod_rewrite` is enabled (usually is on cPanel)
- Check cPanel error log for rewrite errors
- Test with `curl -I https://ka476cisce.org/admissions` (should return 200)

### Problem: Admin Dashboard Not Loading Data

**Cause:** Browser localStorage cleared or CORS issue
**Fix:**

- Clear browser cache/localStorage
- Open DevTools → Application → Local Storage → Delete all for domain
- Reload page
- Try adding a gallery image via admin panel

---

## Google Search Console & SEO

After going live:

1. Visit: `https://search.google.com/search-console`
2. Add property: `https://ka476cisce.org`
3. **Submit Sitemap:** https://ka476cisce.org/sitemap.xml
4. **Request Indexing** for home page
5. Wait 1-2 weeks for crawl and indexing

---

## Rollback Plan (If Something Breaks)

If deployment fails or you need to revert:

1. Delete all files in `public_html` **except** `old_site_backup_[DATE]`
2. Move contents of `old_site_backup_[DATE]` back to `public_html`
3. Site returns to previous state

---

## Files You Need to Upload

From `d:\PROJECTS\st.-joseph-s-bloom\dist\`:

- ✅ index.html
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ assets/ (entire folder + contents)

**DO NOT upload:**

- ❌ node_modules/
- ❌ src/
- ❌ src/
- ❌ package.json / package-lock.json
- ❌ vite.config.ts
- ❌ tsconfig files

---

## Summary

| Step               | Time        | Risk                  |
| ------------------ | ----------- | --------------------- |
| Backup old site    | 2 min       | None                  |
| Delete old files   | 2 min       | Low (backup in place) |
| Upload dist folder | 5-10 min    | Low                   |
| Add .htaccess      | 1 min       | None                  |
| Test all routes    | 5 min       | None                  |
| **Total**          | **~20 min** | **Very Low**          |

**Result:** New React site live, old site safely backed up, zero downtime.
