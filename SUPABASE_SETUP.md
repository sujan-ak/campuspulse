# Supabase Backend Setup Guide

## Prerequisites
- Supabase account (sign up at https://supabase.com)

## Step-by-Step Setup

### 1. Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - Project name: `campus-pulse`
   - Database password: (create a strong password)
   - Region: (choose closest to you)
4. Click "Create new project" and wait for setup to complete

### 2. Get API Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under Project URL)
   - **anon/public key** (under Project API keys)

### 3. Configure Environment Variables
1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Set Up Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire content from `supabase/schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

### 5. Enable Authentication
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure settings:
   - Enable email confirmations (optional)
   - Set up email templates (optional)

### 6. Add Sample Data (Optional)
Run this SQL in the SQL Editor to add test data:

```sql
-- Insert sample activities
INSERT INTO activities (name, type, date, participants, points, status) VALUES
  ('AI Workshop 2026', 'Workshop', '2026-02-20', 120, 50, 'Completed'),
  ('Hackathon Spring', 'Event', '2026-02-15', 200, 80, 'Completed'),
  ('Tech Talk: Cloud Computing', 'Seminar', '2026-03-01', 85, 30, 'Completed'),
  ('Cultural Fest', 'Event', '2026-03-05', 300, 40, 'Ongoing'),
  ('Research Symposium', 'Seminar', '2026-03-10', NULL, 60, 'Upcoming'),
  ('Sports Tournament', 'Event', '2026-03-15', NULL, 45, 'Upcoming');
```

### 7. Test Connection
1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Check browser console for any Supabase connection errors

## Database Tables

### users
- Stores user profiles (students, teachers, admins)
- Linked to Supabase Auth

### activities
- All campus activities, events, workshops
- Includes type, date, points, status

### attendance
- Student attendance records
- Tracks present/absent/late status

### user_activities
- Junction table linking users to activities
- Tracks which activities users have joined

## Security (Row Level Security)
- Users can only view/edit their own data
- Teachers/admins have elevated permissions
- All tables protected with RLS policies

## Next Steps
1. Update Login.tsx to use Supabase auth
2. Update Activities.tsx to fetch from Supabase
3. Update Dashboard to fetch real user data
4. Implement QR code attendance with Supabase

## Useful Supabase Commands

### Sign Up User
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
});
```

### Sign In User
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

### Fetch Activities
```typescript
const { data, error } = await supabase
  .from('activities')
  .select('*')
  .order('date', { ascending: false });
```

### Insert Attendance
```typescript
const { data, error } = await supabase
  .from('attendance')
  .insert({
    user_id: userId,
    session_name: 'Math 101',
    date: '2026-03-07',
    status: 'Present',
    percentage: 92
  });
```

## Troubleshooting

### Connection Issues
- Verify `.env` file exists and has correct values
- Check Supabase project is active (not paused)
- Ensure API keys are copied correctly

### RLS Errors
- Make sure user is authenticated
- Check RLS policies match your use case
- Temporarily disable RLS for testing (not recommended for production)

### CORS Errors
- Add your local development URL to Supabase allowed origins
- Go to Settings → API → CORS and add `http://localhost:5173`
