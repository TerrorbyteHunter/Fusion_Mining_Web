# Render.com Deployment Guide for Fusion Mining Limited

## 🚀 Why Render vs Vercel?

**Render** is better for full-stack apps like yours because:
- ✅ Runs a **persistent Node.js server** (not serverless)
- ✅ Better for **sessions and WebSockets**
- ✅ Simpler configuration
- ✅ Free PostgreSQL database included
- ✅ No cold starts
- ❌ Slower than Vercel for static content (but fine for most apps)

**Vercel** is better for:
- ⚡ Serverless functions (fast scaling)
- 🌐 Global CDN for static sites
- ❌ More complex for full Express apps with sessions

Choose based on your needs!

---

## 📋 Render Deployment Steps

### Step 1: Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account (recommended)
3. Authorize Render to access your repositories

### Step 2: Create a PostgreSQL Database

1. From Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `fusion-mining-db`
   - **Database**: `fusionmining`
   - **User**: `fusionmining_user`
   - **Region**: Choose closest to your users (Oregon, Frankfurt, Singapore, Ohio)
   - **Plan**: 
     - **Free** - For testing (limited resources, database expires after 90 days)
     - **Starter ($7/month)** - For production (always on)
3. Click **"Create Database"**
4. **Important**: Copy the **Internal Database URL** (starts with `postgresql://`) - you'll need this!

### Step 3: Create a Web Service

1. From Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - If not connected, click **"Connect account"** and authorize
   - Select your `fusionmining` repository
3. Configure the service:
   - **Name**: `fusion-mining`
   - **Region**: **Same as your database!** (very important)
   - **Branch**: `main` (or your default branch)
   - **Runtime**: **Node**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: 
     - **Free** - For testing (sleeps after inactivity)
     - **Starter ($7/month)** - For production (always on)

### Step 4: Set Environment Variables

In the Web Service settings, add these environment variables:

#### Required Variables

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Sets production mode |
| `DATABASE_URL` | `postgresql://...` | **Paste the Internal Database URL from Step 2** |
| `SESSION_SECRET` | *Auto-generate* | Click "Generate" button |

#### Optional Variables

| Key | Value | Notes |
|-----|-------|-------|
| `COOKIE_SAMESITE` | `lax` | For cookie security (already set in render.yaml) |
| `CORS_ORIGIN` | `https://yourdomain.com` | If using custom domain |

**Important**: 
- Use the **Internal Database URL** (not External) for better performance
- The Internal URL only works if your web service and database are in the **same region**

### Step 5: Deploy!

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Run `npm install && npm run build`
   - Start your server with `npm start`
3. **First deploy takes 5-10 minutes** - be patient!

### Step 6: Initialize Your Database

After the first deployment succeeds:

1. Go to your Web Service → **Shell** tab
2. Run the database migration:
   ```bash
   npm run db:push
   ```
3. (Optional) Seed initial data:
   ```bash
   npm run db:seed
   ```

---

## 🔍 Verify Deployment

### 1. Check Build Logs

- Go to your Web Service → **Logs** tab
- Look for:
  ```
  ✓ Build succeeded
  Server running at http://localhost:10000
  ```
- If you see errors, check the troubleshooting section below

### 2. Test Your App

1. Click the URL at top of dashboard (e.g., `https://fusion-mining.onrender.com`)
2. You should see the Fusion Mining homepage
3. Test login:
   - Click "Log In"
   - Try the quick login buttons (Admin, Buyer, Seller)
4. Navigate to different pages to ensure everything works

### 3. Check Database Connection

In the Shell tab, run:
```bash
node -e "const pg = require('pg'); const pool = new pg.Pool({connectionString: process.env.DATABASE_URL}); pool.query('SELECT NOW()').then(r => console.log('DB Connected:', r.rows[0])).catch(e => console.error('DB Error:', e)).finally(() => pool.end());"
```

Should output: `DB Connected: { now: '2025-11-12...' }`

---

## 🔧 Troubleshooting

### Build Fails

**Error**: `npm ERR! missing script: build`
- **Fix**: Make sure `package.json` has the `build` script (it should already)

**Error**: TypeScript compilation errors
- **Fix**: Run `npm run check` locally to find and fix type errors

### Server Won't Start

**Error**: `Cannot find module './dist/index.js'`
- **Fix**: Build command didn't complete. Check build logs

**Error**: `Error: Missing DATABASE_URL`
- **Fix**: Add `DATABASE_URL` environment variable (see Step 4)

### Database Connection Fails

