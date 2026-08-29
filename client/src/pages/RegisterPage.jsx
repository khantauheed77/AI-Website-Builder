import React, { useState } from "react";
import { registerPageStyles as s } from "../assets/dummyStyles";
import AuthShell from "../components/AuthShell";
import { Input } from "../assets/ui";
import { Link, useNavigate } from "react-router-dom";
import { apiError, register } from "../utils/api";
// Renders the register page component.
const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  // for onchange
  function update(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: undefined }));
      setSubmitError("");
    };
  }
  // to submit the data nd get otp
  async function handleSubmit(e) {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = "Enter your name";
    if (!form.email.includes("@")) er.email = "Enter a valid email";
    if (form.password.length < 6) er.password = "Atleast 6 charachters";
    setErrors(er);

    if (Object.keys(er).length) return;
    setLoading(true);

    try {
      const result = await register(form);
      if (!result?.ok || !result?.email) {
        throw new Error(result?.error || result?.message || "Could not send verification code");
      }
      const params = new URLSearchParams({ email: result.email });
      navigate(`/verify-email?${params.toString()}`);
    } catch (error) {
      setSubmitError(apiError(error));
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthShell
      title="Sign Up"
      subtitle="Enter your information to create an account"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className={s.signInLink}>
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className={s.form}>
        <Input
          label="Name"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={update("name")}
          error={errors.name}
          autoComplete="name"
        />
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
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your Password"
          value={form.password}
          onChange={update("password")}
          error={errors.password}
          autoComplete="new-password"
        />

        {submitError && <p className={s.submitError}>{submitError}</p>}

        <button type="submit" disabled={loading} className={s.submitButton}>
          {loading ? "Sending code..." : "Send verification code"}
        </button>
        <div className={s.infoBox}>
          <div className={s.infoRow}>
            <span className={s.infoDotIndigo}></span>
            We'll email a 6-digit code. Enter it to verify, then sign in.
          </div>
          <div className={s.infoRow}>
            <span className={s.infoDotEmerald}></span>
            You get <span className={s.infoHighlight}>20 free credits</span> on
            first login.
          </div>
        </div>
      </form>
    </AuthShell>
  );
};

export default RegisterPage;
