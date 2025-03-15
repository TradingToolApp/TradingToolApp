import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOMAIN,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        const nextAuthCookies = process.env.NODE_ENV === 'production' ? "__Secure-next-auth.session-token" : "next-auth.session-token"

        const token = JSON.parse(localStorage.getItem(nextAuthCookies) + "");
        if (token) {
            // Configure this as per your backend requirements
            config.headers!["Authorization"] = token;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // if (error.response.status === 401) {
        //     if (window.location.pathname === "/login") {
        //         return;
        //     }
        //
        //     localStorage.removeItem("user");
        //     localStorage.removeItem("access-token");
        //     window.location.pathname = "/login";
        // }

        return Promise.reject(error);
    }
);

export default axiosClient;