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

// 발행
// document.querySelector('#jsonPublishButton').addEventListener('click', () => {
//     Promise.all([
//         axios.get('/tags'),
//         axios.get('/views')
//     ])
//         .then(([tagsResponse, viewResponse]) => {
//             const {resultCode: tagsResultCode, result: tagList} = tagsResponse.data;
//             const {resultCode: viewResultCode, result: viewList} = viewResponse.data;
//
//             if (tagsResultCode === SUCCESS && viewResultCode === SUCCESS) {
//                 // 태그 파일 업로드
//                 let tagForm = new FormData();
//                 tagForm.append('file', new File([JSON.stringify(tagList)], JSON_FILE_NAME));
//                 tagForm.append('type', JSON_FILE_TYPE.TAG);
//
//                 // 뷰 파일 업로드
//                 let viewForm = new FormData();
//                 viewForm.append('file', new File([JSON.stringify(viewList)], JSON_FILE_NAME));
//                 viewForm.append('type', JSON_FILE_TYPE.VIEW);
//
//                 const uploadTag = axios.put('/json', tagForm);
//                 const uploadView = axios.put('/json', viewForm);
//
//                 return Promise.all([uploadTag, uploadView])
//                     .then(([tagsResponse, viewResponse]) => {
//                         const tagPath = tagsResponse.data;
//                         const viewPath = viewResponse.data;
//                         if (tagPath && viewPath) {
//                             alert(`태그 : ${tagPath} 및 view : ${viewPath}\n 발행 완료되었습니다.`);
//                             return;
//                         }
//                         alert('발행에 실패했습니다.');
//                     });
//             }
//         });
//
// });


// 발행 버튼 클릭시 이벤트
document.querySelector('#jsonPublishButton').addEventListener('click', async () => {
    try {
        const [tagResponse, viewResponse] = await Promise.all([
            axios.get('/tags'),
            axios.get('/views')
        ]);

        await handleDataResponse(tagResponse, viewResponse);
    } catch (error) {
        alert('발행에 실패했습니다.');
    }
});

const handleDataResponse = async (tagResponse, viewResponse) => {
    const {resultCode: tagResultCode, result: tagResult} = tagResponse.data;
    const {resultCode: viewResultCode, result: viewResult} = viewResponse.data;

    if (tagResultCode !== SUCCESS || viewResultCode !== SUCCESS) {
        throw new Error('조회 실패');
    }

    // 병렬 처리
    // const [tagUploadResponse, viewUploadResponse] = await Promise.all([
    //     uploadJsonFile(tagResult, JSON_FILE_TYPE.TAG),
    //     uploadJsonFile(viewResult, JSON_FILE_TYPE.VIEW)
    // ]);

    const tagUploadResponse = await uploadJsonFile(tagResult, JSON_FILE_TYPE.TAG);
    const viewUploadResponse = await uploadJsonFile(viewResult, JSON_FILE_TYPE.VIEW);

    const tagPath = tagUploadResponse.data;
    const viewPath = viewUploadResponse.data;

    if (!tagPath || !viewPath) {
        throw new Error('파일 업로드 실패');
    }
    alert(`태그 : ${tagPath} 및 뷰 : ${viewPath}\n 발행이 완료되었습니다.`);
};

// 업로드
const uploadJsonFile = async (data, type) => {
    let form = new FormData();
    form.append('file', new File([JSON.stringify(data)], JSON_FILE_NAME));
    form.append('type', type);

    return await axios.put('/json', form);
};
