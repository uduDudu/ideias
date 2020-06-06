CREATE TABLE "public"."solution"(
    "id" serial NOT NULL,
    "description" text NOT NULL,
    "link" text NOT NULL,
    "user_id" uuid NOT NULL,
    "idea_id" uuid NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("idea_id") REFERENCES "public"."idea"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict
);