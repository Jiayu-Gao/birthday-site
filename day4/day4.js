// 当前页面

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });

    document
        .getElementById(pageId)
        .classList.add("active");
}



// 页面1 → 页面2

const startCamera =
    document.getElementById("startCamera");

startCamera.addEventListener("click", () => {

    showPage("page2");

});



// 页面2 → 页面3

const streetCamera =
    document.getElementById("streetCamera");

streetCamera.addEventListener("click", () => {

    showPage("page3");

});



// 指令切换

const commandText =
    document.getElementById("commandText");

const commandButtons =
    document.querySelectorAll(".cmd-btn");

commandButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        commandText.textContent =
            btn.textContent;

    });

});



// 快门

const shutterBtn =
    document.getElementById("shutterBtn");

const flash =
    document.getElementById("flash");

shutterBtn.addEventListener("click", () => {

    flash.classList.add("show");

    setTimeout(() => {

        flash.classList.remove("show");

        showPage("page4");

    }, 700);

});



// 打开相册

const openAlbumBtn =
    document.getElementById("openAlbumBtn");

openAlbumBtn.addEventListener("click", () => {

    showPage("page5");

});



// 相册点击后显示文字

const albumImage =
    document.getElementById("albumImage");

const albumMessage =
    document.getElementById("albumMessage");

albumImage.addEventListener("click", () => {

    albumMessage.classList.add("show");

});



// 可选：进入取景框后自动换提示

const commands = [

    "smile a little",

    "look here",

    "don't move—",

    "closer"

];

let commandIndex = 0;

setInterval(() => {

    const page3 =
        document.getElementById("page3");

    if (
        page3.classList.contains("active")
    ) {

        commandIndex++;

        if (
            commandIndex >= commands.length
        ) {
            commandIndex = 0;
        }

        commandText.textContent =
            commands[commandIndex];

    }

}, 2500);