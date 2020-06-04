CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."product"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" varchar NOT NULL DEFAULT 120, "description" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "maker_id" uuid NOT NULL, PRIMARY KEY ("id") );
