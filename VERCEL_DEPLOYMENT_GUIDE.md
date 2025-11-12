# Vercel Deployment Guide for Fusion Mining Limited

## 🚀 Quick Fix Summary

Your app was showing a blank page because:
- **Problem**: Vercel was trying to deploy your Express app as separate serverless functions + static files
- **Solution**: Now deploying the entire Express app as one serverless function via `api/index.ts`

## 📋 Required Changes

### 1. Files Updated
- ✅ **api/index.ts** - Now imports and exports your Express app
- ✅ **vercel.json** - Routes all requests through the Express serverless function

### 2. Environment Variables (CRITICAL!)

You **MUST** set these in your Vercel project dashboard:

#### Database
```bash
DATABASE_URL=postgresql://user:password@host:5432/database
```
Get this from your database provider (Neon, Supabase, Railway, etc.)

#### Session Secret
```bash
SESSION_SECRET=your-random-secret-key-here
```
Generate a random string (e.g., use `openssl rand -base64 32`)

#### Node Environment
```bash
NODE_ENV=production
```

#### Cookie Settings (Important for Vercel)
```bash
COOKIE_SAMESITE=none
```
This allows cookies to work across Vercel's domains

#### Optional: CORS Origin (if frontend is on different domain)
```bash
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

## 🛠️ Deployment Steps

### Step 1: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add all the variables listed above
4. Make sure to add them for **Production**, **Preview**, and **Development** environments

### Step 2: Deploy

1. Commit the changes to your Git repository:
   ```bash
   git add .
   git commit -m "Fix Vercel deployment configuration"
   git push
   ```

2. Vercel will automatically deploy the new version

### Step 3: Verify Deployment

After deployment completes:

1. **Check the build logs** - Should show "Build Completed" with no errors
2. **Visit your deployment URL** - Should see the Fusion Mining homepage (not blank)
3. **Open DevTools → Network** tab:
   - Verify `GET /` returns status 200 (not 307 redirect)
   - Verify JS files like `/assets/index-*.js` return with `Content-Type: application/javascript`
4. **Test login** - Click "Log In" and try one of the quick login buttons

## 🔍 Troubleshooting

### Still seeing a blank page?

1. **Check Environment Variables**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Ensure `DATABASE_URL` is set correctly
   - Ensure `SESSION_SECRET` is set

2. **Check Build Logs**:
   - Look for any errors during the build process
   - Common issues: missing dependencies, TypeScript errors

3. **Check Function Logs**:
   - Go to Vercel Dashboard → Deployments → [Your Deployment] → Functions
   - Click on the function logs to see runtime errors
   - Look for database connection errors or missing environment variables

4. **Verify Database Connection**:
   - Make sure your database (Neon/Supabase/etc.) allows connections from Vercel
   - Most providers require you to whitelist Vercel's IP ranges or use SSL

### Getting 500 errors?

- Check Function Logs for the exact error
- Most common: `DATABASE_URL` not set or database not accessible

### Login not working?

- Verify `SESSION_SECRET` is set
- Verify `COOKIE_SAMESITE=none` is set
- Your database must be running and accessible

## 📝 Important Notes

### About the Demo Login

- The quick login buttons use **hardcoded test credentials** (admin/admin123, etc.)
- This is **NOT secure** and should **ONLY** be used for demos/testing
- **DO NOT use this in production with real user data**

### Database Session Storage

- The app uses PostgreSQL session storage via `connect-pg-simple`
- Sessions are stored in the database, not in-memory
- This works on Vercel's serverless architecture

### Serverless Limitations

- Each request may hit a different serverless instance
- Cold starts: First request after inactivity may be slower (2-3 seconds)
- This is normal for serverless deployments

## ✅ Success Checklist

- [ ] All environment variables set in Vercel
- [ ] Code pushed to Git repository
- [ ] Vercel build completes successfully
- [ ] Homepage loads (not blank)
- [ ] Login page accessible at `/login`
- [ ] Quick login buttons work
- [ ] Can navigate to different pages

## 🆘 Still Having Issues?

If you're still seeing a blank page or errors:

1. Share the **Vercel deployment URL**
2. Share screenshots of:
   - Browser Console errors (F12 → Console tab)
   - Network tab (F12 → Network → filter by Doc and JS)
   - Vercel Function logs (Dashboard → Deployments → [Deployment] → Functions)
3. Confirm all environment variables are set

## 🎉 Next Steps After Successful Deployment

1. **Set up your production database** (if not already done)
2. **Run database migrations**: You may need to run `npm run db:push` against your production database
3. **Seed initial data** (if needed)
4. **Test all features** thoroughly
5. **Consider security**: Replace demo login with proper authentication for production

---

**Important**: This deployment configuration is optimized for demo/testing purposes. For production with real users, you should implement proper authentication, security measures, and possibly move to a non-serverless host if you need persistent connections or WebSockets.
