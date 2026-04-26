import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const message = error.response.data?.message;
            if (
                message === "Token is invalid or expired" || 
                message === "Token Missing" || 
                message === "User no longer exists" ||
                message === "Something Went Wrong While Validating the Token"
            ) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                // Redirecting will clear the redux state automatically on reload
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
