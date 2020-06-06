ALTER TABLE "public"."idea"
ADD COLUMN "repository" text;
ALTER TABLE "public"."idea"
ALTER COLUMN "repository" DROP NOT NULL;