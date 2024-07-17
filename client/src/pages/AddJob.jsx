import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { JOB_TYPE, JOB_STATUS } from '../utils/constants';


export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post('/jobs', data);
        toast.success('Thêm mới thành công');
        return redirect('all-jobs');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const AddJob = () => {
    const { user } = useOutletContext();


    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>Thêm mới công việc</h4>
                <div className='form-center'>
                    <FormRow type='text' name='position' labelText='Chức vụ' />
                    <FormRow type='text' name='company' labelText='Công ty' />
                    <FormRow
                        type='text'
                        labelText='Địa chỉ'
                        name='jobLocation'
                        defaultValue={user.location}
                    />
                    <FormRowSelect
                        labelText='Trạng thái công việc'
                        name='jobStatus'
                        defaultValue={JOB_STATUS.PENDING}
                        list={Object.values(JOB_STATUS)}
                    />
                    <FormRowSelect
                        name='jobType'
                        labelText='Loại công việc'
                        defaultValue={JOB_TYPE.FULL_TIME}
                        list={Object.values(JOB_TYPE)}
                    />

                    <SubmitBtn formBtn ten={'Thêm mới'} />
                </div>
            </Form>
        </Wrapper>
    );
};

export default AddJob;