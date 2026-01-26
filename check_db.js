import { db } from './server/db.ts';
import { paymentMethodDetails } from './shared/schema.ts';

async function checkData() {
  try {
    const methods = await db.select().from(paymentMethodDetails);
    console.log('Database payment methods:');
    console.log(JSON.stringify(methods, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

checkData();