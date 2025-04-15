from flask import Flask, request, render_template
from deep_translator import GoogleTranslator

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def translate():
    translated_text = ""
    if request.method == "POST":
        text = request.form["text"]
        target_lang = request.form["language"]
        translated_text = GoogleTranslator(target=target_lang).translate(text)

    return render_template("index.html", result=translated_text)


if __name__ == "__main__":
    app.run(debug=True)
