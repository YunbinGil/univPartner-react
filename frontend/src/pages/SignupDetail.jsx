// src/pages/SignupAcademic.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import "../styles/signupDetail.css";
import { checkExists, signupDetail } from '../services/userService';
import { getUnivList, getDeptList, getMajorList } from '../services/schoolService';

import Logo_s from '../assets/LOGO-s.svg?react';
import ArrowDown from '../assets/btn-arrowDown.svg';

import Dialog from '../components/dialog.jsx';

export default function SignupDetail() {
  const nav = useNavigate();

  // 입력 상태
  const [nickname, setNickname] = useState("");
  const [univ, setUniv] = useState("");
  const [dept, setDept] = useState("");
  const [major, setMajor] = useState("");

  // 드롭다운 open 상태(디자인용)
  const [openUniv, setOpenUniv] = useState(false);
  const [openDept, setOpenDept] = useState(false);
  const [openMajor, setOpenMajor] = useState(false);

  // 목록 상태
  const [univList, setUnivList] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [majorList, setMajorList] = useState([]);

  // 다이얼로그/검증 상태
  const [dlgOpen, setDlgOpen] = useState(false);
  const [dlg, setDlg] = useState({ title: '', message: '', onClose: null });
  const [nickChecked, setNickChecked] = useState(false);


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

  // 1) 대학 목록 로드
  useEffect(() => {
    (async () => {
      try {
        const list = await getUnivList();
        setUnivList(list || []);
      } catch (e) {
        console.error(e);
        openDialog({ title: '오류', message: '대학교 목록을 불러오지 못했습니다.' });
      }
    })();
  }, []);

  // 2) univ 변경 시, 단과대 목록 로드 + 하위 리셋
  useEffect(() => {
    (async () => {
      setDept(""); setMajor("");
      setDeptList([]); setMajorList([]);
      if (!univ) return;
      try {
        const list = await getDeptList(univ);
        setDeptList(list || []);
      } catch (e) {
        console.error(e);
        openDialog({ title: '오류', message: '단과대 목록을 불러오지 못했습니다.' });
      }
    })();
  }, [univ]);

  // 3) dept 변경 시, 학과 목록 로드 + 하위 리셋
  useEffect(() => {
    (async () => {
      setMajor("");
      setMajorList([]);
      if (!univ || !dept) return;
      try {
        const list = await getMajorList(univ, dept);
        setMajorList(list || []);
      } catch (e) {
        console.error(e);
        openDialog({ title: '오류', message: '학과 목록을 불러오지 못했습니다.' });
      }
    })();
  }, [univ, dept]);

  async function onCheckNickname(e) {
    if (!nickname.trim()) {
      openDialog({ title: '중복확인', message: '닉네임을 입력하세요.' });
      return;
    }
    try {
      const res = await checkExists(nickname, 'nickname');
      if (res.exists) {
        setNickChecked(false);
        openDialog({ title: '중복확인', message: '이미 존재하는 닉네임입니다 ❌' });
      } else {
        setNickChecked(true);
        openDialog({ title: '중복확인', message: '사용 가능한 닉네임입니다 ✅' });
      }
    } catch (e) {
      console.error(e);
      openDialog({ title: '오류', message: '중복확인 중 문제가 발생했습니다.' });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!nickChecked) { openDialog({ title: '회원가입', message: '닉네임 중복확인을 해주세요.' }); return; }
    if (!univ || !dept || !major) { openDialog({ title: '회원가입', message: '학과 정보를 모두 입력해주세요.' }); return; }
    try {
      const res = await signupDetail({ nickname, univ, dept, major: major });
      if (res.resultCode === 200) {
        localStorage.setItem('univ', String(univ));
        localStorage.setItem('dept', String(dept));
        localStorge.setItem('major', String(major));
        openDialog({
          title: '상세정보 설정 성공',
          message: ' 시작하기 버튼을 눌러 홈으로 이동합니다.',
          onClose: () => nav('/home')
        });
      } else {
        openDialog({ title: '상세정보 입력 실패', message: res.message || '잠시 후 다시 시도해주세요.' });
      }
    } catch (err) {
      console.error(err);
      openDialog({ title: '네트워크 오류', message: '서버와 통신 중 오류가 발생했습니다.' });
    }
  }


  return (
    <div className="signup-ac-root">
      {/* 좌상단 작은 타이틀 */}
      <Logo_s className="signup-logo" aria-hidden onClick={() => nav('/')} />
      <h2 className="page-h2 h2">내제휴</h2>
      {/* 큰 타이틀 */}
      <h1 className="page-h1 h1">어서오삼 :3</h1>

      {/* 본문 카드 */}
      <div className="signup-ac-card">
        {/* 닉네임 + 중복확인 */}
        <div className="row-id">
          <label className="label m1" htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            className="input-control m1"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button className="btn btn-primary btn-52 m1-semiB"
            onClick={onCheckNickname}>중복확인</button>
        </div>

        {/* 섹션 타이틀 */}
        <div className="section-title m1" >학과 정보입력</div>

        {/* 대학교 */}
        <div className="row">
          <label className="label w-83 m1" htmlFor="sel-univ">대학교</label>
          <div className={`select-wrap m1 ${openUniv ? "open" : ""}`}>
            <select
              id="sel-univ"
              className="select-control"
              value={univ}
              onChange={(e) => setUniv(e.target.value)}
              onClick={() => setOpenUniv((v) => !v)}
              onBlur={() => setOpenUniv(false)}
            >
              <option value="" disabled>대학교 선택</option>
              {univList.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <img src={ArrowDown} alt="" aria-hidden className="select-arrow" />
            {/* 이거 아이콘 벡터이미지 저장해서 불러오기 */}
          </div>
        </div>

        {/* 단과대 */}
        <div className="row">
          <label className="label w-83 m1" htmlFor="sel-Dept">단과대</label>
          <div className={`select-wrap m1 ${openDept ? "open" : ""}`}>
            <select
              id="sel-Dept"
              className="select-control"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              onClick={() => setOpenDept((v) => !v)}
              onBlur={() => setOpenDept(false)}
              disabled={!univ}
            >
              <option value="" disabled>단과대 선택</option>
              {deptList.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <img src={ArrowDown} alt="" aria-hidden className="select-arrow" />
          </div>
        </div>

        {/* 학과 */}
        <div className="row">
          <label className="label w-83 m1" htmlFor="sel-Major">학과</label>
          <div className={`select-wrap m1 ${openMajor ? "open" : ""}`}>
            <select
              id="sel-Major"
              className="select-control"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              onClick={() => setOpenMajor((v) => !v)}
              onBlur={() => setOpenMajor(false)}
              disabled={!dept}
            >
              <option value="" disabled>학과 선택</option>
              {majorList.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <img src={ArrowDown} alt="" aria-hidden className="select-arrow" />
          </div>
        </div>

        {/* 시작하기 버튼 */}
        <div className="footer">
          <button className="btn btn-primary btn-lg m1-semiB"
            onClick={onSubmit}>시작하기</button>
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