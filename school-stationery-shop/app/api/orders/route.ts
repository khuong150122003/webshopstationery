import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer_name, phone, address, note, payment_method, total_amount, items } = body;

    // Validate required fields
    if (!customer_name || !phone || !address || !payment_method || !total_amount || !items?.length) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    // Use service role key for server-side insert (bypasses RLS if needed)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

    const client = createClient(supabaseUrl, serviceKey || anonKey);

    const { data, error } = await client
      .from('orders')
      .insert([{
        customer_name: customer_name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        note: note?.trim() || null,
        payment_method,
        total_amount,
        items,
        status: 'pending',
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ orderId: data.id, success: true }, { status: 201 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
