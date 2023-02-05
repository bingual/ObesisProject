import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Input, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import { setToken } from 'store';
import { parseErrorMessages } from 'utils/forms';
import '././Card.scss';

export default function Login() {
    const { dispatch } = useAppContext(); // store의 dispatch 요청을 보내기 위해 사용
    const location = useLocation(); // url 정보를 가져오는 훅
    const navigate = useNavigate(); // 페이지 이동을 관리하는 훅

    const [fieldErrors, setFieldErrors] = useState({}); // 에러를 관리하는 훅

    // location.state 값이있다면 from을가져오고 아니라면 /로 설정
    const { from: loginRedirectUrl } = location.state || {
        from: { pathname: '/' },
    };

    // 회원가입 페이지 이동 함수
    const handleSignupPage = () => {
        notification.open({
            message: '회원가입 페이지로 이동합니다.',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        navigate('/accounts/signup');
    };

    // Submit 버튼을 눌렀을때 실행되는 함수
    const onFinish = (values) => {
        async function fn() {
            // values의 담긴 오브젝트 추출후 변수화
            const { username, password } = values;

            // 에러내역 초기화
            setFieldErrors({});

            // username, password를 담은 data 오브젝트 생성
            const data = { username, password };
            try {
                const response = await axiosInstance.post(
                    '/accounts/token/',
                    data,
                );
                console.log('response : ', response);

                const {
                    data: { access, username },
                } = response;

                const bearerToken = {
                    access,
                    username,
                };
                // store의 useAppContext로 dispatch 함수를 이용해 보내고 로컬 스토리지 저장
                dispatch(setToken(bearerToken));

                // setbearerToken(bearerToken); //로컬 스토리지 저장

                // 오른쪽 상단의 알림메시지 출력하는 antd 기능
                notification.open({
                    message: '로그인 성공',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
                navigate(loginRedirectUrl); // 해당주소로 이동
            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: '로그인 실패',
                        description: '아이디/암호를 확인해주세요.',
                        icon: <FrownOutlined style={{ color: '#ff3333' }} />,
                    });

                    const { data: fieldsErrorMessages } = error.response;

                    // 미리 정의한 parseErrorMessages 메서드로 로직수행
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
        fn();
    };
    return (
        <div className="Card">
            <Card title="로그인">
                <Form {...layout} onFinish={onFinish}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        hasFeedback // 입력 컨트롤의 피드 아이콘 표시
                        {...fieldErrors.username}
                        {...fieldErrors.detail}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        {...fieldErrors.password}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <p>
                            계정이 없습니까?{' '}
                            <Button onClick={handleSignupPage}>
                                회원가입 하기
                            </Button>
                        </p>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};
