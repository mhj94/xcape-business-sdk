const getHintList = (e) => {
    const id = e.currentTarget.dataset.themeId;
    axios.get(`/themes/${id}/hints`).then((res) => {
        const {resultCode, result} = res.data;
        if (resultCode === SUCCESS) {
            const tbody = document.querySelector('#hintTable tbody');
            const template = document.querySelector('#hintTemplate').innerHTML;

            tbody.innerHTML = result.map(hint => {
                return template
                    .replaceAll('{id}', hint.id)
                    .replaceAll('{code}', hint.code)
                    .replaceAll('{message1}', hint.message1)
                    .replaceAll('{message2}', hint.message2)
                    .replaceAll('{isUsed}', hint.isUsed ? '사용' : '미사용');
            }).join('');
        }
    });
}

document.querySelectorAll('#treeArea .accordion-body button').forEach((button) => {
    button.addEventListener('click', getHintList);
});

// 테마 목록 클릭 시, active 추가
document.querySelectorAll('.list-group button').forEach(list => {
    list.addEventListener('click', () => {
        document.querySelector('.list-group .active')?.classList.remove('active');
        list.classList.add('active');
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
    const merchantSelect = document.querySelector('#merchantSelect');
    const themeSelect = document.querySelector('#themeSelect');

    merchantSelect.selectedIndex = 0;
    themeSelect.selectedIndex = 0;

    const template = document.querySelector('#themeOptionTemplate');
    const clone = document.importNode(template.content, true);
    themeSelect.innerHTML = '';
    themeSelect.appendChild(clone);
});