let tagList = null;

axios.get('/tags').then((res) => {
    if (res.data.resultCode === SUCCESS) {
        tagList = res.data.result;
    }
});

const getThemeListByMerchantId = async (merchantId) => {
    return await axios.get(`/merchants/${merchantId}/themes`)
        .then((res) => {
            if (res.data.resultCode === SUCCESS) {
                return res.data.result;
            }
        });
}

const getTagListByThemeId = async (themeId) => {
    const params = {themeId}

    return await axios.get('/tag-search', {params})
        .then((res) => {
            if (res.data.resultCode === SUCCESS) {
                return res.data.result;
            }
        });
}

document.querySelector('#merchantSelect').addEventListener('change', (e) => {
    const {value} = e.target;
    const defaultThemeSelect = document.querySelector('#defaultSelect').innerHTML;

    if (value !== '') {
        getThemeListByMerchantId(value).then(themeList => {
            const themeSelectOption = document.querySelector('#themeSelectOption').innerHTML;
            let themeSelectOptionDom = defaultThemeSelect;

            themeList.forEach(({id: themeId, nameKo: themeName}) => {
                themeSelectOptionDom += interpolate(themeSelectOption, {themeId, themeName});
            });

            document.querySelector('#themeSelect').innerHTML = themeSelectOptionDom;
        });
    } else {
        document.querySelector('#themeSelect').innerHTML = defaultThemeSelect;
    }
});

document.querySelector('#themeSelect').addEventListener('change', (e) => {
    const {value} = e.target;
    if (value !== '') {
        getTagListByThemeId(value).then((tagList) => {
            const tagListGroupItem = document.querySelector('#tagListGroupItem').innerHTML;
            let tagListGroupItemDom = '';

            if (tagList.length === 0) {
                tagListGroupItemDom = '현재 테마에 태그가 없습니다.';
            } else {
                tagList.forEach(({id: tagId, name: tagName}) => {
                    tagListGroupItemDom += interpolate(tagListGroupItem, {tagId, tagName});
                });
            }

            document.querySelector('#tagListGroupArea').innerHTML = tagListGroupItemDom;
        });
    } else {
        document.querySelector('#tagListGroupArea').innerHTML = '<p>테마를 선택해주세요.</p>';
    }
});



