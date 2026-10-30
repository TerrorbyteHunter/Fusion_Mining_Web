ALTER TABLE "marketplace_listings"
ADD COLUMN "image_urls" text[] NOT NULL DEFAULT ARRAY[]::text[];

UPDATE "marketplace_listings"
SET "image_urls" = ARRAY["image_url"]
WHERE "image_url" IS NOT NULL AND "image_url" <> '';