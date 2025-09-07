import { useEffect, useState } from 'react'
import { api } from '../lib/api'  // 위에서 만든 axios 인스턴스
import '../styles/common.css';

export default function exHome() {
  return (
    <div className="container">
      {/* 헤더 */}
      <header className="app-header">
        <div className="logo">내제휴</div>
        <div className="header-actions">
          <button className="btn">로그인</button>
          <button className="btn btn-primary">회원가입</button>
        </div>
      </header>
      {/* 검색 영역 */}
      <section style={{ marginTop: 16 }}>
        <div className="search-bar">
          <input className="search-input" placeholder="검색어를 입력하세요" />
          <button className="search-adv">상세조건</button>
          <div className="search-actions">
            <button className="btn">지도로 보기</button>
            <button className="btn btn-primary">검색</button>
          </div>
        </div>
      </section>

      {/* 섹션: 인기 제휴 */}
      <h2 className="section-title">인기 제휴</h2>
      <div className="list"> 
        <div className="list-item">
          <div className="item-title">교내 카페 30% 할인</div>
          <div className="item-meta"><span>카테고리: 음식</span><span>유형: 상시</span></div>
        </div>
        <div className="list-item">
          <div className="item-title">헬스장 1개월 무료</div>
          <div className="item-meta"><span>카테고리: 운동</span><span>유형: 이벤트</span></div>
        </div>
      </div>
    </div>
  );
}