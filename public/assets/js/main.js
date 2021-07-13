//check if service workers are supported

if('serviceWorker' in navigator) {
    console.log('service wroker supported');
    navigator
    .serviceWorker
    .register('service-worker.js')
    .then(() => console.log('Service worker successfully registered'))
    .catch((error) => console.log('Service worker registration failed:', error))
}