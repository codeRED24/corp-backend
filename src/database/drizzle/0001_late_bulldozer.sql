CREATE TABLE "product_interest_list" (
	"product_interest_list_id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"interest_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "product_interest_list_product_id_interest_id_pk" PRIMARY KEY("product_id","interest_id")
);
--> statement-breakpoint
CREATE TABLE "user_interest_list" (
	"user_interest_list_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"interest_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_interest_list_user_id_interest_id_pk" PRIMARY KEY("user_id","interest_id")
);
--> statement-breakpoint
CREATE TABLE "saved_addresses" (
	"saved_address_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"house_number" varchar(255) NOT NULL,
	"street_name" varchar(255) NOT NULL,
	"city" varchar(50) NOT NULL,
	"state" varchar(50) NOT NULL,
	"zip_code" varchar(6) NOT NULL,
	"country" varchar(50) NOT NULL,
	"latitude" numeric(9, 6) NOT NULL,
	"longitude" numeric(9, 6) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "vendor" (
	"vendor_id" serial PRIMARY KEY NOT NULL,
	"vendor_name" varchar(255) NOT NULL,
	"vendor_gst_number" varchar(255),
	"vendor_address" varchar(255),
	"vendor_latitude" numeric(9, 6),
	"vendor_longitude" numeric(9, 6),
	"pin_code" varchar(6),
	"type" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_primary_interest_interest_type_interest_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_interest_id_interest_type_interest_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "vendor_id" integer;--> statement-breakpoint
ALTER TABLE "product_interest_list" ADD CONSTRAINT "product_interest_list_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_interest_list" ADD CONSTRAINT "product_interest_list_interest_id_interest_type_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "public"."interest_type"("interest_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_interest_list" ADD CONSTRAINT "user_interest_list_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_interest_list" ADD CONSTRAINT "user_interest_list_interest_id_interest_type_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "public"."interest_type"("interest_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_addresses" ADD CONSTRAINT "saved_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_vendor_id_vendor_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendor"("vendor_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "primary_interest";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "interest_id";