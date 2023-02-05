import React, { useState } from 'react';
import { Form, Input, Button, notification, Card } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'api';
import { parseErrorMessages } from 'utils/forms';
import '././Card.scss';

export default function Signup() {
    const navigate = useNavigate(); // 페이지 이동을 관리하는 훅
    const [fieldErrors, setFieldErrors] = useState({}); // 에러를 관리하는 훅

    // 로그인 페이지 이동 함수
    const handleLoginPage = () => {
        notification.open({
            message: '로그인 페이지로 이동합니다.',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        navigate('/accounts/login');
    };

    // Submit 버튼을 눌렀을때 실행되는 함수
    const onFinish = (values) => {
        // 비동기 처리를 위해 async/await 설정
        async function fn() {
            // values에서 해당 값 파싱
            const { username, password } = values;

            // 에러 초기화
            setFieldErrors({});

            // 파싱한 데이터로 data 오브젝트 생성
            const data = { username, password };
            try {
                await axiosInstance.post('/accounts/signup/', data);

                // 우측 상단에 알림창 메세지 출력
                notification.open({
                    message: '회원가입 성공',
                    description: '로그인 페이지로 이동합니다.',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });

                navigate('/accounts/login');
            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: '회원가입 실패',
                        description: '유효하지않은 항목들을 확인해주세요.',
                        icon: <FrownOutlined style={{ color: '#ff3333' }} />,
                    });

                    // response에서 에러 결과를 파싱
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
            <Card title="회원가입">
                <Form
                    {...layout}
                    onFinish={onFinish}
                    //   onFinishFailed={onFinishFailed}
                    autoComplete={'false'}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '사용자 이름을 입력해주세요.',
                            },
                            { min: 5, message: '5글자이상 입력해주세요.' },
                        ]}
                        hasFeedback
                        {...fieldErrors.username}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '사용자 암호를 입력해주세요.',
                            },
                        ]}
                        hasFeedback
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
                            계정이 있습니까?{' '}
                            <Button onClick={handleLoginPage}>
                                로그인 하기
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
