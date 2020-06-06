alter table "public"."idea"
           add constraint "idea_user_id_fkey"
           foreign key ("user_id")
           references "public"."user"
           ("id") on update restrict on delete restrict;