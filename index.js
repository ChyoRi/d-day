// 전역 변수

const toYearSpan = document.querySelector('.to-year');
const toMonthSpan = document.querySelector('.to-month');
const toDateSpan = document.querySelector('.to-date');
const addModal = document.querySelector('.addmodal');
const addModalBtn = document.querySelector('.add-modal-btn');
const dim = document.querySelector('.dim');

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
    dim.style.display = 'block';
    dateTitle.value = '';
    dateInput.value = '';
}

// D-DAY 모달 Exit 함수

const modalExit = () => {
    addModal.style.opacity = '0';
    dim.style.display = 'none';
}

// Delete Button Click Event Listener
const deleteButtonClickEvent = (e) => {
    const target = e?.target;
    console.log(target);
}

const deleteButtonClickEventListener = () => {
    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(btn => {
        btn?.removeEventListener('click', deleteButtonClickEvent);
        btn.addEventListener('click', deleteButtonClickEvent);
    });
}

// list print

const makeList = (ddayTitle, dday, ddayCalc) => {
    const ddayWrap = document.querySelector('.dday-list-wrap');
    let list = document.createElement('li');
    list.classList.add('dday-list');
    list.innerHTML = `
        <div class="thumb"></div>
        <div class="dday-title-wrap">
            <h3 class="dday-title">${ddayTitle}</h3>
            <span class="criterion">${dday}</span>
        </div>
        <div class="dday-wrap">
            <span class="dday">D${ddayCalc}</span>
        </div>
        <div class="ddaybtn-wrap">
            <button class="delete">삭제</button>
        </div>
    `;

    ddayWrap.appendChild(list);

    
    deleteButtonClickEventListener();
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
    dim.style.display = 'none';
}

// D-day 삭제 함수

const deleteDate = () => {
    window.confirm("정말로 이 D-Day를 삭제하시겠습니까?");
}

// 이벤트 리스너

addModalBtn.addEventListener('click', addModalOpen);
addBtn.addEventListener('click', addDate);
exitBtn.addEventListener('click', modalExit);