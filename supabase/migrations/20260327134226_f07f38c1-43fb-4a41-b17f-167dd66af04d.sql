CREATE POLICY "Anyone can view payment screenshots"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-screenshots');

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_screenshot_url text;