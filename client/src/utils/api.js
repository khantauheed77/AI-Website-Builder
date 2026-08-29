import axios from 'axios'

//to use the backend url

const API = axios.create({
  baseURL : import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
    headers : {'Content-Type' : "application/json"}
})

// to pass the token
API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// if token is expired or session is expired
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || "";
    const isThirdParty = /\/(deploy|github)$/i.test(url);
    if (err.response?.status === 401 && !isThirdParty) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);

// Supports error.
export const apiError = (err) =>
  err?.response?.data?.error || err?.message || "Something went wrong";

// Supports body.
const body = (p) => p.then((r) => r.data);

// These Routes are for authentication  
export const register = (data) => body(API.post("/auth/register", data));
// Supports verify.
export const registerVerify = (email, code) =>
  body(API.post("/auth/register/verify", { email, code }));
// Supports resend.
export const registerResend = (email) =>
  body(API.post("/auth/register/resend", { email }));
// Supports login.
export const login = (data) => body(API.post("/auth/login", data));

// Gets me.
export const getMe = () => body(API.get("/auth/me"));
// Updates profile.
export const updateProfile = (data) => body(API.patch("/auth/me", data));
// Supports password.
export const changePassword = (data) =>
  body(API.patch("/auth/me/password", data));
// Deletes my account.
export const deleteMyAccount = () => body(API.delete("/auth/me"));
// Gets contributions.
export const getContributions = () => body(API.get("/auth/me/contributions"));

// Routes for Fogot Cases
export const forgotRequest = (email) =>
  body(API.post("/auth/forgot/request", { email }));
// Supports verify code.
export const forgotVerifyCode = (email, code) =>
  body(API.post("/auth/forgot/verify-code", { email, code }));
// Supports reset.
export const forgotReset = (email, code, newPassword) =>
  body(API.post("/auth/forgot/reset-password", { email, code, newPassword }));

// Community Routes we created in backend
export const getProjects = () => body(API.get("/projects"));
// Creates project.
export const createProject = (data) => body(API.post("/projects", data));
// Gets project.
export const getProject = (id) => body(API.get(`/projects/${id}`));
// Updates project.
export const updateProject = (id, data) =>
  body(API.patch(`/projects/${id}`, data));
// Deletes project.
export const deleteProject = (id) => body(API.delete(`/projects/${id}`));
// Generates project.
export const generateProject = (id, prompt) =>
  body(API.post(`/projects/${id}/generate`, { prompt }));
// Supports to github.
export const uploadToGithub = (id, data) =>
  body(API.post(`/projects/${id}/github`, data));
// Deploys to vercel.
export const deployToVercel = (id, data) =>
  body(API.post(`/projects/${id}/deploy`, data));


// Gets community.
export const getCommunity = (sort = "new") =>
  body(API.get(`/community?sort=${sort}`));
// Gets community project.
export const getCommunityProject = (id) => body(API.get(`/community/${id}`));
// Updates likes for community project.
export const likeCommunityProject = (id) =>
  body(API.post(`/community/${id}/like`));


// Gets packages.
export const getPackages = () => body(API.get("/payments/packages"));
// Creates checkout session.
export const createCheckoutSession = (packageId) =>
  body(API.post("/payments/create-checkout-session", { packageId }));
// Verifies session.
export const verifySession = (sessionId) =>
  body(API.post("/payments/verify-session", { sessionId }));

export default API;
