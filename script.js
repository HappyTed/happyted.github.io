function greetUser() {
    const name = document.getElementById('nameInput').value;
    const message = name ? `Привет, ${name}!` : 'Пожалуйста, введите ваше имя.';
    document.getElementById('greetingMessage').innerText = message;
}

function _(){

}