import { useAuthStore, userDataType } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/auth';

interface UserDataApiResponse extends userDataType { accessToken: string };

export interface authCredentials {
    email: string
    password: string
    accessToken?: string
    username?: string
}

export const useAuth = () => {
    const { setAuthState: storeLogin, clearAuthState } = useAuthStore();

    const { mutate: loginMutation, isPending: isLoginLoading, isError: isLoginError } = useMutation({
        mutationFn: ({ email, password }: authCredentials) => login(email, password),
        onSuccess: (data: UserDataApiResponse) => {
            storeLogin(data);
        },
    });

    const { mutate: signupMutation, isPending: isSignupLoading, isError: isSignupError } = useMutation({
        mutationFn: ({ email, password }: authCredentials) => register(email, password),
        onSuccess: (data: UserDataApiResponse) => {
            storeLogin(data);
        },
    });

    return {
        loginMutation,
        signupMutation,
        logout: clearAuthState,
        isLoginLoading,
        isSignupLoading,
        isLoginError,
        isSignupError,
    };
};