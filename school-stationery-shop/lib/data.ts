import { supabase } from './supabase';
import { Product, Category } from './types';

export async function getProducts(options?: {
  categorySlug?: string;
  maxPrice?: number;
  search?: string;
  isCombo?: boolean;
}): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*, categories(id, name, slug, icon)')
    .order('created_at', { ascending: false });

  if (options?.categorySlug && options.categorySlug !== 'all') {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', options.categorySlug)
      .single();
    if (cat) query = query.eq('category_id', cat.id);
  }

  if (options?.maxPrice) {
    query = query.lte('price', options.maxPrice);
  }

  if (options?.search) {
    query = query.ilike('name', `%${options.search}%`);
  }

  if (options?.isCombo !== undefined) {
    query = query.eq('is_combo', options.isCombo);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data as Product[];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id');
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data as Category[];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(id, name, slug, icon)')
    .or("badge.eq.Bán chạy,badge.eq.Giá tốt")
    .eq('is_combo', false)
    .limit(8);
  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
  return data as Product[];
}

export async function getComboProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(id, name, slug, icon)')
    .eq('is_combo', true)
    .order('id');
  if (error) {
    console.error('Error fetching combos:', error);
    return [];
  }
  return data as Product[];
}
