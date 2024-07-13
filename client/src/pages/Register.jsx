import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/register', data);
        toast.success('Đăng kí thành công');
        return redirect('/login');
    } catch (error) {
        // console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
    }
};
const Register = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <Logo />
                <h4>Đăng ký</h4>
                <FormRow type='text' name='name' labelText='Tên' />
                <FormRow type='text' name='lastName' labelText='Họ' />
                <FormRow type='text' name='location' labelText='Địa chỉ' />
                <FormRow type='email' name='email' labelText='Email' />
                <FormRow type='password' name='password' labelText='Mật khẩu' />

                <button type='submit' className='btn btn-block' disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>
                <p>
                    Bạn đã có tài khoản?
                    <Link to='/login' className='member-btn'>
                        Đăng nhập
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Register;