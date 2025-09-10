// src/pages/SignupAcademic.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import "../styles/signupDetail.css";

import Logo_s from '../assets/LOGO-s.svg?react';
import ArrowDown from '../assets/btn-arrowDown.svg';
import ArrowUp from '../assets/btn-arrowUp.svg';

export default function SignupDetail() {
  const [nickname, setNickname] = useState("");
  const [univ, setUniv] = useState("");
  const [Dept, setDept] = useState("");
  const [Major, setMajor] = useState("");
  const [openUniv, setOpenUniv] = useState(false);
  const [openDept, setOpenDept] = useState(false);
  const [openMajor, setOpenMajor] = useState(false);

  const nav = useNavigate();

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
          <button className="btn btn-primary btn-52 m1-semiB" type="button">중복확인</button>
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
              <option value="Konkuk">건국대학교</option>
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
              value={Dept}
              onChange={(e) => setDept(e.target.value)}
              onClick={() => setOpenDept((v) => !v)}
              onBlur={() => setOpenDept(false)}
            >
              <option value="" disabled>단과대 선택</option>
              <option value="Engineering">공과대학</option>
              <option value="Business">경영대학</option>
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
              value={Major}
              onChange={(e) => setMajor(e.target.value)}
              onClick={() => setOpenMajor((v) => !v)}
              onBlur={() => setOpenMajor(false)}
            >
              <option value="" disabled>학과 선택</option>
              <option value="CS">컴퓨터공학부</option>
              <option value="EE">전자공학부</option>
            </select>
            <img src={ArrowDown} alt="" aria-hidden className="select-arrow" />
          </div>
        </div>

        {/* 시작하기 버튼 */}
        <div className="footer">
          <button className="btn btn-primary btn-lg m1-semiB" type="button" onClick={() => nav('/home')}>시작하기</button>
        </div>
      </div>
    </div>
  );
}