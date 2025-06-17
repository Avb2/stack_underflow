// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yfkyijqjyuwnydzmwlkl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlma3lpanFqeXV3bnlkem13bGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMzI2ODEsImV4cCI6MjA2NTcwODY4MX0.99qENfiDbfIBsL1xZ3TEVGrR3HJQNwA3akyKzY5abs8'
export const supabase = createClient(supabaseUrl, supabaseKey);
