import { z } from 'zod';

// Exchange rate API response schema
const ExchangeRateResponseSchema = z.object({
  result: z.string(),
  documentation: z.string().optional(),
  terms_of_use: z.string().optional(),
  time_last_update_unix: z.number(),
  time_last_update_utc: z.string(),
  time_next_update_unix: z.number(),
  time_next_update_utc: z.string(),
  base_code: z.string(),
  conversion_rates: z.record(z.number()),
});

type ExchangeRateResponse = z.infer<typeof ExchangeRateResponseSchema>;

// Currency codes and names mapping
export const CURRENCY_INFO = {
  USD: { name: 'US Dollar', symbol: '$' },
  ZMW: { name: 'Zambian Kwacha', symbol: 'ZK' },
  CNY: { name: 'Chinese Yuan', symbol: '¥' },
  ZAR: { name: 'South African Rand', symbol: 'R' },
  EUR: { name: 'Euro', symbol: '€' },
  GBP: { name: 'British Pound', symbol: '£' },
} as const;

export type CurrencyCode = keyof typeof CURRENCY_INFO;

// Cache for exchange rates (valid for 1 hour)
let exchangeRateCache: {
  rates: Record<string, number>;
  timestamp: number;
  base: string;
} | null = null;

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Fetch current exchange rates from exchangerate-api.com
 * @param baseCurrency Base currency code (default: USD)
 * @returns Exchange rates relative to base currency
 */
export async function fetchExchangeRates(baseCurrency: CurrencyCode = 'USD'): Promise<Record<string, number>> {
  // Check cache first
  if (exchangeRateCache &&
      exchangeRateCache.base === baseCurrency &&
      Date.now() - exchangeRateCache.timestamp < CACHE_DURATION) {
    return exchangeRateCache.rates;
  }

  // Fallback rates (updated January 2026 - aligned with current market rates)
  const fallbackRates: Record<string, number> = {
    USD: 1,
    ZMW: 26.0,  // 1 USD = ~26 ZMW (current market rate)
    CNY: 7.30,  // 1 USD = ~7.30 CNY (current market rate)
    ZAR: 18.8,  // 1 USD = ~18.8 ZAR (current market rate)
    EUR: 0.91,  // 1 USD = ~0.91 EUR (current market rate)
    GBP: 0.78,  // 1 USD = ~0.78 GBP (current market rate)
  };

  try {
    // Try exchangerate-api.com first (if API key is available)
    if (process.env.EXCHANGE_RATE_API_KEY) {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`);

      if (response.ok) {
        const data = await response.json();
        const validatedData = ExchangeRateResponseSchema.parse(data);

        if (validatedData.result === 'success') {
          // Cache the result
          exchangeRateCache = {
            rates: validatedData.conversion_rates,
            timestamp: Date.now(),
            base: baseCurrency,
          };

          return validatedData.conversion_rates;
        }
      }
    }

    // Fallback to exchangerate.host (free API)
    console.log('Using free exchangerate.host API as fallback');
    try {
      const fallbackResponse = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`);

      if (fallbackResponse.ok) {
        const data = await fallbackResponse.json();
        console.log('Exchangerate.host response:', data);
        if (data.success !== false && data.rates) {
          // Cache the result
          exchangeRateCache = {
            rates: data.rates,
            timestamp: Date.now(),
            base: baseCurrency,
          };

          return data.rates;
        }
      }
    } catch (apiError) {
      console.error('Exchangerate.host API error:', apiError);
    }

    // Try another free API as backup
    try {
      console.log('Trying free.currconv.com API as backup');
      const backupResponse = await fetch(`https://free.currconv.com/api/v7/convert?q=${baseCurrency}_CNY,${baseCurrency}_ZMW,${baseCurrency}_ZAR,${baseCurrency}_EUR,${baseCurrency}_GBP&compact=ultra&apiKey=free`);

      if (backupResponse.ok) {
        const data = await backupResponse.json();
        console.log('Currconv response:', data);
        if (data && typeof data === 'object') {
          const rates: Record<string, number> = {};
          rates.CNY = data[`${baseCurrency}_CNY`] || 7.30;
          rates.ZMW = data[`${baseCurrency}_ZMW`] || 26.0;
          rates.ZAR = data[`${baseCurrency}_ZAR`] || 18.8;
          rates.EUR = data[`${baseCurrency}_EUR`] || 0.91;
          rates.GBP = data[`${baseCurrency}_GBP`] || 0.78;

          // Cache the result
          exchangeRateCache = {
            rates,
            timestamp: Date.now(),
            base: baseCurrency,
          };

          return rates;
        }
      }
    } catch (backupError) {
      console.error('Currconv API error:', backupError);
    }

    return fallbackRates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);

    console.warn('Using fallback exchange rates due to API failure');
    return fallbackRates;
  }
}

/**
 * Convert amount from one currency to another
 * @param amount Amount to convert
 * @param fromCurrency Source currency code
 * @param toCurrency Target currency code
 * @returns Converted amount
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): Promise<{ convertedAmount: number; exchangeRate: number }> {
  if (fromCurrency === toCurrency) {
    return { convertedAmount: amount, exchangeRate: 1 };
  }

  const rates = await fetchExchangeRates(fromCurrency);
  const exchangeRate = rates[toCurrency];

  if (!exchangeRate) {
    throw new Error(`Exchange rate not available for ${fromCurrency} to ${toCurrency}`);
  }

  const convertedAmount = amount * exchangeRate;

  return {
    convertedAmount: Math.round(convertedAmount * 100) / 100, // Round to 2 decimal places
    exchangeRate,
  };
}

/**
 * Get currency information
 * @param currencyCode Currency code
 * @returns Currency info or null if not found
 */
export function getCurrencyInfo(currencyCode: string) {
  return CURRENCY_INFO[currencyCode as CurrencyCode] || null;
}

/**
 * Format currency amount with symbol
 * @param amount Amount to format
 * @param currencyCode Currency code
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currencyCode: CurrencyCode): string {
  const info = CURRENCY_INFO[currencyCode];
  if (!info) {
    return `${amount} ${currencyCode}`;
  }

  return `${info.symbol}${amount.toFixed(2)}`;
}