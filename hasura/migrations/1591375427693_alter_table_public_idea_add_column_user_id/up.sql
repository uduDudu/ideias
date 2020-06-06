CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."idea"
ADD COLUMN "user_id" uuid NOT NULL DEFAULT gen_random_uuid();