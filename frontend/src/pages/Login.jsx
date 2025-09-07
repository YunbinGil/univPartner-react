// src/pages/Login.jsx

import Logo from '../assets/LOGO-l.svg?react'
import '../styles/index.css' 

export default function Login() {
  return (
    <main className="login-wrap">
      <div className="login-card">
        <Logo className="logo"/>
        <h1 className="brand">내제휴</h1>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="loginId">아이디</label>
            <input id="loginId" placeholder="아이디 입력" />
          </div>

          <div className="field">
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="password" placeholder="비밀번호 입력" />
          </div>

          <button className="submit">로그인 하기</button>
        </form>
            <a href="/signup" className="help-link">아직 회원이 아니신가요?</a>
            <a href="/forgot-password" className="help-link">비밀번호를 잊으셨나요?</a>
      </div>
    </main>
  );
}
