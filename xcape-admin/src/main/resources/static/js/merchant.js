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