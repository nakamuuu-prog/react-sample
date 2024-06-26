import React, { useState, useEffect, useLayoutEffect } from "react";

const UPDATE_CYCLE = 1000;

const KEY_LOCALE = "KEY_LOCALE";

enum Locale {
  US = "en-US",
  JP = "ja-JP",
}

const getLocaleFromString = (text: string) => {
  switch (text) {
    case Locale.US:
      return Locale.US;
    case Locale.JP:
      return Locale.JP;
    default:
      return Locale.US;
  }
};

export const Clock = () => {
  const [timestamp, setTimestamp] = useState(new Date());
  const [locale, setLocale] = useState(Locale.US);

  // useEffectはpropsやstateが更新されて再描画が終わってから処理が実行される
  // 第二引数に空の配列を渡すことで初期描画が終わった直後のみ実行される
  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date());
    }, UPDATE_CYCLE);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // useLayoutEffectはDOMが更新された後、描画される前に実行される
  // useEffect：DOMの更新 => 再描画 => useEffect
  // useLayoutEffect：DOMの更新 => useLayoutEffect => 再描画
  // useEffectは描画後にlocalStorageから値を読み込んでからlocaleにセットするため、リロードするたびにチラつくことがある
  // useLayoutEffectは描画前に値をセットするため、チラつきを抑えることができる
  // => リロードしてもチラつかないので、あまり効果がわからない。実行されるタイミングだけ押さえておく
  useLayoutEffect(() => {
    const savedLocale = localStorage.getItem(KEY_LOCALE);
    if (savedLocale !== null) {
      setLocale(getLocaleFromString(savedLocale));
    }
  }, []);

  // 第二引数のlocaleがが変更されたときのみ変更されたlocaleがsetItemに渡される
  useEffect(() => {
    localStorage.setItem(KEY_LOCALE, locale);
  }, [locale]);

  return (
    <div>
      <p>
        <span id="current-time-label">現在時刻</span>
        <span>:{timestamp.toLocaleTimeString(locale)}</span>
        <select
          value={locale}
          onChange={(e) => setLocale(getLocaleFromString(e.target.value))}
        >
          <option value="en-US">en-US</option>
          <option value="ja-JP">ja-JP</option>
          {/* 同じja-JPを選択してもlocaleの値が変わらないので3つ目のuseEffectは実行されない */}
          <option value="ja-JP">ja-JP</option>
        </select>
        <span>{}</span>
      </p>
    </div>
  );
};
