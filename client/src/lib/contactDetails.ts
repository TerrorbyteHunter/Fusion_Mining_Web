export const PRIMARY_CONTACT_PHONE = "+260 978 838 939";
export const ALTERNATE_CONTACT_PHONE = "+260 977 715 7869";

export function getContactPhoneNumbers(primaryPhone?: string | null): string[] {
  const primary = primaryPhone?.trim();
  return Array.from(new Set([primary, ALTERNATE_CONTACT_PHONE].filter((phone): phone is string => Boolean(phone))));
}
