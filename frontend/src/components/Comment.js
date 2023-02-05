import React from 'react';
import {
    Comment as AntdComment,
    Avatar,
    Button,
    Tooltip,
    Popconfirm,
} from 'antd';
import moment from 'moment';
import { useAppContext } from 'store';

export default function Comment({ comment, handleDelete }) {
    // 로그인한 유저의 정보를 불러옴
    const {
        store: { username: requestUser },
    } = useAppContext();

    const {
        id,
        author: { username, avatar_url },
        messages,
        created_at,
    } = comment;

    return (
        <AntdComment
            actions={
                username === requestUser && [
                    <Popconfirm
                        title="정말 삭제하겠습니까?"
                        okText="예"
                        cancelText="아니오"
                        onConfirm={() => handleDelete(id)}
                    >
                        <Button type="primary" style={{ marginTop: '0.5em' }}>
                            댓글 삭제
                        </Button>
                    </Popconfirm>,
                ]
            }
            author={username}
            avatar={<Avatar src={avatar_url} alt={username} />}
            content={<p>{messages}</p>}
            datetime={
                // moment : 날짜를 포멧팅해서 가공해주는 함수
                <Tooltip title={moment().format(created_at)}>
                    <span>{moment(created_at).fromNow()}</span>
                </Tooltip>
            }
        />
    );
}
