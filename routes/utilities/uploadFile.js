const { storage, uploadBytes  } = require("../../config/firebase");
const { ref, getDownloadURL } = require('firebase/storage');


const uploadFiles = async (files, path) => {
    let urls = [];

    for (f in files) {
        const file = files[f];
        const timestamp = Date.now();
        const nt = file.originalname.split(".");
        const name = nt[0];
        const type = nt[1];

        const filename = name + "_" + timestamp + "." + type;
        const fileRef = ref(storage, path+filename);
        const metaData = {
            contentType : file.mimetype
        }

        try{
            const snapshot = await uploadBytes(fileRef, file.buffer, metaData);
            const url = await getDownloadURL(snapshot.ref);
            urls.push(url);
        }catch(e){
            //
        };
    }

    return urls;
}

module.exports = {  
    uploadFiles
}