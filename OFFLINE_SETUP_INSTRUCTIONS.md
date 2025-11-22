# Offline Database Setup - Instructions

## ✅ What You Have

**OFFLINE_DATABASE_SETUP.sql** - A complete SQL file that:
- Creates all 18 essential tables
- Sets up all 21 enums (data types)
- Creates all indexes for performance
- Sets up foreign key relationships
- Includes verification queries
- **Ready to execute directly in PostgreSQL**

---

## 🚀 How to Use

### Option 1: Using psql Command Line (Recommended)

```bash
# Navigate to your project directory
cd your-project-folder

# Execute the SQL file directly
psql $DATABASE_URL -f OFFLINE_DATABASE_SETUP.sql
```

**That's it!** Your database is now set up and ready for offline use.

---

### Option 2: Using DBeaver or Another SQL Client

1. Open your PostgreSQL client (DBeaver, pgAdmin, etc.)
2. Connect to your database
3. Open the file: `OFFLINE_DATABASE_SETUP.sql`
4. Execute it
5. Done!

---

### Option 3: Copy-Paste into psql

```bash
# Start psql
psql $DATABASE_URL

# Then paste entire contents of OFFLINE_DATABASE_SETUP.sql
# Or use: \i OFFLINE_DATABASE_SETUP.sql
```

---

## 📊 What Gets Created

### Tables (18)
✅ sessions - User sessions (Replit Auth)
✅ users - User accounts
✅ user_profiles - User details
✅ admin_permissions - Admin roles
✅ projects - Mining projects
✅ express_interest - Interest tracking
✅ marketplace_listings - Products/services
✅ buyer_requests - RFQs
✅ verification_queue - Listing verification
✅ message_threads - Chat threads
✅ messages - Chat messages
✅ blog_posts - Blog content
✅ contact_submissions - Contact form data
✅ activity_logs - Activity tracking
✅ notifications - User notifications
✅ membership_benefits - Tier benefits
✅ seller_verification_requests - Verification requests
✅ seller_verification_documents - Uploaded documents

### Data Types/Enums (21)
✅ user_role
✅ admin_role
✅ profile_type
✅ membership_tier
✅ verification_status
✅ license_type
✅ project_status
✅ listing_type
✅ listing_status
✅ main_category
✅ mineral_subcategory
✅ tool_subcategory
✅ service_subcategory
✅ ppe_subcategory
✅ thread_status
✅ message_context
✅ thread_type
✅ activity_type
✅ notification_type
✅ seller_verification_request_status
✅ seller_verification_document_type

### Indexes (Optimized)
✅ All foreign keys created
✅ Performance indexes on key columns
✅ Unique constraints where needed

---

## ✔️ Verification

After execution, you'll see verification queries showing:
- ✅ 18 tables created
- ✅ 21 enums created
- ✅ All indexes created

---

## 🏃 Then Run Your App

After the SQL executes successfully:

```bash
# Start your app
npm run dev

# Your app now has:
- ✅ Complete database schema
- ✅ All necessary tables
- ✅ Full offline functionality
- ✅ Ready for production
```

---

## 🔄 Re-initializing (Optional)

If you ever want to start fresh:

1. Uncomment the DROP statements at the top of `OFFLINE_DATABASE_SETUP.sql`
2. Re-run the file

This will delete all tables and enums, then recreate them cleanly.

---

## ❓ Troubleshooting

### Error: "Database already exists"
This is fine! The SQL handles existing tables. It will update them if needed.

### Error: "Type already exists"
Also fine! PostgreSQL will skip them.

### Error: "Permission denied"
Make sure you're using a database user with CREATE privileges.

---

## 📝 Summary

1. **Execute**: `psql $DATABASE_URL -f OFFLINE_DATABASE_SETUP.sql`
2. **Wait**: ~10-30 seconds for all tables to create
3. **Verify**: Check the output shows ✅ 18 tables, ✅ 21 enums
4. **Run**: `npm run dev`
5. **Done**: Your app is ready for offline use!

---

## 🎯 Key Points

✨ **Complete Schema** - All tables, enums, indexes in one file
⚡ **Production Ready** - Optimized for performance
🔒 **Data Integrity** - Foreign keys and constraints set up
📱 **Offline Ready** - No external dependencies needed
🚀 **Quick Setup** - One command to initialize

---

**You now have everything you need to run your app offline!**

Questions? Check the other documentation files:
- SCHEMA_COMPARISON.md - What tables are included and why
- DB_MIGRATION_GUIDE.md - Detailed technical guide
- MIGRATION_QUICK_START.md - Quick summary

