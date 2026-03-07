import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface AttendanceRecord {
  id: string;
  session_name: string;
  session_date: string;
  status: 'present' | 'absent' | 'late';
  marked_at: string;
}

export interface ActivityRecord {
  id: string;
  activity_name: string;
  activity_type: string;
  activity_date: string;
  points: number;
  status: string;
}

export function useStudentData(userId: string | undefined) {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // Fetch attendance records
        const { data: attendanceData } = await supabase
          .from('attendance')
          .select('*')
          .eq('user_id', userId)
          .order('session_date', { ascending: false });

        // Fetch activity records
        const { data: activitiesData } = await supabase
          .from('user_activities')
          .select(`
            *,
            activities (
              name,
              type,
              date,
              points
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        setAttendance(attendanceData || []);
        setActivities(activitiesData || []);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Calculate stats
  const totalSessions = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const attendanceRate = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0;
  const totalPoints = activities.reduce((sum, a) => sum + (a.points || 0), 0);

  return {
    attendance,
    activities,
    loading,
    stats: {
      attendanceRate,
      totalActivities: activities.length,
      totalPoints,
      presentCount,
      totalSessions
    }
  };
}
