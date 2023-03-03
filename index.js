// 전역 변수

const toDay = document.querySelector('.today');
const toYearSpan = document.querySelector('.to-year');
const toMonthSpan = document.querySelector('.to-month');
const toDateSpan = document.querySelector('.to-date');
const addBtn = document.querySelector('.addition');

/* 오늘 날짜 */

const toDayDate = new Date();

const toYear = toDayDate.getFullYear();
const toMonth = toDayDate.getMonth() + 1;
const toDate = toDayDate.getDate();

toYearSpan.innerText = toYear + '년';
toMonthSpan.innerText = toMonth + '월';
toDateSpan.innerText =  toDate + '일';

// D-DAY 생성 함수

// const addDday = () => {
    
// }

// 이벤트 리스너

addBtn.addEventListener('click', addDday);