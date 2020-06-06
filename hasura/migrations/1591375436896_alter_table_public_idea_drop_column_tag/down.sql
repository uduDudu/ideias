ALTER TABLE "public"."idea" ADD COLUMN "tag" int4;
ALTER TABLE "public"."idea" ALTER COLUMN "tag" DROP NOT NULL;
ALTER TABLE "public"."idea" ADD CONSTRAINT idea_tag_key UNIQUE (tag);
