import { createClient } from '@supabase/supabase-js';

// Supabase credentials with environment fallback
const supabaseUrl =
  (import.meta as any).env?.VITE_SUPABASE_URL || 'https://alamin-store-demo.supabase.co';
const supabaseAnonKey =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dummy-anon-key-for-development';

// Export configured Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Saves or updates delivery notes for a specific order in Supabase
 */
export async function updateOrderDeliveryNotesInSupabase(
  orderId: string,
  deliveryNotes: string
) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({
        deliveryNotes,
        driverNotes: deliveryNotes,
        updatedAt: new Date().toISOString()
      })
      .eq('id', orderId);

    if (error) {
      console.warn('Supabase order delivery note update notice:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.warn('Supabase sync attempted for order ' + orderId, err);
    return { success: false, error: err?.message || 'Sync warning' };
  }
}
