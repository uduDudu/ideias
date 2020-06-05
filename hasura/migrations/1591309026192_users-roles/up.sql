
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."user"(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "username" text NOT NULL,
  "email" text NOT NULL,
  "display_name" text NOT NULL,
  "locked_until" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id") ,
  UNIQUE ("email"),
  UNIQUE ("username")
);

CREATE TABLE "public"."role"(
  "id" integer NOT NULL,
  "name" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."user_role"(
  "id" serial NOT NULL,
  "user_id" uuid NOT NULL,
  "role_id" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id") ,
  FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("user_id", "role_id")
);
