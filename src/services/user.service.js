import axios from "axios";


class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL 
        });
        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`;
            }
            return config;
        });
    }
    // GET /users/:userId
    getUser = (userId) => {
        return this.api.get(`/users/${userId}`);
    };
    // PUT /users/:userId
    updateUser = (userId, requestBody) => {
        return this.api.put(`/users/${userId}`, requestBody);
    };
    // DELETE /users/:userId
    deleteUser = (userId) => {
        return this.api.delete(`/users/${userId}`);
    };

}
const userService = new UserService();
export default userService;















