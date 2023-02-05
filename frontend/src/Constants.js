// 호스팅 설정
export const API_HOST =
    // 환경변수 설정시 설정한 호스팅으로 없다면 localhost로 호스팅지정
    process.env.REACT_APP_API_HOST || 'http://127.0.0.1:8000';
