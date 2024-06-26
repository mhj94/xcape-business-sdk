let hintList = null;

// 페이지 로딩 시, 힌트 리스트 조회
const getHintList = () => {
    return axios.get("/hints").then((res) => {
        const {resultCode, result} = res.data;

        if (resultCode === SUCCESS) {
            hintList = result;
        }
    });
}

getHintList();

const getHintListByTheme = (e) => {
    const id = e.currentTarget.dataset.themeId;
    const themeHintList = hintList.filter((hint) => hint.themeId === parseInt(id));

    generateHintTable(themeHintList);
}

// 힌트 테이블 생성
const generateHintTable = (themeHintList) => {
    const tbody = document.querySelector('#hintTableBody');
    const hintTemplate = document.querySelector('#hintTemplate').innerHTML;

    if (themeHintList.length === 0) {
        document.querySelector('#hintTableBody').innerHTML = '<div class="text-center bg-white py-2">데이터가 없습니다.</div>';
    } else {
        tbody.innerHTML = themeHintList.map((hint, index) => {
            return hintTemplate
                .replaceAll('{id}', hint.id)
                .replaceAll('{index}', index + 1)
                .replaceAll('{code}', hint.code)
                .replaceAll('{message1}', hint.message1)
                .replaceAll('{message2}', hint.message2)
                .replaceAll('{isUsed}', hint.isUsed ? '사용' : '미사용');
        }).join('');

        // 힌트 테이블 생성 시, row에 이벤트 추가
        document.querySelectorAll('.hintTableData').forEach(row => {
            row.addEventListener('click', handleHintRowClick);
        });
    }
};

const handleHintRowClick = (e) => {
    const row = e.currentTarget;
    const hintId = parseInt(row.dataset.hintId);
    const code = row.querySelector('.code').textContent;
    const message1 = row.querySelector('.message1').textContent;
    const message2 = row.querySelector('.message2').textContent;
    const isUsed = row.querySelector('.isUsed').textContent === '사용';

    // 모달 창 데이터 바인딩
    document.querySelector('#modifyHintId').value = hintId;
    document.querySelector('#modifyHintCode').value = code;
    document.querySelector('#modifyHintMessage1').value = message1;
    document.querySelector('#modifyHintMessage2').value = message2;
    document.querySelector('#modifyHintIsUsed').checked = isUsed;

    document.querySelector('#hintModifyModal form').classList.remove('was-validated');
    // 모달 창 표시
    const modifyModal = new bootstrap.Modal(document.getElementById('hintModifyModal'));
    modifyModal.show();
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

document.querySelectorAll('#treeArea .accordion-body button').forEach((button) => {
    // 테마 목록 클릭 시, active 추가
    button.addEventListener('click', (e) => {
        document.querySelector('.list-group .active')?.classList.remove('active');
        button.classList.add('active');

        getHintListByTheme(e);
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
    document.querySelector('#hintCode').value = generateHintCode();

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

// 힌트 생성
document.querySelector('#hintCreateButton').addEventListener('click', () => {
    const hintCreateForm = document.querySelector('form[name="hint"]');
    const formData = new FormData(hintCreateForm);

    if (hintCreateForm.checkValidity()) {
        formData.set('isUsed', document.querySelector('#hintIsUsed').checked);
        formData.set('themeId', document.querySelector('#themeSelect').value);

        axios.post('/hints', formData)
            .then((res) => {
                const {resultCode} = res.data;
                if (resultCode === SUCCESS) {
                    alert(SAVE_SUCCESS);

                    getHintList().then(() => {
                        // 현재 선택된 테마의 ID를 가져와서 필터링
                        const currentTheme = document.querySelector('.list-group-item.active');
                        if (currentTheme) {
                            const themeId = currentTheme.dataset.themeId;
                            const data = {currentTarget: {dataset: {themeId: themeId}}};
                            getHintListByTheme(data);
                        }

                    });

                    const hintCreateModal = bootstrap.Modal.getInstance(document.getElementById('hintCreateModal'));
                    hintCreateModal.hide();

                } else {
                    alert(SAVE_FAIL);
                }
            })
            .catch(console.error);
    } else {
        hintCreateForm.classList.add('was-validated');
    }
});

// 힌트 수정
document.querySelector('#hintModifyButton').addEventListener('click', () => {
    const hintModifyForm = document.querySelector('form[name="modifyHintInfo"]');
    const formData = new FormData(hintModifyForm);
    const hintId = formData.get('id');

    if (hintModifyForm.checkValidity()) {
        formData.set('isUsed', document.querySelector('#modifyHintIsUsed').checked);

        axios.put(`/hints/${hintId}`, formData)
            .then((res) => {
                const {resultCode} = res.data;
                if (resultCode === SUCCESS) {
                    alert(SAVE_SUCCESS);

                    getHintList().then(() => {
                        // 현재 선택된 테마의 ID를 가져와서 필터링
                        const currentTheme = document.querySelector('.list-group-item.active');
                        if (currentTheme) {
                            const themeId = currentTheme.dataset.themeId;
                            const data = {currentTarget: {dataset: {themeId: themeId}}};
                            getHintListByTheme(data);
                        }
                    });

                    const hintModifyModal = bootstrap.Modal.getInstance(document.getElementById('hintModifyModal'));
                    hintModifyModal.hide();

                } else {
                    alert(SAVE_FAIL);
                }
            })
            .catch(console.error);
    } else {
        hintModifyForm.classList.add('was-validated');
    }
});

// 힌트 발행
document.querySelector('#jsonPublishButton').addEventListener('click', () => {
    axios.get('/hints')
        .then((res) => {
            const {resultCode, result} = res.data;
            if (resultCode === SUCCESS) {
                const hintList = result;

                let form = new FormData();
                form.append('file', new File([JSON.stringify(hintList)], JSON_FILE_NAME));
                form.append('type', JSON_FILE_TYPE.HINT);

                axios.put('/json', form)
                    .then((res) => {
                        const hintPath = res.data;
                        if (hintPath) {
                            alert(`힌트 : ${hintPath}\n 발행 완료되었습니다.`);
                            return;
                        }
                        alert('발행에 실패했습니다.');
                    });
            }
        })
});


