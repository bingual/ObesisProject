import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountsRoutes from './accounts';
import AppLayout from 'components/AppLayout';
import LoginRequiredPage from 'utils/LoginRequiredPage';
import Home from './Home';
import PostDetail from 'components/PostDetail';
import PostNewForm from 'components/PostNewForm';
import PostEditForm from 'components/PostEditForm';

const Root = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                {/* 계정관련 */}
                <Route path="/accounts/*" element={<AccountsRoutes />} />
                <Route path="/" element={<Home />} /> {/*  */}
                {/* 게시글 상세보기 */}
                <Route path="/posts/:postId" element={<PostDetail />} />
                {/* 로그인 여부 체크 */}
                <Route element={<LoginRequiredPage />}>
                    {/* 게시글 작성 */}
                    <Route path="/posts/new/" element={<PostNewForm />} />
                    {/* 게시글 수정 */}
                    <Route
                        path="/posts/edit/:postId"
                        element={<PostEditForm />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default Root;
