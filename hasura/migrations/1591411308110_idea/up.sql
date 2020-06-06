CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."idea"(
  "id" SERIAL NOT NULL,
  "user_id" uuid NOT NULL,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "difficulty" int2 NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  foreign key ("user_id") references "public"."user"("id") on update restrict on delete restrict
);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"() RETURNS TRIGGER AS $$ DECLARE _new record;
BEGIN _new := NEW;
_new."updated_at" = NOW();
RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_idea_updated_at" BEFORE
UPDATE ON "public"."idea" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_idea_updated_at" ON "public"."idea" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
