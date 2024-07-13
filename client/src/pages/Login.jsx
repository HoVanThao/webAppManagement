import { Link, Form, redirect, useNavigation, useActionData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errors = { msg: '' };
    if (data.password.length < 6) {
        errors.msg = 'Mật khẩu quá ngắn';
        return errors;
    }
    try {
        await customFetch.post('/auth/login', data);
        toast.success('Đăng nhập thành công');
        return redirect('/dashboard');
    } catch (error) {
        //toast.error(error?.response?.data?.msg);
        errors.msg = error.response.data.msg;
        return errors;
    }
};

const Login = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const errors = useActionData();
    return (
        <Wrapper>
            <Form method='post' className='form'>
                <Logo />
                <h4>Đăng nhập</h4>
                <FormRow type='email' name='email' labelText='Email' defaultValue='hovanthao0611cs@gmail.com' />
                <FormRow type='password' name='password' labelText='Mật khẩu' defaultValue='12345678' />
                {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
                <button type='submit' className='btn btn-block' disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>
                <button type='button' className='btn btn-block'>
                    Khám phá ứng dụng
                </button>
                <p>
                    Bạn chưa có tài khoản?
                    <Link to='/register' className='member-btn'>
                        Đăng kí
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Login;

