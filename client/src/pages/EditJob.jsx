import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/jobs/${params.id}`);
        return data;
    } catch (error) {
        toast.error(error.response.data.msg);
        return redirect('/dashboard/all-jobs');
    }
};

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.patch(`/jobs/${params.id}`, data);
        toast.success('Chỉnh sửa thành công');
        return redirect('/dashboard/all-jobs');
    } catch (error) {
        toast.error(error.response.data.msg);
        return error;
    }
};

const EditJob = () => {
    const { job } = useLoaderData();

    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>Chỉnh sửa công việc</h4>
                <div className='form-center'>
                    <FormRow type='text' name='position' defaultValue={job.position} labelText='Chức vụ' />
                    <FormRow type='text' name='company' defaultValue={job.company} labelText='Công ty' />
                    <FormRow
                        type='text'
                        labelText='Địa chỉ'
                        name='jobLocation'
                        defaultValue={job.jobLocation}
                    />

                    <FormRowSelect
                        name='jobStatus'
                        labelText='Trạng thái công việc'
                        defaultValue={job.jobStatus}
                        list={Object.values(JOB_STATUS)}
                    />
                    <FormRowSelect
                        name='jobType'
                        labelText='Loại công việc'
                        defaultValue={job.jobType}
                        list={Object.values(JOB_TYPE)}
                    />
                    <button
                        type='submit'
                        className='btn btn-block form-btn '
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Đang lưu lại...' : 'Lưu lại'}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
};

export default EditJob;