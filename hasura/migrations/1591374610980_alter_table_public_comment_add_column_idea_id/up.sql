CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."comment"
ADD COLUMN "idea_id" uuid NOT NULL DEFAULT gen_random_uuid();