function a(b) {
    setTimeout(() => {
        console.log("hlo");
    }, 2000);
    b();
}

function b() {
    console.log("hello");
}

a(b);
