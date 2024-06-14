let hintList = null;
axios.get("/hints").then((res) => {
    const {resultCode, result} = res.data;

    if (resultCode === SUCCESS) {
        hintList = result;
    }
});

// 무작위 힌트 코드 생성
const createHintCode = () => {
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < 5; i++) {
        if (i < 3) {
            code += char[Math.floor(Math.random() * 26)];
        } else {
            code += char[Math.floor(Math.random() * 10) + 26];
        }
    }
    return code;
}


// 힌트 코드 검증
const hasCode = (hintCode) => {
    return hintList.some(hint => hint.code === hintCode);
}

// 최종 힌트 코드 생성
const generateHintCode = () => {
    let code = createHintCode();

    while (hasCode(code)) {
        code = createHintCode();
    }

    return code;
};

// const getHintList = (e) => {
//     const id = e.currentTarget.dataset.themeId;
//     axios.get(`/themes/${id}/hints`).then((res) => {
//         const {resultCode, result} = res.data;
//         if (resultCode === SUCCESS) {
//             const tbody = document.querySelector('#hintTable tbody');
//             const template = document.querySelector('#hintTemplate').innerHTML;
//
//             tbody.innerHTML = result.map(hint => {
//                 return template
//                     .replaceAll('{id}', hint.id)
//                     .replaceAll('{code}', hint.code)
//                     .replaceAll('{message1}', hint.message1)
//                     .replaceAll('{message2}', hint.message2)
//                     .replaceAll('{isUsed}', hint.isUsed ? '사용' : '미사용');
//             }).join('');
//         }
//     });
// }

document.querySelectorAll('#treeArea .accordion-body button').forEach((button) => {
    // 테마 목록 클릭 시, active 추가
    button.addEventListener('click', () => {
        document.querySelector('.list-group .active')?.classList.remove('active');
        button.classList.add('active');
    });

    // 해당 테마의 힌트리스트를 가져오는 로직
    button.addEventListener('click', () => {
        const {themeId} = button.dataset;

        const filteredHintList = hintList.filter((hint) => hint.themeId === parseInt(themeId));
        console.log(filteredHintList)
    });
});


// document.querySelector('#merchantSelect').addEventListener('change', function () {
//     const merchantId = this.value;
//     const themeSelect = document.querySelector('#themeSelect');
//
//     themeSelect.innerHTML = '';
//
//     const template = document.querySelector('#themeOptionTemplate');
//     const clone = document.importNode(template.content, true);
//     themeSelect.appendChild(clone);
//
//     if (merchantId) {
//         axios.get(`/merchants/${merchantId}/themes`).then((res) => {
//             const {resultCode} = res.data;
//             if (resultCode === SUCCESS) {
//                 res.data.result.forEach(theme => {
//                     let option = document.createElement('option');
//                     option.value = theme.id;
//                     option.textContent = theme.nameKo;
//                     themeSelect.appendChild(option);
//                 });
//             }
//         });
//     }
// });

// 힌트 만들기 버튼 클릭 시, 지점 및 테마 셀렉트 박스 초기화
document.querySelector('#hintCreateModalButton').addEventListener('click', () => {

    // 힌트 코드 주입
    document.querySelector('#createCode').value = generateHintCode();

    const merchantSelect = document.querySelector('#merchantSelect');
    const themeSelect = document.querySelector('#themeSelect');

    merchantSelect.selectedIndex = 0;
    themeSelect.selectedIndex = 0;

    const template = document.querySelector('#themeOptionTemplate');
    const clone = document.importNode(template.content, true);
    themeSelect.innerHTML = '';
    themeSelect.appendChild(clone);
});
