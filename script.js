(function() {
	/**
	 * Render images
	 * run transparency check for each image
	 */
	const img = new Image();
	const canvas = document.getElementById("myCanvas");
	const context = canvas.getContext("2d");

	img.onload = () => {
		redraw(context);
		canvas.height = img.height;
		canvas.width = img.width;
		context.drawImage(img, 0, 0);

		const imgData = context.getImageData(0, 0, img.width, img.height);
		if (isTransparent(imgData.data)) {
			console.log("Image is transparent");
			alert("Image is Transparent :)");
		} else {
			console.log("Image is not transparent");
			alert("Image is not transparent :(");
		}
	};

	function redraw(ctx) {
		// clear the canvas
		ctx.clearRect(0, 0, img.width, img.height);

		// redraw one or more things based on their javascript objects
		ctx.beginPath();
		ctx.closePath();
		ctx.fill();
	}
	function isTransparent(imageData) {
		let isTransparent = false;
		for (let i = 0; i < imageData.length; i += 4) {
			if (imageData[i + 3] < 255) {
				isTransparent = true;
			}
		}
		return isTransparent;
	}
	function onImageLoad(e) {
		if (e.target.readyState === FileReader.DONE) {
			img.src = e.target.result;
		}
	}
	function onFileSelect(e) {
		redraw(context);
		let files = e.target.files; // FileList object
		let file = files[0];
		if (file.type.match("image.*")) {
			let reader = new FileReader();
			// Read in the image file as a data URL.
			reader.readAsDataURL(file);
			reader.onload = onImageLoad;
		} else {
			alert("not an image");
		}
		// fire the upload here
	}
	document.getElementById("image").onchange = onFileSelect;
})();
