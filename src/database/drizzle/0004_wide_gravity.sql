ALTER TABLE "product_variants" ADD COLUMN "variant_image" varchar(900);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "product_image" varchar(900);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_image" varchar(900);--> statement-breakpoint
ALTER TABLE "vendor" ADD COLUMN "vendor_image" varchar(900);