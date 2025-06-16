// Firebase 서버 URL
const url = 'https://youngchul-57854-default-rtdb.firebaseio.com/dday/dayList';

// REF
const headerToday = document.querySelector('.today-text'); // 해더 오늘 날짜
const listContainer = document.querySelector('.dday-list-wrap'); // D-Day가 뿌려질 컨테이너
const plusButton = document.querySelector('.add-modal-btn'); // 하단 + 아이콘 (버튼)
const createModal = document.querySelector('.addmodal'); // D-Day 추가 모달
const createModalCloseButton = document.querySelector('.exit'); // D-Day 추가 모달 닫기 버튼 (X모양)
const modalBackground = document.querySelector('.dim'); // D-Day 추가 모달 DIM
const createTitle = document.querySelector('#date-title'); // D-Day 추가 모달에 제목
const createInput = document.querySelector('#date'); // D-Day 추가 모달에 Date input
const submitButton = document.querySelector('.add'); // D-Day 추가 모달에 저장 버튼
const dateLabel = document.querySelector('label[for="date"]');
const dateInput = document.querySelector('input[type="date"]');

const delay = (s) => {
    return new Promise((success) => {
        setTimeout(() => success(), s);
    });
}

// const error = (s) => {
//     return new Promise((fulfilled, rejected) => {
//         setTimeout(() => rejected(), s);
//     });
// }

// 비동기
// error().then(() => {
//     console.log('성공');
// }).catch(() => {
//     console.log('실패');
// }).finally(() => {
//     console.log('끝')
// });

// 동기
// (async () => {
//     try {
//         await error();
//         console.log('성공');
//     } catch {
//         console.log('실패');
//     } finally {
//         console.log('끝')
//     }
// })();


const fadeIn = (...list) => {
    let action = async (el) => {
        el.style.transition = '0s';
        el.style.opacity = 0;
        el.style.display = 'flex';
        await delay(0.1);
        el.style.transition = '0.5s';
        el.style.opacity = 1;
    }
    list.forEach(li => action(li));
}

const fadeOut = (el) => {
    el.style.opacity = 0;
    setTimeout(() => el.style.display = 'none', 500);
    
}

// 서버에 있는 리스트 조회
const getList = async () => {
    let { data } = await axios.get(url + '.json');

    // data가 null인 경우 빈 배열로 처리
    if (!data) {
        render([]);
        return;
    }
    
    let keys = Object.keys(data);
    let values = Object.values(data);
    let result = values?.map((item, i) => ({...item, id: keys[i]}));
    render(result);
}

// 시작 함수 (1)
const init = () => {
    let now = new Date();
    let y = String(now?.getFullYear());
    let _m = now?.getMonth() + 1;
    let m = String(_m < 10 ? '0' + _m : _m);
    let _d = now?.getDate();
    let d = String(_d < 10 ? '0' + _d : _d);
    let result = `${y}년 ${m}월 ${d}일`;
    
    headerToday.innerText = result;
    getList();
}

// 모달 오픈
const modalOpen = () => {
    fadeIn(createModal, modalBackground);
}

// 모달 종료
const modalClose = () => {
    fadeOut(createModal);
    fadeOut(modalBackground);
    createTitle.value = '';
    createInput.value = '';
}

// 디데이 삭제
const deleteDate = async (e) => {
    const id = e?.target?.getAttribute('data-id');
    await axios.delete(url + '/' + id + '.json');
    alert('삭제되었습니다.');
    getList();
}

// 제목 수정 (서버 전송)
const submitModify = async (e) => {
    let title = e?.target?.value;
    let id = e?.target?.getAttribute('data-id');
    let date = e?.target?.getAttribute('data-date');
    let result = e?.target?.getAttribute('data-result');

    await axios.put(url + '/' + id + '.json', {title, date, result});
    getList();
}

// 제목 수정
const modifyTitle = (e) => {
    let target = e?.currentTarget;
    let id = target?.getAttribute('data-id');
    let targetSelector = 'h3[data-id="' + id + '"]';
    let span = document.querySelector(targetSelector + ' > span');
    let input = document.querySelector(targetSelector + ' > input');
    span.style.display = 'none';
    input.style.display = 'block';
    input.focus();
    input.addEventListener('blur', submitModify);
}

// 이벤트 등록
const eventListener = () => {
    const deleteButtons = document.querySelectorAll('.ddaybtn-wrap > .delete');
    deleteButtons.forEach(el => el.addEventListener('click', deleteDate));
    const modifyTitles = document.querySelectorAll('.dday-title');
    modifyTitles.forEach(el => el.addEventListener('click', modifyTitle));
}

// 화면 출력 (2)
const render = (list) => {
    listContainer.innerHTML = '';

    if (!list?.length) {
        listContainer.innerHTML = `
            <li class="none-item">
                <b>D-Day가 없습니다.</b>
                <span>D-Day를 등록해주세요.</span>
            </li>
        `;
        return;
    }

    let html = '';
    list?.forEach((item) => html += `
        <li class="dday-list">
            <div class="thumb"></div>
            <div class="dday-title-wrap">
                <h3 class="dday-title" data-id="${item?.id}">
                    <span>${item?.title ?? '-'}</span>
                    <input
                        data-id="${item?.id}" 
                        data-date="${item?.date}" 
                        data-result="${item?.result}" 
                        value="${item?.title ?? '-'}" 
                        hidden 
                    />
                </h3>
                <span class="criterion">${item?.date ?? '-'}</span>
            </div>
            <div class="dday-wrap">
                <span class="dday">${item?.result ?? '-'}</span>
            </div>
            <div class="ddaybtn-wrap">
                <button class="delete" data-id="${item?.id}">삭제</button>
            </div>
        </li>
    `);

    listContainer.innerHTML = html;
    eventListener();
}

// 디데이 저장
const submit = (data) => {
    axios.post(url + '.json', data).then(() => {
        getList();
        modalClose();
    });
}

// 유효성 검사 (3)
const vaildate = () => {
    let title = createTitle.value;
    let date = createInput.value;
    
    if (!title) return alert('제목을 입력해주세요.');
    if (date?.length < 10) return alert('날짜를 정확히 입력해주세요.');

    let now = new Date();
    let targetDate = new Date(date);
    let calc = Math.floor((now - targetDate) / 1000 / 60 / 60 / 24);
    let unit = calc < 0 ? '-' : '+';
    let result = `D${unit}${Math.abs(calc)}`;

    submit({title, date, result});
}

// 달력 input 보이기
// const dateInputOn = () => {
//     dateInput.style.display = 'block';
// }

// 이벤트 리스너
plusButton.addEventListener('click', modalOpen);
modalBackground.addEventListener('click', modalClose);
createModalCloseButton.addEventListener('click', modalClose);
submitButton.addEventListener('click', vaildate);
// dateLabel.addEventListener('click', dateInputOn);

// init
init();