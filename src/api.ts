import { User } from './components/SignIn';

const headers = new Headers(
    {"Content-Type": "application/json",
        "Accept":"application/json"});
const domain = '';


type httpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

async function request<T>(url:string, method: httpMethods, payload?: any): Promise<T> {
    const options: RequestInit = {
        body: JSON.stringify(payload),
        headers,
        method,
    };
    const response = await fetch(domain + url, options);
    return await response.json() as T;
}

export interface SignInPayload {
    username: string,
    password: string,
}

interface SignUpResponse {
    errors?: {
        message: string,
        field: string
    },
    user?: User
}

export async function signIn(payload: SignInPayload): Promise<User> {
    return request<User>('/sign-in', 'POST', payload);
}

export interface SignUpPayload {
    username: string,
    password: string
}
export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
    return request<SignUpResponse>('/sign-up', 'POST', payload);
}

export async function me() {
    return request<User | null>('/me', 'GET');
}

export interface Comment {
    id: number,
    name: string,
    surname: string,
    comment: string,
}

export async function getComments(): Promise<Comment[]> {
    return request<Comment[]>('/comment', 'GET')
}

export async function logout() {
    return request('/logout', 'POST');
}
