if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {
        // регистрация сработала
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
        // регистрация прошла неудачно
        console.log('Registration failed with ' + error);
    });
};