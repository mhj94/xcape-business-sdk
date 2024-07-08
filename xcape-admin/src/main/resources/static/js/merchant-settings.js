const getMerchantInformation = (e) => {
    const id = e.currentTarget.dataset.merchantId;
    axios.get(`/merchants/${id}`).then((res) => {
        const {resultCode} = res.data;
        const merchant = res.data.result;
        if (resultCode === SUCCESS) {
            document.modifyMerchantInfo.action = `/merchants/${merchant.id}`;
            document.querySelector('#merchantId').value = merchant.id
            document.querySelector('#modifyMerchantName').value = merchant.name;
            document.querySelector('#modifyTelNumber').value = merchant.telNumber;
            document.querySelector('#modifyAddress').value = merchant.address;
            document.querySelector('#modifyBusinessHour').value = merchant.businessHour;
            document.querySelector('#modifyCeoName').value = merchant.ceoName;
            document.querySelector('#modifyBusinessRegistrationNumber').value = merchant.businessRegistrationNumber;
            document.querySelector('#modifyEmail').value = merchant.email;
            document.querySelector('#modifyCode').value = merchant.code;
            document.querySelector('#modifyDisplayName').value = merchant.displayName;
            document.querySelector('form[name="modifyMerchantInfo"] input[name="parkingYn"]').checked = merchant.parkingYn;
            document.querySelector('form[name="modifyMerchantInfo"] input[name="useYn"]').checked = merchant.useYn;
            document.querySelector('#modifyBrandInfoNotionId').value = merchant.brandInfoNotionId;
            document.querySelector('#modifyUsingInfoNotionId').value = merchant.usingInfoNotionId;
            document.querySelector('#modifyAddressInfoNotionId').value = merchant.addressInfoNotionId;
        }
    });
}

const merchantCreateModal = document.querySelector('#merchantCreateModal');
merchantCreateModal.addEventListener('show.bs.modal', function () {

    const merchantCreateForm = document.querySelector('form[name="merchant"]');
    merchantCreateForm.classList.remove('was-validated');
});

const tableRowId = document.querySelectorAll('#merchantTable tbody tr');
tableRowId.forEach(row => {
    row.addEventListener('click', getMerchantInformation);
});


const merchantModifyForm = new bootstrap.Modal(document.getElementById('merchantModifyModal'), {
    // 모달창 esc 기능 활성화
    keyboard: true
});

document.querySelectorAll('#merchantTable tbody tr').forEach(function (row) {
    row.addEventListener('click', function () {

        const modifyMerchantInfo = document.querySelector('form[name="modifyMerchantInfo"]');
        modifyMerchantInfo.classList.remove('was-validated');
        merchantModifyForm.show();
    });
});

document.querySelector('#merchantCreateButton').addEventListener('click', () => {
    const merchantCreateForm = document.querySelector('form[name="merchant"]');
    const form = new FormData(merchantCreateForm);

    if (merchantCreateForm.checkValidity()) {
        form.set('useYn', document.querySelector('#useYn').checked);
        form.set('parkingYn', document.querySelector('#parkingYn').checked);
        axios.post('/merchants', form)
            .then((res) => {
                const {resultCode} = res.data;
                if (SUCCESS === resultCode) {
                    alert(SAVE_SUCCESS);
                    location.reload();
                } else {
                    alert(SAVE_FAIL)
                }
            })
            .catch(console.error);
    } else {
        merchantCreateForm.classList.add('was-validated');
    }
});

document.querySelector('#merchantModifyButton').addEventListener('click', () => {
    const merchantId = document.querySelector('#merchantId').value;
    const merchantModifyForm = document.querySelector('form[name="modifyMerchantInfo"]')
    const merchantModifyModal = document.querySelector('#merchantModifyModal');
    const formData = new FormData(merchantModifyModal.querySelector('form[name="modifyMerchantInfo"]'));

    if (merchantModifyForm.checkValidity()) {
        formData.set('useYn', document.querySelector('#modifyUseYn').checked);
        formData.set('parkingYn', document.querySelector('#modifyParkingYn').checked);
        axios.put(`/merchants/${merchantId}`, formData)
            .then((res) => {
                const {resultCode} = res.data;
                if (resultCode === SUCCESS) {
                    alert('성공적으로 저장했습니다. 👏');
                    location.reload();
                } else {
                    alert('저장 중 에러가 발생했습니다. 😭')
                }
            })
            .catch(console.error);
    } else {
        merchantModifyForm.classList.add('was-validated');
    }
});

document.querySelector('#jsonPublishButton').addEventListener('click', function () {
    axios.get('/merchants')
        .then(res => {
            const {resultCode, result} = res.data;
            if (resultCode === SUCCESS) {
                const merchantList = result;
                merchantList.forEach(merchant => {

                    if (merchant.hasOwnProperty('themeList')) {
                        delete merchant.themeList;
                    }
                    if (merchant.hasOwnProperty('bannerList')) {
                        delete merchant.bannerList;
                    }
                });

                let form = new FormData();
                form.append('file', new File([JSON.stringify(merchantList)], JSON_FILE_NAME));
                form.append('type', JSON_FILE_TYPE.MERCHANT)

                axios.put('/json', form)
                    .then(res => {
                        const merchantPath = res.data;
                        if (merchantPath) {
                            alert(`가맹점 정보 주소: ${merchantPath}\n 발행 완료되었습니다.`);
                            return;
                        }
                        alert('발행에 실패했습니다.');
                    })
            }
        });
});
