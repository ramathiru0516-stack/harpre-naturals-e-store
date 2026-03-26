
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT TO public
  USING (
    (user_id IS NULL AND id IN (SELECT order_id FROM public.order_items)) 
    OR (auth.uid() = user_id) 
    OR has_role(auth.uid(), 'admin'::app_role)
  );

DROP POLICY IF EXISTS "Order items viewable by order owner or admin" ON public.order_items;
CREATE POLICY "Order items viewable by order owner or admin" ON public.order_items
  FOR SELECT TO public
  USING (true);
