let strToHash = (str) => {
    let charCodes = str.split("").map((ch) => ch.charCodeAt(0));
    let result = 0;
    charCodes.forEach((ch) => {
        // // игнорировать только пробелы
        // if (ch === 32) return;
        //
        // // остальной ввод типа корректен
        // result +=
        //     (ch <= 90 && ch >= 65) ?
        //         (ch - 64) * 2 :
        //         (ch - 96)
        // ;

        // учесть только [a-z] и [A-Z]:
        result += 
            (ch <= 90 && ch >= 65) ?
                (ch - 64) * 2 :
                (ch <= 122 && ch >= 97) ?
                    (ch - 96) :
                    0
            ;
    });
    result += "";
    let dl = 6 - result.length;
    return dl < 0 ? result.substring(0, 6) : result + "0".repeat(dl);
}

console.log(strToHash("HKJHghjGJH shlkmLKMLKMlm lKNJLKnlkNKLN Lkn l nLKN KLnjkb kjB JUB Kib juBK B ju bJB Kb kjB KJb kjb Kb bYUV Tv J BLKEMJ OINi onION OLinfdksndk fnkJDN Kfndkj fnKJN DKNflk nlK"));