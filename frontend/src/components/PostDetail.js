import React, { useEffect, useState } from 'react';
import { useAppContext } from 'store';
import { axiosInstance, useAxios } from 'api';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Avatar, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';

export default function PostDetail() {
    const {
        store: { bearerToken, username: requestUser },
    } = useAppContext();

    const navigate = useNavigate(); // 페이지 이동을 관리하는 훅

    const { postId } = useParams(); // 전달받은 파라미터를 관리하는 훅

    const [post, setPost] = useState(); // 상태값을 관리하는 훅

    const headers = { Authorization: `Bearer ${bearerToken}` }; // 인증헤더

    const [{ data: postDetail, loding, error }, refetch] = useAxios({
        url: `/api/posts/${postId}`,
    });

    // 마운트시 페이지 새로고침
    useEffect(() => {
        refetch();
    }, []);

    // 해당 값 업데이트시마다 실행
    useEffect(() => {
        setPost(postDetail);
    }, [postDetail]);

    // 게시글 삭제
    const handleDelete = async (postId) => {
        try {
            const response = await axiosInstance.delete(
                `/api/posts/${postId}/`,
                {
                    headers,
                },
            );
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    if (typeof post !== 'undefined') {
        const { id, author, title, photo, contents } = post;
        const { username, avatar_url } = author;
        return (
            <>
                <div>
                    <Card
                        title={title}
                        hoverable
                        cover={
                            photo && (
                                <Link to={photo}>
                                    <img
                                        src={photo}
                                        alt={contents}
                                        width="100%;"
                                    />
                                </Link>
                            )
                        }
                    >
                        <Card.Meta
                            avatar={
                                <Link to={`/${username}`}>
                                    <Avatar
                                        size="large"
                                        icon={
                                            <img
                                                src={avatar_url}
                                                alt={username}
                                            />
                                        }
                                    />
                                </Link>
                            }
                            title={[
                                <small
                                    className="text-muted"
                                    style={{ marginRight: '0.5em' }}
                                >
                                    {username}
                                </small>,
                            ]}
                            description={[contents]}
                            style={{ marginBottom: '0.5em' }}
                        />

                        {requestUser === username && (
                            <Link
                                to={`/posts/edit/${postId}`}
                                className="btn btn-primary me-2"
                                style={{ marginTop: '0.5em' }}
                            >
                                수정
                            </Link>
                        )}

                        {requestUser === username && (
                            <Popconfirm
                                title="정말 삭제하겠습니까?"
                                okText="예"
                                cancelText="아니오"
                                onConfirm={() => handleDelete(id)}
                            >
                                <button
                                    className="btn btn-danger"
                                    style={{ marginTop: '0.5em' }}
                                >
                                    삭제
                                </button>
                            </Popconfirm>
                        )}

                        <CommentList post={post} />
                    </Card>
                </div>
            </>
        );
    }
}
