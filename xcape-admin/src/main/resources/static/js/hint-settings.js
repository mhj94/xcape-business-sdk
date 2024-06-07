const getHintList = (e) => {
    const id = e.currentTarget.dataset.themeId;
    axios.get(`/themes/${id}/hints`).then((res) => {
        const {resultCode} = res.data;
        const hintList = res.data.result;
        if (resultCode === SUCCESS) {
            const tbody = document.querySelector('#hintTable tbody')
            tbody.innerHTML = '';
            hintList.forEach(hint => {
                const {id, code, message1, message2, isUsed} = hint;
                let html = document.querySelector('#hintTemplate').innerHTML;
                tbody.innerHTML += html
                    .replaceAll('{id}', id)
                    .replaceAll('{code}', code)
                    .replaceAll('{message1}', message1)
                    .replaceAll('{message2}', message2)
                    .replaceAll('{isUsed}', isUsed);
            });
        }
    });
}

document.querySelectorAll('#treeArea .accordion-body button').forEach((button) => {
    button.addEventListener('click', getHintList)
});