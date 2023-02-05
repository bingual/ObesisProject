import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { deleteToken } from 'store';
import { useAppContext } from 'store';
import './AppLayout.scss';

export default function AppLayout() {
    // 토큰인증, 로그인여부 판단을 위해 사용
    const {
        store: { isAuthenticated, username: requestUser },
        dispatch,
    } = useAppContext();

    const navigate = useNavigate();

    // 로그아웃 함수
    const handleLogout = () => {
        notification.open({
            message: '로그아웃 되었습니다.',
            icon: <SmileOutlined style={{ color: '#ff3333' }} />,
        });
        dispatch(deleteToken());
        navigate('/');
    };

    const handleOnKeyUp = (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
        }
    };

    return (
        <div>
            <header className="p-3 text-bg-dark">
                <div className="container" bis_skin_checked="1">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
                        bis_skin_checked="1"
                    >
                        {/* <a
                        href="/"
                        className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
                    ></a> */}

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li>
                                <Link
                                    to={'/'}
                                    className="nav-link px-2 text-white"
                                >
                                    Home
                                </Link>
                            </li>
                        </ul>

                        <div className="text-end" bis_skin_checked="1">
                            {!isAuthenticated && (
                                <Link
                                    to={'/accounts/login'}
                                    className="btn btn-outline-light me-2"
                                >
                                    로그인
                                </Link>
                            )}
                            {!isAuthenticated && (
                                <Link
                                    to={'/accounts/signup'}
                                    className="btn btn-warning me-2"
                                >
                                    회원가입
                                </Link>
                            )}
                            {isAuthenticated && (
                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="container my-5">
                <div className="row">
                    <div className="col-sm-12">
                        <Outlet />
                    </div>
                </div>
            </div>

            <footer>
                <p className="text-center text-muted">
                    © 2023 Obesis, TestProject
                </p>
            </footer>
        </div>
    );
}
