function decomposeHangul(char: string) {
  const BASE_CODE = 0xac00;
  const CHOSUNG = 588;
  const JUNGSUNG = 28;

  // 초성, 중성, 종성 리스트
  const CHOSUNG_LIST = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",: string
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const JUNGSUNG_LIST = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const JONGSUNG_LIST = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  let uniValue = char.charCodeAt(0) - BASE_CODE;
  let chosungIndex = Math.floor(uniValue / CHOSUNG);
  let jungsungIndex = Math.floor(
    (uniValue - CHOSUNG * chosungIndex) / JUNGSUNG
  );
  let jongsungIndex = uniValue % JUNGSUNG;

  return [
    CHOSUNG_LIST[chosungIndex],
    JUNGSUNG_LIST[jungsungIndex],
    JONGSUNG_LIST[jongsungIndex],
  ];
}

function composeHangul(chosung: string, jungsung: string, jongsung: string) {
  const BASE_CODE = 0xac00;
  const CHOSUNG = 588;
  const JUNGSUNG = 28;

  // 초성, 중성, 종성 리스트
  const CHOSUNG_LIST = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const JUNGSUNG_LIST = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const JONGSUNG_LIST = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  let chosungIndex = CHOSUNG_LIST.indexOf(chosung);
  let jungsungIndex = JUNGSUNG_LIST.indexOf(jungsung);
  let jongsungIndex = JONGSUNG_LIST.indexOf(jongsung);

  let uniValue =
    BASE_CODE +
    chosungIndex * CHOSUNG +
    jungsungIndex * JUNGSUNG +
    jongsungIndex;
  return String.fromCharCode(uniValue);
}

export default function replaceChosung(char: string): string {
  if (char < "가" || char > "힣") return char;
  let [chosung, jungsung, jongsung] = decomposeHangul(char);
  let newChosung = chosung;
  if (chosung === "ㄱ" || chosung === "ㄲ") newChosung = "ㅋ";
  if (chosung === "ㅂ" || chosung === "ㅃ") newChosung = "ㅍ";
  if (chosung === "ㅈ" || chosung === "ㅉ") newChosung = "ㅊ";
  if (chosung === "ㄷ" || chosung === "ㄸ") newChosung = "ㅌ";

  return composeHangul(newChosung, jungsung, jongsung);
}
