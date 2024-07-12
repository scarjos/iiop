const id = [
	vid,
	begshare,
	endshare,
	begrec,
	endrec
] = [
	"video",
	"startScreenShare",
	"stopScreenShare",
	"startRecording",
	"stopRecording",
].map(id => document.getElementById(id));

let stream, record;
begshare.addEventListener("click", async()=>{
	stream = await navigator.mediaDevices.getDisplayMedia();
	record = new MediaRecorder(stream);
	video.srcObject = stream;
	begrec.disabled=false;
	endshare.disabled=false;
});

endshare.addEventListener("click", async()=>{
	stream.getTracks().forEach(track => track.stop());
	video.srcObject = null;
	
	endshare.disabled=true;
	begrec.disabled=true;
	endrec.disabled=true;
});

begrec.addEventListener("click", async()=>{
	let setnam = "screen-rec.webm",
		  handle = await window.showSaveFilePicker({ setnam });
			writable = await handle.createWriteable();
	record.start();
	record.addEventListener("dataavailable", async (event) => {
		await writable.write(event.data);
		if (record.state == "inactive"){ await writable.close(); }
	});
	endrec.disabled=false;
});


endrec.addEventListener("click", ()=> { record.stop(); endrec.disabled=true; }

