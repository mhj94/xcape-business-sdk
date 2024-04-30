const getMerchantInformation = (e) => {
    const id = e.currentTarget.dataset.merchantId;
    axios.get(`/merchants/${id}`).then((res)=> {
        const {resultCode} = res.data;
        const merchant = res.data.result;
        if (resultCode === SUCCESS) {
            document.merchantInfo.action = `/merchants/${merchant.id}`;
            document.querySelector('#modifyMerchantName').value = merchant.name;
            document.querySelector('#modifyTelNumber').value = merchant.telNumber;
            document.querySelector('#modifyAddress').value = merchant.address;
            document.querySelector('#modifyBusinessHour').value = merchant.businessHour;
            document.querySelector('#modifyCeoName').value = merchant.ceoName;
            document.querySelector('#modifyBusinessRegistrationNumber').value = merchant.businessRegistrationNumber;
            document.querySelector('#modifyEmail').value = merchant.email;
            document.querySelector('#modifyCode').value = merchant.code;
            document.querySelector('input[name="modifyParkingYn"]').checked = merchant.parkingYn;
            document.querySelector('input[name="modifyUseYn"]').checked = merchant.useYn;
            document.querySelector('#modifyBrandInfoNotionId').value = merchant.brandInfoNotionId;
            document.querySelector('#modifyUsingInfoNotionId').value = merchant.usingInfoNotionId;
            document.querySelector('#modifyAddressInfoNotionId').value = merchant.addressInfoNotionId;


        }
    });
}

document.addEventListener('DOMContentLoaded', function(){
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
        merchantCreateForm.classList.add('was-validated')
    }
});