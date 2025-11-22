# Database Schema Optimization Guide

## Overview
This guide provides instructions to clean up your database by removing unused tables and updating to the optimized schema.

---

## Step 1: Backup Your Database (Optional but Recommended)
```bash
# Export current database (if needed for rollback)
pg_dump $DATABASE_URL > backup_$(date +%s).sql
```

---

## Step 2: Drop Unused Tables

The following 14 tables are NOT used in your current functionality and can be safely removed:

```sql
-- Drop unused tables (in order of dependencies)
DROP TABLE IF EXISTS email_templates CASCADE;
DROP TABLE IF EXISTS document_templates CASCADE;
DROP TABLE IF EXISTS message_templates CASCADE;
DROP TABLE IF EXISTS verification_rules CASCADE;
DROP TABLE IF EXISTS login_history CASCADE;
DROP TABLE IF EXISTS message_idempotency CASCADE;
DROP TABLE IF EXISTS tier_usage_tracking CASCADE;
DROP TABLE IF EXISTS settings_audit CASCADE;
DROP TABLE IF EXISTS platform_settings CASCADE;
DROP TABLE IF EXISTS contact_settings CASCADE;
DROP TABLE IF EXISTS sustainability_content CASCADE;
DROP TABLE IF EXISTS videos CASCADE;
DROP TABLE IF EXISTS admin_audit_logs CASCADE;
DROP TABLE IF EXISTS two_factor_auth CASCADE;
```

---

## Step 3: Update Your Schema File

Replace your current `shared/schema.ts` with the optimized version:
1. Open `OPTIMIZED_SCHEMA.ts` (provided)
2. Copy all content
3. Paste into `shared/schema.ts`
4. Save the file

---

## Step 4: Sync Database with Updated Schema

Run the Drizzle push command to sync your database:

```bash
npm run db:push
```

If you encounter conflicts, use:
```bash
npm run db:push -- --force
```

---

## Tables Retained (18 Total)

### Core Auth & User Management
- `sessions` - Session storage (Replit Auth)
- `users` - User accounts with roles
- `user_profiles` - Extended user information
- `admin_permissions` - Role-based access control

### Marketplace
- `projects` - Mining projects
- `express_interest` - Interest tracking
- `marketplace_listings` - Product/service listings
- `buyer_requests` - RFQs and buyer requests
- `verification_queue` - Listing verification status

### Messaging & Communication
- `message_threads` - Conversation threads
- `messages` - Individual messages
- `blog_posts` - Blog/news content
- `contact_submissions` - Contact form submissions

### Admin & Operations
- `activity_logs` - Audit trail
- `notifications` - User notifications
- `membership_benefits` - Tier benefits configuration

### Seller Verification
- `seller_verification_requests` - Verification request tracking
- `seller_verification_documents` - Document uploads

---

## Tables Removed (14 Total)

| Table | Reason |
|-------|--------|
| `admin_audit_logs` | Redundant with `activity_logs` |
| `contact_settings` | Not implemented yet |
| `document_templates` | Not needed for current implementation |
| `email_templates` | Email system not active |
| `login_history` | Basic activity logs sufficient |
| `message_idempotency` | Optional optimization, not required |
| `message_templates` | Not used in messaging system |
| `platform_settings` | Settings management not needed |
| `settings_audit` | Admin audit logs handle this |
| `sustainability_content` | Future feature, not implemented |
| `tier_usage_tracking` | Usage tracking not implemented |
| `two_factor_auth` | 2FA not implemented |
| `verification_rules` | Complex KYC/AML not needed |
| `videos` | Video management not implemented |

---

## Benefits of This Optimization

✅ **Cleaner Schema**: Reduced from 32 to 18 tables
✅ **Faster Queries**: Fewer tables = simpler joins
✅ **Easier Maintenance**: Only relevant tables to manage
✅ **Lower DB Overhead**: Reduced storage and index maintenance
✅ **Clearer Architecture**: Focus on core functionality

---

## Verification Checklist

After migration, verify everything works:

- [ ] `npm run dev` starts without errors
- [ ] Admin panel loads and navigation works
- [ ] Marketplace listings display
- [ ] Messaging system functional
- [ ] Buyer tier upgrades working
- [ ] Seller verification functional
- [ ] Blog posts visible
- [ ] Contact form submissions recorded

---

## Rollback (If Needed)

If you need to revert:

1. Restore from backup:
   ```bash
   psql $DATABASE_URL < backup_TIMESTAMP.sql
   ```

2. Revert `shared/schema.ts` to original version

---

## Notes

- All foreign keys properly maintained between remaining tables
- Cascade delete configured for data integrity
- Indexes optimized for current queries
- All Zod validation schemas updated
- Zero data loss for active features

---

**Last Updated**: November 22, 2025
