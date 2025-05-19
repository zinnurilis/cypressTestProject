import { useState, useEffect } from "react";

function Login({ onLoginSuccess }) {
  const initialForm = {
    email: "",
    password: "",
    terms: false,
  };

  const [form, setForm] = useState(initialForm);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    setIsButtonDisabled(!form.terms);
  }, [form.terms]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fakeUser = {
      email: "test@example.com",
      password: "Password123",
    };

    if (!form.terms) {
      setError("Lütfen şartları kabul edin.");
      return;
    }

    if (
      form.email === fakeUser.email &&
      form.password === fakeUser.password
    ) {
      setForm(initialForm);
      onLoginSuccess();
    } else {
      setError("Email veya şifre hatalı.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>

      <input
        type="email"
        name="email"
        placeholder="Email giriniz"
        value={form.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Şifre giriniz"
        value={form.password}
        onChange={handleChange}
      />
      <br />
      <label>
        <input
          type="checkbox"
          name="terms"
          checked={form.terms}
          onChange={handleChange}
        />
        Şartları kabul ediyorum
      </label>
      <br />
      <button type="submit" disabled={isButtonDisabled}>
        Login Ol
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Login;
