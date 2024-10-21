const message = document.getElementById('message')

window.electronAPI.onWindowEvent((event) => {
    message.innerText = event;
});