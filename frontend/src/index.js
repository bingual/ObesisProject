import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Root from 'pages';
import { AppProvider } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // 라우터 매핑을 위해 BrowserRouter로 감싸줌
    <BrowserRouter>
        {/* contextapi 사용을 위해 감싸줌 */}
        <AppProvider>
            <Root />
        </AppProvider>
    </BrowserRouter>,
);

reportWebVitals();
