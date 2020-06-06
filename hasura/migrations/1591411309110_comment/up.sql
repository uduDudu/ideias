CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."comment"(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL,
  "content" text NOT NULL,
  "idea_id" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  foreign key ("user_id") references "public"."user" ("id") on update restrict on delete restrict,
  foreign key ("idea_id") references "public"."idea" ("id") on update restrict on delete restrict
);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"() RETURNS TRIGGER AS $$ DECLARE _new record;
BEGIN _new := NEW;
_new."updated_at" = NOW();
RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_comment_updated_at" BEFORE
UPDATE ON "public"."comment" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_comment_updated_at" ON "public"."comment" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
