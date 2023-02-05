import React, { useState } from 'react';
import { Form, Input, Button, Modal, Upload, notification } from 'antd';
import { PlusOutlined, FrownOutlined } from '@ant-design/icons';
import { getBase64FromFile } from 'utils/base64';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import { parseErrorMessages } from 'utils/forms';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PostNewForm() {
    const {
        store: { bearerToken },
    } = useAppContext();

    // 파일 상태값 저장
    const [fileList, setFileList] = useState([]);

    // 미리보기 상태값 저장
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    });

    const [fieldErrors, setFieldErrors] = useState({});

    const navigate = useNavigate();

    // 이미지를 fileList 상태값에 저장
    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    // 파일 미리보기
    const handlePreviewPhoto = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64FromFile(file.originFileObj);
        }

        // 공개여부와 이미지 소스 설정
        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview,
        });
    };

    // 서버의 해당 값들을 전송
    const handleFinish = async (fieldValues) => {
        const { title, contents } = fieldValues;

        // formData에 key: value 값 저장
        const formData = new FormData();
        formData.append('title', title);
        formData.append('contents', contents);

        if (fileList && fileList.length !== 0) {
            const {
                photo: { fileList },
            } = fieldValues;
            fileList.forEach((file) => {
                formData.append('photo', file.originFileObj);
            });
        }

        // 인증헤더
        const headers = { Authorization: `Bearer ${bearerToken}` };
        try {
            // 게시글 생성요청
            const response = await axiosInstance.post('/api/posts/', formData, {
                headers,
            });
            console.log(response);
            navigate('/');
        } catch (error) {
            if (error.response) {
                const { status, data: fieldsErrorMessages } = error.response;
                if (typeof fieldsErrorMessages === 'string') {
                    notification.open({
                        message: '서버 오류',
                        description: `에러) ${status} 응답을 받았습니다. 서버에러를 확인해주세요.`,
                        icon: <FrownOutlined style={{ color: '#ff3333' }} />,
                    });
                } else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
    };

    return (
        <Form {...layout} onFinish={handleFinish}>
            <Form.Item
                label="제목"
                name="title"
                rules={[
                    {
                        required: true,
                        message: '제목을 입력해주세요.',
                    },
                ]}
                hasFeedback // 입력 컨트롤의 피드 아이콘 표시
                {...fieldErrors.title}
                {...fieldErrors.detail}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="내용"
                name="contents"
                rules={[
                    {
                        required: true,
                        message: '내용을 입력해주세요.',
                    },
                ]}
                hasFeedback // 입력 컨트롤의 피드 아이콘 표시
                {...fieldErrors.contents}
                {...fieldErrors.detail}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="사진"
                name="photo"
                rules={[{ required: false, message: '사진을 입력해주세요.' }]}
                hasFeedback
                {...fieldErrors.photo}
            >
                {/* 파일업로드를 도와주는 디자인 */}
                <Upload
                    listType="picture-card"
                    fileList={fileList} // 파일목록
                    beforeUpload={() => {
                        // 업로드 방지
                        return false;
                    }}
                    onChange={handleUploadChange}
                    onPreview={handlePreviewPhoto}
                >
                    {/* 파일의 개수가 1개 이상일 경우 업로드 차단 */}
                    {fileList.length > 0 ? null : (
                        <div>
                            <PlusOutlined />
                            <div className="ant_upload-text">Upload</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: '0.5em' }}
                >
                    Submit
                </Button>
                <Button type="ghost" onClick={() => navigate('/')}>
                    Cancel
                </Button>
            </Form.Item>

            <Modal
                open={previewPhoto.visible} // 이미지 팝업창 여부
                footer={null} // 하단에 불필요한 버튼을 없앰
                onCancel={() => setPreviewPhoto({ visible: false })}
            >
                <img
                    src={previewPhoto.base64}
                    style={{ width: '100%' }}
                    alt="Preview"
                />
            </Modal>
            <hr />
        </Form>
    );
}

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};
