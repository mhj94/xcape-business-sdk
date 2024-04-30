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
            document.querySelector('form[name="modifyMerchantInfo"] input[name="parkingYn"]').checked = merchant.parkingYn;
            document.querySelector('form[name="modifyMerchantInfo"] input[name="useYn"]').checked = merchant.useYn;
            document.querySelector('#modifyBrandInfoNotionId').value = merchant.brandInfoNotionId;
            document.querySelector('#modifyUsingInfoNotionId').value = merchant.usingInfoNotionId;
            document.querySelector('#modifyAddressInfoNotionId').value = merchant.addressInfoNotionId;
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const tableRowId = document.querySelectorAll('#merchantTable tbody tr');
    tableRowId.forEach(row => {
        row.addEventListener('click', getMerchantInformation);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 모달 객체 생성
    const createMerchantForm = new bootstrap.Modal(document.getElementById('merchantModifyModal'), {
        // 모달창 esc 기능 활성화
        keyboard: true
    });

    document.querySelectorAll('#merchantTable tbody tr').forEach(function (row) {
        row.addEventListener('click', function () {
            createMerchantForm.show();
        });
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

    if(merchantModifyForm.checkValidity()) {
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