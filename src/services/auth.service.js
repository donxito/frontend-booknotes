import axios from "axios";


class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL 
        });
        // Set JWT token in the headers for every request
        this.api.interceptors.request.use((config) => {
            // retrieve the JWT token from local storage
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = {Authorization: `Bearer ${storedToken}`};
            }
            return config;
        });          
    }

    // Check if user is logged in
    isLoggedIn() {
    const authToken = localStorage.getItem("authToken");
    return !!authToken; // Returns true if authToken exists, false otherwise
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody)
        .then(response => {
            console.log("Response:", response); 
            const authToken = response.data.authToken;
            const userId = response.data.userId; // 
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("userId", userId) // 
            return response;
        })
};

    signup = (requestBody) => {
       
        return this.api.post("/auth/signup", requestBody)
            .then(response => {
                const authToken = response.data.authToken;
                localStorage.setItem("authToken", authToken);
                return response;
            })
    };

    verify = () => {
        return this.api.get("/auth/verify");
    };

    logout = () => {
        localStorage.removeItem("authToken");
    };
}

const authService = new AuthService();

export default authService;