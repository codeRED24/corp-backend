ALTER TABLE "wishlists" RENAME COLUMN "product_id" TO "variant_id";--> statement-breakpoint
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_product_id_products_product_id_fk";
--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_variant_id_product_variants_variant_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("variant_id") ON DELETE no action ON UPDATE no action;