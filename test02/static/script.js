let mediaRecorder;
let audioChunks = [];

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            audioChunks = [];

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            document.getElementById("status").innerText = "ステータス: 録音中...";
        });
}

function stopRecording() {
    mediaRecorder.stop();

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio_data', audioBlob);
        formData.append('lang', document.getElementById("lang").value);

        document.getElementById("status").innerText = "ステータス: 処理中...";

        fetch("/translate", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById("status").innerText = "エラー: " + data.error;
                } else {
                    document.getElementById("original").innerText = data.original;
                    document.getElementById("translated").innerText = data.translated;
                    document.getElementById("status").innerText = "ステータス: 完了";
                }
            });
    };
}
