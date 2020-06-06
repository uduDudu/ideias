alter table "public"."comment"
           add constraint "comment_idea_id_fkey"
           foreign key ("idea_id")
           references "public"."idea"
           ("id") on update restrict on delete restrict;
