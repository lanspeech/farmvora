/*
  # Fix Security Issues: Unused Indexes, Overlapping Policies, and Always-True RLS

  1. Dropped Indexes (26 total)
    - Removed all unused indexes across projects, investments, weekly_updates,
      notifications, project_favorites, project_questions, products, orders,
      order_items, payment_transactions, and cart_items tables

  2. Fixed Multiple Permissive Policies
    - `exchange_rates`: Replaced ALL admin policy with separate INSERT/UPDATE/DELETE
      policies so it no longer overlaps with the public SELECT policy
    - `products`: Replaced ALL admin policy with separate INSERT/UPDATE/DELETE
      policies so it no longer overlaps with the public SELECT policy
    - `project_questions`: Removed 3 redundant SELECT policies, kept only the
      comprehensive one that checks ownership, approval status, and admin role

  3. Fixed Always-True RLS Policies
    - `notifications`: Restricted INSERT to only allow users to create
      notifications for themselves (auth.uid() = user_id)
    - `payment_transactions`: Restricted UPDATE to admins or transaction owners only
    - `profiles`: Restricted INSERT to only allow users to create their own
      profile (auth.uid() = id)
*/

-- ============================================================
-- 1. DROP UNUSED INDEXES
-- ============================================================

DROP INDEX IF EXISTS idx_projects_status;
DROP INDEX IF EXISTS idx_projects_category;
DROP INDEX IF EXISTS idx_projects_created_by;
DROP INDEX IF EXISTS idx_investments_investor;
DROP INDEX IF EXISTS idx_investments_project;
DROP INDEX IF EXISTS idx_investments_payment_status;
DROP INDEX IF EXISTS idx_investments_reviewed_by;
DROP INDEX IF EXISTS idx_weekly_updates_project;
DROP INDEX IF EXISTS idx_notifications_user_id;
DROP INDEX IF EXISTS idx_notifications_read;
DROP INDEX IF EXISTS idx_notifications_created_at;
DROP INDEX IF EXISTS idx_favorites_user_id;
DROP INDEX IF EXISTS idx_favorites_project_id;
DROP INDEX IF EXISTS idx_questions_project_id;
DROP INDEX IF EXISTS idx_questions_user_id;
DROP INDEX IF EXISTS idx_products_category;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_order_items_order;
DROP INDEX IF EXISTS idx_order_items_product_id;
DROP INDEX IF EXISTS idx_payment_transactions_user;
DROP INDEX IF EXISTS idx_payment_transactions_reference;
DROP INDEX IF EXISTS idx_payment_transactions_status;
DROP INDEX IF EXISTS idx_orders_payment_status;
DROP INDEX IF EXISTS idx_cart_items_product_id;
DROP INDEX IF EXISTS idx_project_questions_answered_by;
DROP INDEX IF EXISTS idx_project_questions_reviewed_by;

-- ============================================================
-- 2. FIX MULTIPLE PERMISSIVE POLICIES
-- ============================================================

-- --- exchange_rates ---
-- Drop the ALL policy and replace with granular INSERT/UPDATE/DELETE
DROP POLICY IF EXISTS "Admins can modify exchange rates" ON exchange_rates;

CREATE POLICY "Admins can insert exchange rates"
  ON exchange_rates FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update exchange rates"
  ON exchange_rates FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete exchange rates"
  ON exchange_rates FOR DELETE
  TO authenticated
  USING (is_admin());

-- --- products ---
-- Drop the ALL policy and replace with granular INSERT/UPDATE/DELETE
DROP POLICY IF EXISTS "Admins can manage products" ON products;

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- --- project_questions ---
-- Drop the 3 redundant SELECT policies, keep "Users can view questions" which
-- already covers: own questions OR approved OR admin
DROP POLICY IF EXISTS "Admins can view all questions" ON project_questions;
DROP POLICY IF EXISTS "Anyone can read questions" ON project_questions;
DROP POLICY IF EXISTS "Users can view approved questions" ON project_questions;

-- ============================================================
-- 3. FIX ALWAYS-TRUE RLS POLICIES
-- ============================================================

-- --- notifications: restrict INSERT to own user_id ---
DROP POLICY IF EXISTS "System can create notifications" ON notifications;

CREATE POLICY "Users can create own notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- --- payment_transactions: restrict UPDATE to owner or admin ---
DROP POLICY IF EXISTS "System can update payment transactions" ON payment_transactions;

CREATE POLICY "Owner or admin can update payment transactions"
  ON payment_transactions FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- --- profiles: restrict INSERT to own id ---
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
