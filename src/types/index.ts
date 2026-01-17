/**
 * @file TypeScript Type Definitions - Index
 * @description Central export file for all TypeScript types
 * 
 * @owner All Developers
 * @shared This file is used across all modules
 * 
 * @see docs/DATABASE_SCHEMA.md for database entity definitions
 * 
 * IMPORTANT: When adding new types:
 * 1. Create a new file in /types (e.g., order.ts)
 * 2. Export from this index file
 * 3. Types should match Supabase schema
 */

// Re-export all types
export * from './order'
export * from './customer'
export * from './agent'
export * from './card-design'
export * from './user'
