import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useTeacherData(teacherId: string | undefined) {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalStudents: 0,
        avgAttendance: 0,
        activeSessions: 1, // Mocked for now as there's no sessions table
        atRiskStudents: 0
    });
    const [attendanceData, setAttendanceData] = useState<any[]>([]);

    useEffect(() => {
        if (!teacherId) {
            setLoading(false);
            return;
        }

        const fetchTeacherData = async () => {
            try {
                // 1. Fetch total students
                const { count: studentCount } = await supabase
                    .from('users')
                    .select('*', { count: 'exact', head: true })
                    .eq('role', 'student');

                // 2. Fetch all attendance to calculate stats
                const { data: attendance } = await supabase
                    .from('attendance')
                    .select('*');

                if (attendance) {
                    setAttendanceData(attendance);

                    // Calculate average attendance
                    const totalRecords = attendance.length;
                    const presentRecords = attendance.filter(a => a.status === 'Present').length;
                    const avgAtt = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0;

                    // Calculate at-risk students (crude measure: group by user and find those with < 75% attendance)
                    const userAttendance: Record<string, { total: number; present: number }> = {};
                    attendance.forEach(record => {
                        if (!userAttendance[record.user_id]) userAttendance[record.user_id] = { total: 0, present: 0 };
                        userAttendance[record.user_id].total++;
                        if (record.status === 'Present') userAttendance[record.user_id].present++;
                    });

                    const atRisk = Object.values(userAttendance).filter(
                        u => (u.present / u.total) < 0.75
                    ).length;

                    // 3. Fetch active sessions count
                    const { count: sessionCount } = await supabase
                        .from('sessions')
                        .select('*', { count: 'exact', head: true })
                        .eq('teacher_id', teacherId)
                        .eq('status', 'active');

                    setStats({
                        totalStudents: studentCount || 0,
                        avgAttendance: avgAtt,
                        activeSessions: sessionCount || 0,
                        atRiskStudents: atRisk
                    });
                }
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherData();
    }, [teacherId]);

    return { loading, stats, attendanceData };
}
