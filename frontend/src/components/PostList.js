import { Alert, Form, Input } from 'antd';
import { useAxios } from 'api';
import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import './Paging.scss';

export default function PostList() {
    const [postList, setPostList] = useState([]); // 게시글 상태값 설정

    // 페이징 처리 상태값
    const [page, setPage] = useState({});
    const [pageNum, setPageNum] = useState(1);

    // 검색 상태값 저장
    const [serach, Setsearch] = useState('');

    const [{ data: originPostList, loading, error }, refetch] = useAxios({
        url: `/api/posts/?page=${pageNum}&search=${serach}`,
    });

    // 마운트 됐을때 useAxios의 요청을 다시한번 보냄
    useEffect(() => {
        refetch();
    }, []);

    // originPostList 값이 변경될때 실행
    useEffect(() => {
        if (originPostList) {
            setPostList(originPostList.results);
            const { count } = originPostList;
            const pageData = { count };
            setPage(pageData);
        }
    }, [originPostList]);

    // 페이지 이동 함수
    const handlePageChange = (page) => {
        setPageNum(page);
    };

    // 검색 함수
    const handleFinish = (fieldValues) => {
        const { search } = fieldValues;
        Setsearch(search);
    };

    return (
        <div>
            <Link to={'/posts/new'} className="mb-3 btn btn-primary">
                게시글 작성
            </Link>
            <Form onFinish={handleFinish}>
                <Form.Item
                    name="search"
                    rules={[
                        {
                            required: false,
                            message: '검색할 내용을 입력해주세요.',
                        },
                    ]}
                >
                    <Input placeholder="제목/내용으로 검색" />
                </Form.Item>
            </Form>
            <table
                className="table table-striped table-hover"
                style={{ textAlign: 'center' }}
            >
                <thead className="bg-warning">
                    <tr>
                        <th>번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>생성일</th>
                    </tr>
                </thead>
                <tbody>
                    {postList && postList.length === 0 && (
                        <tr>
                            <td colSpan={4}>
                                <Alert
                                    type="warning"
                                    className="mt-3"
                                    message="게시글이 없습니다."
                                />
                            </td>
                        </tr>
                    )}
                    {postList &&
                        postList.map((post, id) => {
                            return (
                                <tr key={id}>
                                    <td>{post.id}</td>
                                    <td>{post.author.username}</td>
                                    <td>
                                        <Link to={`/posts/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td>
                                        {/* 날짜/시간을 포멧팅 해주는 라이브러리 */}
                                        {moment(post.created_at).format(
                                            'YYYY-MM-DD HH:mm:ss',
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>

            {/* 페이지 이동 라이브러리 */}
            {Object.keys(page).length !== 0 && (
                <Pagination
                    activePage={pageNum}
                    itemsCountPerPage={3}
                    totalItemsCount={page.count}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            )}
        </div>
    );
}
