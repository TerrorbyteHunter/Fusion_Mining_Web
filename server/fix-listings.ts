import 'dotenv/config';
import { db } from './db';
import { marketplaceListings } from '@shared/schema';

async function fixListings() {
  try {
    console.log('Fixing marketplace listings: setting main_category where missing');

    // Set main_category = 'minerals' for listings that have a mineralType or type = 'mineral'
    await db.execute(
      `UPDATE marketplace_listings SET main_category = 'minerals' WHERE (main_category IS NULL OR main_category = '') AND (type = 'mineral' OR mineral_type IS NOT NULL)`
    );

    // For partnership listings without main_category, default to 'mining_services'
    await db.execute(
      `UPDATE marketplace_listings SET main_category = 'mining_services' WHERE (main_category IS NULL OR main_category = '') AND type = 'partnership'`
    );

    // For listings with toolSubcategory/tool fields, map to mining_equipment
    await db.execute(
      `UPDATE marketplace_listings SET main_category = 'mining_equipment' WHERE (main_category IS NULL OR main_category = '') AND (tool_subcategory IS NOT NULL OR service_subcategory IS NOT NULL OR ppe_subcategory IS NOT NULL)`
    );

    console.log('Marketplace listings updated.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to update listings:', err);
    process.exit(1);
  }
}

fixListings();
