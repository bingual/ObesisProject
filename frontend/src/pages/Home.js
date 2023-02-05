import React from 'react';
import { Outlet } from 'react-router-dom';
import PostList from 'components/PostList';

export default function Home() {
    return <PostList />;
}
