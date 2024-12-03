const BASE_URL ='http://localhost:3000';


export function loadImageToCanvas(userInfo) {
    const profileCanvas = document.getElementById('profileCanvas');
    const ctx = profileCanvas.getContext('2d');
    const img = new Image();
    img.src =`${BASE_URL}/${userInfo.profile}`;

    img.onload = function() {
        ctx.clearRect(0, 0, profileCanvas.width, profileCanvas.height);
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img, 0, 0, profileCanvas.width, profileCanvas.height);
        ctx.globalAlpha = 1.0;
    };

    return img;
}



export function setupProfileImageChange(userInfo) {
    const profileImageInput = document.getElementById('profileImage');
    const profileCanvas = document.getElementById('profileCanvas');
    const ctx = profileCanvas.getContext('2d');

    let lastUploadedImage = loadImageToCanvas(userInfo); 


    profileImageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;

                img.onload = function() {
                    const targetWidth = 100;
                    const targetHeight = 100;
                    const aspectRatio = img.width / img.height;
                    let drawWidth = targetWidth;
                    let drawHeight = targetHeight;

                    if (aspectRatio > 1) { 
                        drawHeight = targetHeight;
                        drawWidth = targetHeight * aspectRatio;
                    } else { 
                        drawWidth = targetWidth;
                        drawHeight = targetWidth / aspectRatio;
                    }

                    ctx.clearRect(0, 0, profileCanvas.width, profileCanvas.height);
                    ctx.globalAlpha = 0.7; 
                    ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
                    ctx.globalAlpha = 1.0;
                };
            };

            reader.readAsDataURL(file);
        } else if (lastUploadedImage) {
            ctx.clearRect(0, 0, profileCanvas.width, profileCanvas.height);
            ctx.globalAlpha = 0.7;
            ctx.drawImage(lastUploadedImage, 0, 0, profileCanvas.width, profileCanvas.height);
            ctx.globalAlpha = 1.0;
        }
    });
}
