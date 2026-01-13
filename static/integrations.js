const toast = document.getElementById('toast');

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Скопировано');
    });
}

function showToast(message) {
    const toastSpan = toast.querySelector('span');
    toastSpan.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

document.getElementById('downloadShareX').addEventListener('click', () => {
    const config = {
        "Version": "14.1.0",
        "Name": "XyliUploader",
        "DestinationType": "ImageUploader",
        "RequestMethod": "POST",
        "RequestURL": "https://img.xyli.eu/upload",
        "Body": "MultipartFormData",
        "FileFormName": "file",
        "URL": "{json:link}",
        "DeletionURL": "{json:deletion_link}",
        "ErrorMessage": "{json:error}"
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'XyliUploader.sxcu';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Скачано');
});
