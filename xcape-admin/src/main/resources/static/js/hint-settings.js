let hintList = null;

// 힌트 리스트 조회
axios.get("/hints").then((res) => {
    const {resultCode, result} = res.data;

    if (resultCode === SUCCESS) {
        hintList = result;
    }
});

const getHintList = (e) => {
    const id = e.currentTarget.dataset.themeId;
    const themeHintList = hintList.filter((hint) => hint.themeId === parseInt(id));

    generateHintTable(themeHintList);
}

const generateHintTable = (themeHintList) => {
    const tbody = document.querySelector('#hintTable tbody');
    const hintTemplate = document.querySelector('#hintTemplate').innerHTML;

    tbody.innerHTML = themeHintList.map(hint => {
        return hintTemplate
            .replaceAll('{id}', hint.id)
            .replaceAll('{code}', hint.code)
            .replaceAll('{message1}', hint.message1)
            .replaceAll('{message2}', hint.message2)
            .replaceAll('{isUsed}', hint.isUsed ? '사용' : '미사용');
    }).join('');
};

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

// 가맹점 테마 select box 검증
// const checkSelectBox

document.querySelectorAll('#treeArea .accordion-body button').forEach((button) => {
    // 테마 목록 클릭 시, active 추가
    button.addEventListener('click', (e) => {
        document.querySelector('.list-group .active')?.classList.remove('active');
        button.classList.add('active');

        getHintList(e);
    });

});

document.querySelector('#merchantSelect').addEventListener('change', function () {
    const merchantId = this.value;
    const themeSelect = document.querySelector('#themeSelect');

    themeSelect.innerHTML = '';

    const template = document.querySelector('#themeOptionTemplate');
    const clone = document.importNode(template.content, true);
    themeSelect.appendChild(clone);

    if (merchantId) {
        axios.get(`/merchants/${merchantId}/themes`).then((res) => {
            const {resultCode} = res.data;
            if (resultCode === SUCCESS) {
                res.data.result.forEach(theme => {
                    let option = document.createElement('option');
                    option.value = theme.id;
                    option.textContent = theme.nameKo;
                    themeSelect.appendChild(option);
                });
            }
        });
    }
});

// 힌트 만들기 버튼 클릭 시, 지점 및 테마 셀렉트 박스 초기화
document.querySelector('#hintCreateModalButton').addEventListener('click', () => {

    document.querySelector('form[name="hint"]').classList.remove('was-validated');

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

// 모달창 생성 시, 폼 초기화
document.querySelector('#hintCreateModal').addEventListener('show.bs.modal', () => {
    document.querySelector('form[name="hint"]').classList.remove('was-validated');
    document.querySelector('form[name="hint"]').reset();
});

document.querySelector('#hintCreateButton').addEventListener('click', () => {
    const hintCreateForm = document.querySelector('form[name="hint"]');
    const form = new FormData(hintCreateForm);

    if (hintCreateForm.checkValidity()) {
        form.set('isUsed', document.querySelector('#createIsUsed').checked);
        form.set('themeId', document.querySelector('#themeSelect').value);

        axios.post('/hints', form)
            .then((res) => {
                const {resultCode} = res.data;
                if (resultCode === SUCCESS) {
                    alert(SAVE_SUCCESS);
                    location.reload();
                } else {
                    alert(SAVE_FAIL);
                }
            })
            .catch(console.error);
    } else {
        hintCreateForm.classList.add('was-validated');
    }
});