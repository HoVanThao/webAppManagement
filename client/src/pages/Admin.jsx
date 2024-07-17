import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { StatItem } from '../components';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
export const loader = async () => {
    try {
        const response = await customFetch.get('/users/admin/app-stats');
        return response.data;
    } catch (error) {
        toast.error('Bạn không có quyền truy cập');
        return redirect('/dashboard');
    }
};

const Admin = () => {
    const { users, jobs } = useLoaderData();

    return (
        <Wrapper>
            <StatItem
                title='Người dùng hiện tại'
                count={users - 1}
                color='#e9b949'
                bcg='#fcefc7'
                icon={<FaSuitcaseRolling />}
            />
            <StatItem
                title='Tổng số công việc'
                count={jobs - 100}
                color='#647acb'
                bcg='#e0e8f9'
                icon={<FaCalendarCheck />}
            />
        </Wrapper>
    );
};
export default Admin;