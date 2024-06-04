// Levenshtein距離を計算する関数
export function levenshtein(a: string, b: string): number {
    const an = a.length;
    const bn = b.length;
    if (an === 0) return bn;
    if (bn === 0) return an;
    
    const matrix: number[][] = [];

    // 初期化
    for (let i = 0; i <= bn; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= an; j++) {
        matrix[0][j] = j;
    }

    // 計算
    for (let i = 1; i <= bn; i++) {
        for (let j = 1; j <= an; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // 置換
                    matrix[i][j - 1] + 1,     // 挿入
                    matrix[i - 1][j] + 1      // 削除
                );
            }
        }
    }

    return matrix[bn][an];
}
