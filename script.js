// https://happyted.github.io/my-web-page

async function subscribe() {
    push = new AKPush();

    const e = document.getElementById('emailInput').value.trim()
    const n = document.getElementById('nameInput').value.trim()
    const l = document.getElementById('lnameInput').value.trim()

    push.initSubscription(
        { 
            email: (e == null || e == "") ? '_ex@example.com': e, 
            _fname: (n == null || n == "") ? navigator.appName : n,
            _lname: (l == null || l == "") ? 'lastname': l
        }
    )

    window.token = await localforage.getItem(push.config.randomPrefix + 'current_token')

    document.getElementById('subInstanse').textContent = window.token

    console.log("MY TOKEN - " + token)
}

function handlePushEvent(event){
    // Логирование и отправка push сообщения в сервис. Правильное завершение service-worker

    console.log('Push message received:', event);

    push_data = {}

    // Проверяем, есть ли данные в push-сообщении, если есть достаём их и выводим

    if (event.data) {
        push_data = event.data.json();
        console.log('Push data:', push_data);
    } else {
        console.log('Push event does not have data.');
    }

    const title = push_data.title || push_data.notification.title || 'Default title';
    const options = {
        body: push_data.body || push_data.notification.body || 'Default body',
        icon: push_data.icon || push_data.notification.icon || 'icon.png',
        badge: push_data.badge || push_data.notification.badge || 'badge.png'
    };

    return push_data
}

function sendPush(data){
    // запись в сервис
    options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: data
    };

    // URL сервиса
    const url = 'http://push-test-lab.qa.altcraft.com:8080/v1/messages/save';

    console.log("Try sending push message in service...")
    // Отправка запроса
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Разбираем JSON-ответ
        })
        .then(data => {
            console.log('Success:', data); // Обработка данных ответа
        })
        .catch(error => {
            console.error('Error:', error); // Обработка ошибок
        });


    // Предотвращение преждевременного завершения service worker. Правильная остановка и показ пуша
    
    event.waitUntil(    
        self.registration.showNotification(title, options)
    );
}

window.subscribe = subscribe;
window.handlePushEvent = handlePushEvent;


window.onload(() => {
                
    self.addEventListener('push', function(event) {
        window.handlePushEvent(event)
        data = window.handlePushEvent(event);
    });
    
    intervalId = setInterval( 
        () => {
            document.getElementById('subInstanse').textContent = window.token
        },
        100)
});
