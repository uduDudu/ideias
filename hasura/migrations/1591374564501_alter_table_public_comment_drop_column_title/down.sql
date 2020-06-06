ALTER TABLE "public"."comment"
ADD COLUMN "title" text;
ALTER TABLE "public"."comment"
ALTER COLUMN "title" DROP NOT NULL;