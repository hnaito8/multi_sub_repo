const googleLanguages = {
  af: "アフリカーンス語",
  sq: "アルバニア語",
  am: "アムハラ語",
  ar: "アラビア語",
  az: "アゼルバイジャン語",
  eu: "バスク語",
  be: "ベラルーシ語",
  bn: "ベンガル語",
  bs: "ボスニア語",
  bg: "ブルガリア語",
  ca: "カタルーニャ語",
  ceb: "セブアノ語",
  ny: "ニャンジャ語",
  "zh-CN": "中国語（簡体字）",
  "zh-TW": "中国語（繁体字）",
  co: "コルシカ語",
  hr: "クロアチア語",
  cs: "チェコ語",
  da: "デンマーク語",
  nl: "オランダ語",
  en: "英語",
  eo: "エスペラント語",
  et: "エストニア語",
  tl: "フィリピン語",
  fi: "フィンランド語",
  fr: "フランス語",
  gl: "ガリシア語",
  ka: "ジョージア語",
  de: "ドイツ語",
  el: "ギリシャ語",
  gu: "グジャラート語",
  ht: "ハイチ語",
  ha: "ハウサ語",
  haw: "ハワイ語",
  he: "ヘブライ語",
  hi: "ヒンディー語",
  hmn: "モン語",
  hu: "ハンガリー語",
  is: "アイスランド語",
  id: "インドネシア語",
  ga: "アイルランド語",
  it: "イタリア語",
  ja: "日本語",
  jw: "ジャワ語",
  kn: "カンナダ語",
  kk: "カザフ語",
  km: "クメール語",
  ko: "韓国語",
  ku: "クルド語",
  ky: "キルギス語",
  lo: "ラオ語",
  la: "ラテン語",
  lv: "ラトビア語",
  lt: "リトアニア語",
  lb: "ルクセンブルク語",
  mk: "マケドニア語",
  mg: "マダガスカル語",
  ms: "マレー語",
  ml: "マラヤーラム語",
  mt: "マルタ語",
  mi: "マオリ語",
  mr: "マラーティー語",
  mn: "モンゴル語",
  my: "ビルマ語",
  ne: "ネパール語",
  no: "ノルウェー語",
  ps: "パシュトー語",
  fa: "ペルシャ語",
  pl: "ポーランド語",
  pt: "ポルトガル語",
  pa: "パンジャブ語",
  ro: "ルーマニア語",
  ru: "ロシア語",
  sm: "サモア語",
  gd: "スコットランド・ゲール語",
  sr: "セルビア語",
  st: "セソト語",
  sn: "ショナ語",
  sd: "シンド語",
  si: "シンハラ語",
  sk: "スロバキア語",
  sl: "スロベニア語",
  so: "ソマリ語",
  es: "スペイン語",
  su: "スンダ語",
  sw: "スワヒリ語",
  sv: "スウェーデン語",
  tg: "タジク語",
  ta: "タミル語",
  te: "テルグ語",
  th: "タイ語",
  tr: "トルコ語",
  uk: "ウクライナ語",
  ur: "ウルドゥー語",
  uz: "ウズベク語",
  vi: "ベトナム語",
  cy: "ウェールズ語",
  xh: "コーサ語",
  yi: "イディッシュ語",
  yo: "ヨルバ語",
  zu: "ズールー語",
};

const langColors = {};
const selectedLangs = [];
let inputLangCode = "ja";

// 初期化後に英語を追加（翻訳言語）
window.addEventListener("DOMContentLoaded", () => {
  inputLangSelect.value = "ja"; // 入力セレクトを日本語に設定
  langSelect.value = "en"; // 翻訳セレクトを英語に設定
  addLanguage(); // 英語を追加
});

const translationsDiv = document.getElementById("translations");
const originalDiv = document.getElementById("original");
const langSelect = document.getElementById("lang-select");
const inputLangSelect = document.getElementById("input-lang");

Object.entries(googleLanguages).forEach(([code, name]) => {
  const opt1 = document.createElement("option");
  opt1.value = code;
  opt1.textContent = `${name} (${code})`;
  langSelect.appendChild(opt1);

  const opt2 = document.createElement("option");
  opt2.value = code;
  opt2.textContent = `${name} (${code})`;
  inputLangSelect.appendChild(opt2);
});

// function getRandomColor() {
//   return `hsl(${Math.floor(Math.random() * 360)}, 80%, 65%)`;
// }

function addLanguage() {
  const lang = langSelect.value;
  if (!selectedLangs.includes(lang)) {
    selectedLangs.push(lang);
    // langColors[lang] = getRandomColor();

    const wrapper = document.createElement("div");
    wrapper.className = "subtitle translated";
    wrapper.id = `trans-wrapper-${lang}`;

    const span = document.createElement("span");
    span.id = `trans-${lang}`;
    span.style.color = langColors[lang];
    span.textContent = `${googleLanguages[lang]}: `;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "❌";
    removeBtn.onclick = () => removeLanguage(lang);

    wrapper.appendChild(span);
    wrapper.appendChild(removeBtn);
    translationsDiv.appendChild(wrapper);
  }
}

function removeLanguage(lang) {
  const idx = selectedLangs.indexOf(lang);
  if (idx > -1) selectedLangs.splice(idx, 1);
  document.getElementById(`trans-wrapper-${lang}`)?.remove();
}

function changeInputLanguage() {
  inputLangCode = inputLangSelect.value;
  restartRecognition();
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = inputLangCode;
recognition.continuous = true;
recognition.interimResults = false;

function startRecognition() {
  setRecognitionEvents();
  recognition.start();
}

function restartRecognition() {
  recognition.stop();
  recognition = new SpeechRecognition();
  recognition.lang = inputLangCode;
  recognition.continuous = true;
  recognition.interimResults = false;
  setRecognitionEvents();
  recognition.start();
}

function setRecognitionEvents() {
  recognition.onresult = async function (event) {
    const transcript = event.results[event.resultIndex][0].transcript;
    originalDiv.textContent = "入力音声: " + transcript;

    for (let lang of selectedLangs) {
      try {
        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLangCode}&tl=${lang}&dt=t&q=${encodeURIComponent(
            transcript
          )}`
        );
        const data = await res.json();
        const translatedText = data[0].map((item) => item[0]).join("");
        const targetSpan = document.getElementById(`trans-${lang}`);
        if (targetSpan)
          targetSpan.textContent = `${googleLanguages[lang]}: ${translatedText}`;
      } catch (err) {
        const targetSpan = document.getElementById(`trans-${lang}`);
        if (targetSpan)
          targetSpan.textContent = `${googleLanguages[lang]}: 翻訳エラー`;
      }
    }
  };

  recognition.onerror = function (e) {
    originalDiv.textContent = "エラー: " + e.error;
  };
}

startRecognition();
