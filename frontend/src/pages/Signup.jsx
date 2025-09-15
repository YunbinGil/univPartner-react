import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../styles/signup.css';
import '../styles/components/dialog.css';
import { signup, checkExists } from '../services/userService';

import Logo_l from '../assets/LOGO-l.svg?react';
import Dialog from '../components/dialog.jsx';

export default function Signup() {
  const nav = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const [idChecked, setIdChecked] = useState(false);
  const [dlgOpen, setDlgOpen] = useState(false);
  const [dlg, setDlg] = useState({ title: '', message: '', onClose: null });

  function openDialog({ title, message, onClose }) {
    setDlg({ title, message, onClose: onClose || null });
    setDlgOpen(true);
  }
  function closeDialog() {
    setDlgOpen(false);
    const cb = dlg.onClose;
    setDlg({ title: '', message: '', onClose: null });
    cb?.();
  }

  async function onCheckId(e) {
    if (!loginId.trim()) {
      openDialog({ title: '중복확인', message: '아이디를 입력하세요.' });
      return;
    }
    try {
      const res = await checkExists(loginId);
      if (res.exists) {
        setIdChecked(false);
        openDialog({ title: '중복확인', message: '이미 존재하는 아이디입니다 ❌' });
      } else {
        setIdChecked(true);
        openDialog({ title: '중복확인', message: '사용 가능한 아이디입니다 ✅' });
      }
    } catch (e) {
      console.error(e);
      openDialog({ title: '오류', message: '중복확인 중 문제가 발생했습니다.' });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!idChecked) { openDialog({ title: '회원가입', message: '아이디 중복확인을 해주세요.' }); return; }
    if (pw.length < 6) { openDialog({ title: '회원가입', message: '비밀번호는 6자 이상이어야 합니다.' }); return; }
    if (pw !== pw2) { openDialog({ title: '회원가입', message: '비밀번호가 일치하지 않습니다.' }); return; }
    try {
      const res = await signup({ loginId, pwd: pw });
      if (res.resultCode === 200) {
        localStorage.setItem('signupUserId', String(res.user.userId));
        openDialog({
          title: '회원가입',
          message: '회원가입 성공! 다음 단계로 이동합니다.',
          onClose: () => nav('/signup-detail')
        });
      } else {
        openDialog({ title: '회원가입 실패', message: res.message || '잠시 후 다시 시도해주세요.' });
      }
    } catch (err) {
      console.error(err);
      openDialog({ title: '네트워크 오류', message: '서버와 통신 중 오류가 발생했습니다.' });
    }
  }


  return (
    <div className="signup-root">
      <Logo_l className="signup-logo" aria-hidden onClick={() => nav('/')} />
      <div className="signup-title h2" >내제휴</div>
      <div className="signup-subtitle h3" >회원가입</div>

      {/* <form onSubmit={onSubmit}></form> */}
      <div className="signup-card">
        {/* 아이디 + 중복확인 */}
        <div className="row-id">
          <label className="label m1">아이디</label>
          <input
            type="text"
            className="input-control m1"
            placeholder="아이디 입력"
            value={loginId}
            onChange={(e) => {
              setLoginId(e.target.value);
              if (idChecked) setIdChecked(false);
            }}
          />
          <button className="btn btn-primary btn-52 m1-semiB"
            onClick={onCheckId}>중복확인</button>
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
          <button className="btn btn-primary btn-lg m1-semiB"
            disabled={!idChecked || pw.length < 6 || pw !== pw2}
            onClick={onSubmit}
          >가입하기</button>
        </div>
      </div>
      <Dialog
        open={dlgOpen}
        title={dlg.title}
        message={dlg.message}
        onClose={closeDialog}
      />
    </div>
  );
}
