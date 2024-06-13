document.querySelectorAll('button.list-group-item').forEach(merchant => {
    merchant.addEventListener('click', (e) => {
        const {classList, dataset} = e.currentTarget;

        document.querySelectorAll('button.list-group-item').forEach(merchant => merchant.classList.remove('active'));
        classList.add('active');

    });
});

document.querySelector('#file').addEventListener('change', (e) => {
    const [file] = e.target.files;

    if (file) {
        const type = file.type;
        let previewDom;

        if (type.startsWith('image')) {
            previewDom = document.querySelector('#imagePreview').innerHTML;
        } else if (type.startsWith('audio')) {
            previewDom = document.querySelector('#audioPreview').innerHTML;
        } else if (type.startsWith('video')) {
            previewDom = document.querySelector('#videoPreview').innerHTML;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = interpolate(previewDom, {src: e.target.result})
            console.log('preview ',preview)
            document.querySelector('#filePreview').style.display = 'none';
            document.querySelector('#previewArea').innerHTML = '';
            document.querySelector('#previewArea').innerHTML = preview;
        }
        reader.readAsDataURL(file);
    }
});

document.querySelector('#uploadButton').addEventListener('click', () => {
    const [file] = document.querySelector('#file').files

    if (!file) {
        alert('업로드 할 파일이 없습니다.');
        return;
    }

    const selectedTheme = document.querySelector('button.list-group-item.active');

    if (!selectedTheme) {
        alert('선택된 테마가 없습니다.');
        return;
    }

    const {merchantId, themeId} = selectedTheme.dataset;

    const formData = new FormData();
    formData.append('file', file)
    formData.append('merchantId', merchantId)
    formData.append('themeId', themeId)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    axios.post('/files', formData, config)
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
});
