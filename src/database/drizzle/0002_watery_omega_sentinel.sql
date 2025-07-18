ALTER TABLE "coupons" RENAME COLUMN "description_value" TO "discount_value";--> statement-breakpoint
ALTER TABLE "vendor" ALTER COLUMN "vendor_gst_number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vendor" ALTER COLUMN "vendor_address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vendor" ALTER COLUMN "vendor_latitude" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vendor" ALTER COLUMN "vendor_longitude" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vendor" ALTER COLUMN "pin_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "coupons" ADD COLUMN "usage_limit" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "coupons" ADD COLUMN "is_active" boolean DEFAULT true;