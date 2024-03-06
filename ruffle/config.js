window.RufflePlayer = window.RufflePlayer || {};
window.RufflePlayer.config = {
    "showSwfDownload": true,
    "backgroundColor":  "#000",
};

var style = document.createElement('style');
style.innerHTML = `
    player {
        width: 100vw;
        height: 100vh;
    }
`;
document.head.appendChild(style);