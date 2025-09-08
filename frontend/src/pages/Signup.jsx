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
      <div className="signup-title h1" >내제휴</div>

      <div className="signup-card">
        {/* 아이디 + 중복확인 */}
        <div className="row-id">
          <label className="label m1">아이디</label>
          <input
            type="text"
            className="input-control m1"
            placeholder="아이디 입력"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <button className="btn btn-primary btn-52 m1-semiB">중복확인</button>
        </div>

        {/* 비밀번호 */}
        <div className="row">
          <div className="field full">
            <label className="label m1">비밀번호</label>
            <input
              type="password"
              className="input-control m1"
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
        </div>

        <p className="hint m1">*비밀번호에는 6자리 이상이어야 합니다.</p>

        {/* 비밀번호 확인 */}
        <div className="row">
          <div className="field full">
            <label className="label m1">비밀번호 확인</label>
            <input
              type="password"
              className="input-control m1"
              placeholder="비밀번호 재입력"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
            />
          </div>
        </div>

        <div className="footer">
          {pw && pw2 && pw !== pw2 && (
            <p className="error m1">비밀번호가 일치하지 않습니다.</p>
          )}
          <button className="btn btn-primary btn-lg m1-semiB">가입하기</button>
        </div>
      </div>
    </div>
  );
}
