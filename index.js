// 전역 변수

const toYearSpan = document.querySelector('.to-year');
const toMonthSpan = document.querySelector('.to-month');
const toDateSpan = document.querySelector('.to-date');
const addModal = document.querySelector('.addmodal');
const addModalBtn = document.querySelector('.add-modal-btn');

// Modal 관련 변수

const dateTitle = document.querySelector('#date-title');
const dateInput = document.querySelector('#date');
const addBtn = document.querySelector('.add');
const exitBtn = document.querySelector('.exit');

// 오늘 날짜 

const toDayDate = new Date();

const toYear = toDayDate.getFullYear();
const toMonth = toDayDate.getMonth() + 1;
const toDate = toDayDate.getDate();

toYearSpan.innerText = toYear + '년';
toMonthSpan.innerText = toMonth + '월';
toDateSpan.innerText =  toDate + '일';

// D-DAY 모달 Open 함수

const addModalOpen = () => {
    addModal.style.opacity = '1';
}

// D-DAY 모달 Exit 함수

const modalExit = () => {
    addModal.style.opacity = '0';
}

// list print

const makeList = (ddayTitle, dday, ddayCalc) => {
    const ddayWrap = document.querySelector('.dday-list-wrap');
    let list = document.createElement('li');
    list.classList.add('dday-list');
    list.innerHTML = `
        <div class="thumb"></div>
        <h3 class="dday-title">${ddayTitle}</h3>
        <div class="dday-wrap">
            <span class="dday">D${ddayCalc}</span>
            <span class="criterion">${dday}</span>
        </div>
    `;

    ddayWrap.appendChild(list);
}

// D-day 추가 & 계산 함수

const addDate = () => {
    let ddayTitle = dateTitle.value;
    let dday = dateInput.value;
    let criterionDay = new Date(dday);
    let criterionDayMs = criterionDay.getTime();
    let ddayCalc = toDayDate - criterionDayMs;
    ddayCalc = Math.round(ddayCalc / (1000*60*60*24)); 

    if (ddayCalc > 0) {
        ddayCalc =  '+' + ddayCalc
    }

    makeList(ddayTitle, dday, ddayCalc);
    addModal.style.opacity = '0';
}

// 이벤트 리스너

addModalBtn.addEventListener('click', addModalOpen);
addBtn.addEventListener('click', addDate);
exitBtn.addEventListener('click', modalExit);