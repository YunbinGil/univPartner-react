// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

// SVG를 React 컴포넌트로
import Logo_s from '../assets/LOGO-s.svg?react';
import Alarm from '../assets/icon-alarm.svg?react';
import Menu from '../assets/icon-menu.svg?react';

import ScrapBtn from '../assets/btn-scrap.svg?react';
import MapBtn from '../assets/btn-map.svg?react';
import HomeBtn from '../assets/btn-home.svg?react';
import MyPageBtn from '../assets/btn-mypage.svg?react';
import RecentBtn from '../assets/btn-recent.svg?react';

import Search from '../assets/icon-search.svg?react';
import FilterBtn from '../assets/btn-filter.svg?react';

export default function Home() {
  const nav = useNavigate();

  const univ = localStorage.getItem('univ');
  const dept = localStorage.getItem('dept');
  const major = localStorage.getItem('major');

  return (
    <div className="page">
      {/* Figma 프레임(1440px)을 가운데 고정 */}
      <div className="frame1440">
        {/* 좌측 장식 로고 */}
        <div className="abs" style={{ left: 122, top: 77, width: 95, height: 102 }}>
          <Logo_s className="svg-fit" aria-hidden />
        </div>

        {/* 타이틀 / 서브텍스트 */}
        <h1 className="abs home-title h2" style={{ left: 234, top: 120 }}>내제휴</h1>
        <div className="abs home-sub-wrap" style={{ left: 243, top: 214 }}>
          <div className="home-sub-accent h3">{univ} {dept} {major}</div>
          <div className="home-sub h3">의 제휴혜택들을 알아볼까요?</div>
        </div>

        {/* 우측 상단 아이콘(버튼) — 원본 좌표를 'right'로 변환해 프레임 기준 고정 */}
        <button className="icon-btn proto-hover" onClick={() => nav('/alarm')}
         style={{ top: 113, right: 'calc(50% - 720px + 180px)', width: 48, height: 48 }} aria-label="알림">
          <Alarm className="icon-btn svg" />
        </button>
        <button className="icon-btn proto-hover" onClick={() => nav('/menu')}
        style={{ top: 112, right: 'calc(50% - 720px + 112px)', width: 48, height: 48 }} aria-label="메뉴">
          <Menu className="icon-btn svg"/>
        </button>

        {/* 검색창(709 x 52) */}
        <div className="abs search-bar" style={{ left: 280, top: 351, width: 709, height: 52 }}>
          <div className="search-inner">
            <div className="search-left">
              <div className="icon-24"><Search className="svg-fit" aria-hidden /></div>
              <input className="search-input m1 " placeholder="검색어 입력" />
            </div>
            <button type="button" className="search-filter proto-press" aria-label="상세조건">
              <div className="icon-24"><FilterBtn className="svg-fit" aria-hidden /></div>
              <span className="filter-text m3">상세조건</span>
            </button>
          </div>
        </div>

        {/* 하단 도크(좌표: left 430, top 446, gap 84, 아이콘 48) */}
        <div className="abs dock" style={{ left: 330, top: 446 }}>
          <button className="dock-item proto-hover" onClick={() => nav('/map')}>
            <div className="dock-ico"><MapBtn className="svg-fit" /></div>
            <div className="dock-label m1">제휴맵</div>
          </button>
          <button className="dock-item proto-hover" onClick={() => nav('/scrap')}>
            <div className="dock-ico"><ScrapBtn className="svg-fit" /></div>
            <div className="dock-label m1">스크랩</div>
          </button>
          <button className="dock-item proto-hover" onClick={() => nav('/home')}>
            <div className="dock-ico"><HomeBtn className="svg-fit" /></div>
            <div className="dock-label m1">홈</div>
          </button>
          <button className="dock-item proto-hover" onClick={() => nav('/mypage')}>
            <div className="dock-ico"><MyPageBtn className="svg-fit" /></div>
            <div className="dock-label m1">마이페이지</div>
          </button>
          <button className="dock-item proto-hover" onClick={() => nav('/recent')}>
            <div className="dock-ico"><RecentBtn className="svg-fit" /></div>
            <div className="dock-label m1">최근 본</div>
          </button>
        </div>
      </div>
    </div>
  );
}
