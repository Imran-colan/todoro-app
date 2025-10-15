import ApiService from "./ApiService";

export const login = async (email: string, password: string) => {
    try {
        const response = await ApiService.post('/auth/login', {
            email, password
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const register = async (email: string, password: string) => {
    try {
        const response = await ApiService.post('/auth/register', {
            email, password
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}