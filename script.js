// https://happyted.github.io/my-web-page

function subscribe() {
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
}

function handlePushEvent(event){
    // Логирование и отправка push сообщения в сервис. Правильное завершение service-worker

    self.addEventListener('push', function(event) {

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
    
        // запись в сервис
        const response_options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            // body: JSON.stringify(data) // Преобразование данных в формат JSON
            body: push_data
        };

        return push_data
    });
}

window.Subscribe = subscribe;
window.handlePushEvent = handlePushEvent;