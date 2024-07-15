function subscribe() {
    document.getElementById('init_sub').addEventListener('click', () => {
        new AKPush().initSubscription({ email: document.getElementById('nameInput').value.trim()+'_ex@example.com' })
    });
}

function _(){
// https://happyted.github.io/my-web-page
}