**Error**: `ECONNREFUSED` or `timeout`
- **Fix**: Make sure you're using the **Internal Database URL**
- **Fix**: Verify your web service and database are in the **same region**

**Error**: `password authentication failed`
- **Fix**: Copy the database URL again - you may have copied it incorrectly

### App Loads but Login Doesn't Work

**Error**: Session not persisting
- **Fix**: Make sure `SESSION_SECRET` is set
- **Fix**: Run `npm run db:push` to create the session table

### Free Tier Sleeping

- **Issue**: On free tier, your app sleeps after 15 minutes of inactivity
- **Fix**: Upgrade to Starter plan ($7/month) for always-on
- **Workaround**: Use a ping service like [UptimeRobot](https://uptimerobot.com) (free)

---

## 💰 Cost Breakdown

### Free Tier (Testing)
- **Web Service**: Free (sleeps after inactivity, 750 hours/month)
- **Database**: Free (90 days, then expires)
- **Total**: $0/month
- **Best for**: Testing, demos, personal projects

### Production (Starter)
- **Web Service**: $7/month (always on, 512MB RAM)
- **Database**: $7/month (always on, 1GB storage)
- **Total**: $14/month
- **Best for**: Small production apps, startups

### Comparison with Vercel
- **Vercel Free**: Good for frontend, limited backend
- **Render Starter**: Better for full-stack apps with sessions
- **Winner**: Depends on your use case!

---

## 🚀 Advanced Configuration

### Custom Domain

1. Go to Web Service → **Settings** → **Custom Domains**
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `app.fusionmining.com`)
4. Add the CNAME record to your DNS provider:
   ```
   CNAME: app → your-app.onrender.com
   ```
5. Wait for DNS propagation (5-60 minutes)

### Auto-Deploy on Push

- **Already enabled!** Render auto-deploys when you push to your main branch
- To disable: Web Service → **Settings** → **Auto-Deploy** → OFF

### Environment-Specific Deployments

Deploy separate environments:
- **Production**: main branch → `fusion-mining.onrender.com`
- **Staging**: dev branch → `fusion-mining-staging.onrender.com`

Create two web services, each connected to a different branch!

### Health Checks

Your Express app should have a health endpoint:

```typescript
// In server/routes.ts, add:
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

Then in `render.yaml`:
```yaml
healthCheckPath: /api/health
```

This helps Render know if your app is running correctly.

---

## 📊 Monitoring Your App

### View Logs

- **Live logs**: Web Service → **Logs** tab
- **Download logs**: Click "Download" for offline analysis

### Metrics

- **Free Tier**: Basic metrics (requests, response time)
- **Paid Tier**: Advanced metrics, alerts

### Debugging

SSH into your running container:
1. Go to Web Service → **Shell** tab
2. Run commands directly on your server
3. Check environment: `env | grep DATABASE`
4. Test database: `npm run db:push`

---

## ✅ Deployment Checklist

Before going live:

- [ ] Database created and URL copied
- [ ] Web service created and linked to repo
- [ ] All environment variables set
- [ ] First deployment successful (check logs)
- [ ] Database initialized (`npm run db:push`)
- [ ] Homepage loads correctly
- [ ] Login works (test all three roles)
- [ ] All pages accessible
- [ ] Forms work (create project, listings, etc.)
- [ ] File uploads work (if applicable)
- [ ] No console errors in browser DevTools

Optional but recommended:

- [ ] Custom domain configured
- [ ] Health check endpoint added
- [ ] Monitoring/uptime checks enabled
- [ ] Backups configured (paid plans)
- [ ] SSL certificate verified (auto-enabled)

---

## 🆘 Need Help?

### Render Support

- **Docs**: [docs.render.com](https://docs.render.com)
- **Community**: [community.render.com](https://community.render.com)
- **Support**: [render.com/support](https://render.com/support) (paid plans)

### App-Specific Issues

If you encounter issues specific to the Fusion Mining app:

1. Check the logs in Render Dashboard
2. Test locally first: `npm run build && npm start`
3. Verify all environment variables are set
4. Check database connection string

---

## 🎉 Success!

Once deployed, your app will be live at:
```
https://fusion-mining.onrender.com
```

You can now:
- ✅ Share the URL with users
- ✅ Connect a custom domain
- ✅ Add more features and push to GitHub (auto-deploys!)
- ✅ Monitor usage and performance

**Important**: Remember this is still using the **demo login system** with hardcoded credentials. For production with real users, implement proper authentication!

---

**Last Updated**: November 11, 2025  
**Platform**: Render.com  
**App**: Fusion Mining Limited  
**Type**: Full-stack Express + React + PostgreSQL
