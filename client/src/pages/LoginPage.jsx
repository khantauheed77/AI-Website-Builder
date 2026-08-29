import React, { useState } from 'react';
import { loginPageStyles as s  } from '../assets/dummyStyles';
import AuthShell from '../components/AuthShell';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { apiError, changePassword, login } from '../utils/api';
import { CheckCircle2 } from 'lucide-react';
import { Input } from '../assets/ui';

// Renders the login page component.
const LoginPage = () => {
    const navigate = useNavigate()
    const { loginUser } = useAuth()
    const [params] = useSearchParams()

    const initialEmail = params.get('email') || ""
    const justVerified = params.get('verified') === "1"

    const [form,setForm] = useState({email : initialEmail, password : ""}) 
    const [errors , setErrors] = useState({})
    const [submitError,setSubmitError] = useState(null)
    const [loading,setLoading] = useState(false)

    // for change 
    function update(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: undefined }));
      setSubmitError("");
    };
  }
    // to get login
    async function handleSubmit(e){
        e.preventDefault()
        const er = {}
        if(!form.email.includes("@")) er.email = "Enter a valid email"
        if(form.password.length < 6) er.password = "Atleast 6 characters"
        setErrors(er)

        if(Object.keys(er).length) return
        setLoading(true)

        try{
            const {token,user} = await login(form)
            loginUser(token,user)
            navigate("/dashboard")

        } catch (error) {
            const status = error?.response?.status
            const data = error?.response?.data;
            if(status === 403 && data?.needsVerification && data.email){
                navigate(`/verify-email?email=${encodeURIComponent(data.email)}`)
                return;
            }
            setSubmitError(apiError(error))
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <AuthShell title='Sign In' subtitle='Enter your email below to login to your account '
        footer={<>
            Don't have an account? {" "}  
            <Link to="/register" className={s.signUpLink}>
                Sign Up
            </Link>
        </>}>
            <form onSubmit={handleSubmit} className={s.form}>
                {justVerified && (
                    <div className={s.verifiedBanner}>
                        <CheckCircle2 className={s.verifiedIcon}/>
                        Email verified - sign in to get your 20 free credits. 
                    </div>
                )}
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={update("email")}
                    error={errors.email}
                    autoComplete="email"
                />
                <div>
                    <div className={s.passwordRow}>
                        <label htmlFor="password" className={s.passwordLabel}>Password</label>
                        <Link to='/forgot' className={s.forgotLink}>Forgot Your Password ?</Link>
                    </div>
                    <Input id="password" 
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={update("password")}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                    />
                    
                </div>
                {submitError && <p className={s.errorText}>{submitError}</p>}
                <button type="submit" disabled={loading} className={s.submitButton}>
                    {loading ? "Signing in..." : "Login"}
                </button>
            </form>
        </AuthShell>
    );
}

export default LoginPage;
