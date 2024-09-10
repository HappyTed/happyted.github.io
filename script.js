
async function subscribe() {
    push = new AKPush();

    push.initSubscription({ email: document.getElementById('emailInput').value.trim()+'_ex@example.com' })

    //window.token = await localforage.getItem(push.config.randomPrefix + 'current_token')

    //document.getElementById('subInstanse').textContent = window.token

   //console.log("MY TOKEN - " + token
}


window.subscribe = subscribe;
