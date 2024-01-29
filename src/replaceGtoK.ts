export default function replaceGToK(str) {
  const choSungBase = 0x1100;
  let result = "";

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    // 한글 유니코드 범위 체크
    if (char >= "\uAC00" && char <= "\uD7A3") {
      const uni = char.charCodeAt(0) - 0xac00;
      let cho = Math.floor(uni / 28 / 21);

      // 초성이 ㄱ 또는 ㄲ인 경우, ㅋ으로 변경
      if (cho === 0 || cho === 1) {
        cho = 2; // 'ㅋ'의 초성 인덱스
      }

      // 변경된 초성으로 새 문자 조합
      const jung = Math.floor((uni % (28 * 21)) / 28);
      const jong = uni % 28;
      const newChar = String.fromCharCode(
        choSungBase + cho,
        0x1161 + jung,
        jong ? 0x11a7 + jong : 0
      );
      result += newChar;
    } else {
      result += char;
    }
  }

  return result;
}
