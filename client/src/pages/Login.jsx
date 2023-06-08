import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!validateEmail(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    // 올바른 이메일 형식일 경우
    // POST method 실행 및 로그인 처리
    // 이 부분은 원하는 로직에 맞게 작성해주셔야 합니다.
    console.log("Login button clicked");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const validateEmail = (email) => {
    // 이메일 유효성 검사 로직을 구현해야 합니다.
    // 간단한 형식 확인 예시:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-md p-8">
        <input
          className="p-3 m-3 bg-white text-black"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-3 m-3 bg-white text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className="mt-3 p-3 rounded-md bg-gray-500 text-white"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
