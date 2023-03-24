let jszip = document.createElement("script");
jszip.onload = function () {
    let zip = new JSZip();
    let elements = document.getElementsByTagName("img");
    let count = 0;
    for (let i in elements) {
        let img = elements[i];
        console.log("add img ", img);
        if (!/^blob:/.test(img.src)) {
            console.log("invalid src");
            continue;
        }
        let can = document.createElement('canvas');
        let con = can.getContext("2d");
        can.width = img.width;
        can.height = img.height;
        con.drawImage(img, 0, 0, img.width, img.height);
        let imgData = can.toDataURL("image/png");
        zip.file("image" + count + ".png", imgData.substr(imgData.indexOf(',') + 1), {base64: true});
        count++;
    }
    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "Exported_File.zip");
    });
};
jszip.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.2.2/jszip.min.js';
document.body.appendChild(jszip);

let filesaver = document.createElement("script");
filesaver.onload = function () {
    window.saveAs = saveAs;
};
filesaver.src = "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js";
document.body.appendChild(filesaver);

