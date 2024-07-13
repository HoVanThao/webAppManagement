import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useNavigation, redirect, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { JOB_TYPE, JOB_STATUS } from '../utils/constants';

const AddJob = () => {
    const { user } = useOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>add job</h4>
                <div className='form-center'>
                    <FormRow type='text' name='position' labelText='Chức vụ' />
                    <FormRow type='text' name='company' labelText='Công ty' />
                    <FormRow
                        type='text'
                        labelText='Địa chỉ'
                        name='jobLocation'
                        defaultValue={user.location}
                    />
                    <div className='form-row'>
                        <label htmlFor='jobStatus' className='form-label'>
                            Thời gian làm
                        </label>
                        <select
                            name='jobStatus'
                            id='jobStatus'
                            className='form-select'
                            defaultValue={JOB_TYPE.FULL_TIME}
                        >
                            {Object.values(JOB_TYPE).map((itemValue) => {
                                return (
                                    <option key={itemValue} value={itemValue}>
                                        {itemValue}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='btn btn-block form-btn '
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Thêm mới...' : 'Thêm mới'}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
};

export default AddJob;