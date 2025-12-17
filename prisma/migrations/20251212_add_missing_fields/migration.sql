-- Add missing fields to CustomEvent table
ALTER TABLE "CustomEvent" ADD COLUMN "eventType" TEXT NOT NULL DEFAULT 'click';
ALTER TABLE "CustomEvent" ADD COLUMN "selector" TEXT;
ALTER TABLE "CustomEvent" ADD COLUMN "enabled" BOOLEAN NOT NULL DEFAULT true;

-- Remove deprecated fields
ALTER TABLE "CustomEvent" DROP COLUMN IF EXISTS "hasValue";
ALTER TABLE "CustomEvent" DROP COLUMN IF EXISTS "hasCurrency";

-- Add missing ScriptInjection table
CREATE TABLE IF NOT EXISTS "ScriptInjection" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "scriptTagId" TEXT,
    "scriptUrl" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScriptInjection_pkey" PRIMARY KEY ("id")
);

-- Add indexes for ScriptInjection
CREATE UNIQUE INDEX IF NOT EXISTS "ScriptInjection_appId_shop_key" ON "ScriptInjection"("appId", "shop");
CREATE INDEX IF NOT EXISTS "ScriptInjection_shop_idx" ON "ScriptInjection"("shop");

-- Update foreign key constraint for CustomEvent to use CASCADE delete
ALTER TABLE "CustomEvent" DROP CONSTRAINT IF EXISTS "CustomEvent_appId_fkey";
ALTER TABLE "CustomEvent" ADD CONSTRAINT "CustomEvent_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;