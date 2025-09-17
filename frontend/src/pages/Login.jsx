import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import Logo from '../assets/LOGO-l.svg?react'
import '../styles/login.css' 

export default function Login() {
  const nav = useNavigate();
  return (
    <main className="login-wrap">
      <div className="login-card">
        <Logo className="logo"/>
        <h1 className="brand h1">내제휴</h1>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="loginId" className='m1'>아이디</label>
            <input id="loginId" className='m1' placeholder="아이디 입력" />
          </div>

          <div className="field">
            <label htmlFor="password" className='m1'>비밀번호</label>
            <input id="password" className='m1' type="password" placeholder="비밀번호 입력" />
          </div>

          <button className="submit m1-semiB" onClick={() => nav('/home')}>로그인 하기</button>
        </form>
            <button className="help-link m1-semiB" onClick={() => nav('/signup')}>아직 회원이 아니신가요?</button>
            <a href="/forgot-password" className="help-link m1-semiB">비밀번호를 잊으셨나요?</a>
      </div>
    </main>
  );
}
