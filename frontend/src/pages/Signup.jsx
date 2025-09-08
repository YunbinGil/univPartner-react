import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../styles/signup.css';

import Logo_l from '../assets/LOGO-l.svg?react';

export default function Signup() {
  const nav = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  return (
    <div className="signup-root">
      <Logo_l className="signup-logo" aria-hidden onClick={() => nav('/')} />
      <div className="signup-title">내제휴</div>

      <div className="signup-card">
        {/* 아이디 + 중복확인 */}
        <div className="row-id">
          <label className="label">아이디</label>
          <input
            type="text"
            className="input-control"
            placeholder="아이디 입력"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <button className="btn btn-primary btn-52">중복확인</button>
        </div>

        {/* 비밀번호 */}
        <div className="row">
          <div className="field full">
            <label className="label">비밀번호</label>
            <input
              type="password"
              className="input-control"
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
        </div>

        <p className="hint">*비밀번호에는 6자리 이상이어야 합니다.</p>

        {/* 비밀번호 확인 */}
        <div className="row">
          <div className="field full">
            <label className="label">비밀번호 확인</label>
            <input
              type="password"
              className="input-control"
              placeholder="비밀번호 재입력"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
            />
          </div>
        </div>

        <div className="footer">
          {pw && pw2 && pw !== pw2 && (
            <p className="error">비밀번호가 일치하지 않습니다.</p>
          )}
          <button className="btn btn-primary btn-lg">가입하기</button>
        </div>
      </div>
    </div>
  );
}
