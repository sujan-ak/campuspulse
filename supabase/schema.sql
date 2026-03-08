-- CampusPulse Database Schema

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  student_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Workshop', 'Event', 'Seminar')),
  date DATE NOT NULL,
  participants INTEGER,
  points INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('Completed', 'Ongoing', 'Upcoming')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  room TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  geofencing_enabled BOOLEAN DEFAULT false,
  radius_meters INTEGER DEFAULT 100,
  section TEXT DEFAULT 'All',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance table
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  session_name TEXT,
  session_date DATE,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  distance_from_teacher DECIMAL(10,2),
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, session_id)
);

-- User Activities (junction table)
CREATE TABLE user_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, activity_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for activities table
CREATE POLICY "Anyone can view activities" ON activities
  FOR SELECT USING (true);

CREATE POLICY "Teachers can manage activities" ON activities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for sessions table
CREATE POLICY "Anyone can view sessions" ON sessions
  FOR SELECT USING (true);

CREATE POLICY "Teachers can manage sessions" ON sessions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for attendance table
CREATE POLICY "Users can view their own attendance" ON attendance
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can mark their own attendance" ON attendance
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view all attendance" ON attendance
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for user_activities table
CREATE POLICY "Users can view their own activities" ON user_activities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can join activities" ON user_activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);
