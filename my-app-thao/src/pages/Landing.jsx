import main from '../assets/images/main.gif';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import styled from 'styled-components';
const Landing = () => {
    return (
        <StyledWrapper>
            <nav>
                <img src={logo} alt='Tbi' className='logo' />
            </nav>
            <div className='container page'>
                {/* info */}
                <div className='info'>
                    <h1>
                        Quản lý <span>công việc</span>
                    </h1>
                    <p>
                        Xin chào và chào mừng bạn đến với Tbicry, công cụ giúp bạn chinh phục thử thách trong công việc và cuộc sống.
                        Với Tbicry, quản lý và theo dõi công việc trở nên dễ dàng, hiệu quả và đầy cảm hứng.
                    </p>
                    <Link to='/register' className='btn register-link'>
                        Đăng kí
                    </Link>
                    <Link to='/login' className='btn'>
                        Đăng nhập
                    </Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img' />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0; 
    padding: 0 20px; 
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 500;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;