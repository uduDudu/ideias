CREATE TABLE "public"."user_passport"(
  "id" serial NOT NULL,
  "user_id" uuid NOT NULL,
  "type" text NOT NULL,
  "data" jsonb NOT NULL,
  "last_login_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict,
  UNIQUE ("user_id", "type")
);
