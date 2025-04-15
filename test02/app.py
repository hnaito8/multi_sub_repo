from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
from googletrans import Translator

app = Flask(__name__)
translator = Translator()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/translate", methods=["POST"])
def translate_audio():
    file = request.files["audio_data"]
    recognizer = sr.Recognizer()

    with sr.AudioFile(file) as source:
        audio = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio, language="ja-JP")
        print("認識テキスト:", text)
        # 翻訳言語を受け取る（例: "th"）
        lang = request.form.get("lang", "th")
        result = translator.translate(text, dest=lang)
        return jsonify({"original": text, "translated": result.text})
    except Exception as e:
        print("エラー:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
