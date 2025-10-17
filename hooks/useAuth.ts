import { useAuthStore, userDataType } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { fetchUser, login, register } from '../api/auth';

interface UserDataApiResponse extends userDataType { accessToken?: string };

export interface authCredentials {
    email: string
    password: string
    accessToken?: string
    username?: string
}

export const useAuth = () => {
    const { setAuthState: storeLogin, clearAuthState } = useAuthStore();

    const { mutate: loginMutation, isPending: isLoginLoading, isError: isLoginError, ...loginMutationRest } = useMutation({
        mutationFn: ({ email, password }: authCredentials) => login(email, password),
        onSuccess: (data: UserDataApiResponse) => {
            storeLogin(data);
        },
    });

    const { mutate: signupMutation, isPending: isSignupLoading, isError: isSignupError, ...signupMutationRest } = useMutation({
        mutationFn: ({ email, password }: authCredentials) => register(email, password),
        onSuccess: (data: UserDataApiResponse) => {
            storeLogin(data);
        },
    });

    const { mutate: fetchUserMutation, isPending: isUserFetchingLoading, isError: isUserFetchingError, ...fetchUserMutationRest } = useMutation({
        mutationFn: () => fetchUser(),
        onSuccess: (data: UserDataApiResponse) => data && storeLogin(data)
    })

    return {
        loginMutation,
        signupMutation,
        fetchUserMutation,
        logout: () => {
            clearAuthState();
            return router.push('/Auth');
        },
        isLoginLoading,
        isSignupLoading,
        isLoginError,
        isSignupError,
        isUserFetchingLoading,
        isUserFetchingError,
        loginMutationRest,
        signupMutationRest,
        fetchUserMutationRest,
    };
};