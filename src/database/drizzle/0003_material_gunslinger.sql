ALTER TABLE "wishlists" RENAME COLUMN "users" TO "user_id";--> statement-breakpoint
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_users_users_id_fk";
--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;