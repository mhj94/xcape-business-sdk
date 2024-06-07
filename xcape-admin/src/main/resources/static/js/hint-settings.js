const getHintList = (e) => {
    const id = e.currentTarget.dataset.themeId;
    axios.get(`/themes/${id}/hints`).then((res) => {
        const {resultCode} = res.data;
        if (resultCode === SUCCESS) {
            const tbody = document.querySelector('#hintTable tbody');
            const template = document.querySelector('#hintTemplate').innerHTML;

            tbody.innerHTML = res.data.result.map(hint => {
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
    button.addEventListener('click', getHintList)
});

// 테마 목록 클릭 시, active 추가
document.querySelectorAll('.list-group button').forEach(list => {
    list.addEventListener('click', () => {
        document.querySelector('.list-group .active')?.classList.remove('active');
        list.classList.add('active');
    })
})