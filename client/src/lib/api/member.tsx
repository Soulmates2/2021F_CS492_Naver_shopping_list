import client from './client';
// import { LoggerService } from '@nestjs/common';


// 찜한 상품들을 가져옵니다
export const getAllDibs = (userId: string) => {
    return client.get(`/api/users/dibs/${userId}`);
}

// 유저가 DB에 없으면 회원가입, 있으면 그대로 진행
export const loginOrSignup = (userId: string) => {
    return client.post('/api/users', { _id: userId, dibs: [] as string[] });
}

// 찜한 상품 추가
export const addUserDibs = (userId: string, productId: string) => {
    return client.patch(`/api/users/${userId}`,
        { data: { userId: userId, mode: 1, productId: productId } });
}

// 찜한 상품 삭제
export const deleteUserDibs = (userId: string, productId: string) => {
    return client.patch(`/api/users/${userId}`,
        { data: { userId: userId, mode: 2, productId: productId } });
}