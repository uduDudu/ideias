CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."comment"
ADD COLUMN "user_id" uuid NULL DEFAULT gen_random_uuid();