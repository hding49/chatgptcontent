function extractData(input: string): { key: string, value: string } | null {
    const regex = /"([^"]*)"\s*=\s*"([^"]*)"/;
    const match = input.match(regex);

    if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        return { key, value };
    }

    return null;
}

const inputString = ' value = " example one"';
const extractedData = extractData(inputString);

if (extractedData) {
    const { key, value } = extractedData;
    console.log(`Key: "${key}"`);
    console.log(`Value: "${value}"`);
} else {
    console.log('Invalid input format');
}


function checkDataFormat(data: string): boolean {
    const regex = /^"\s*[^"]+"\s*=\s*"\s*[^"]+"\s*$/;
    return regex.test(data);
}

// 示例用法
const data1 = '" value" = " 123"';
const data2 = '" value" = " example"';
const data3 = '" key" = " value"';
const data4 = '" key"= " value"';

console.log(checkDataFormat(data1)); // 输出: true
console.log(checkDataFormat(data2)); // 输出: true
console.log(checkDataFormat(data3)); // 输出: true
console.log(checkDataFormat(data4)); // 输出: false
function extractData(input: string): { key: string, value: string } | null {
    const regex = /^"\s*([^"]+)"\s*=\s*"\s*([^"]+)"\s*$/;
    const matches = input.match(regex);

    if (matches && matches.length === 3) {
        const key = matches[1].trim(); // 提取 key，去除左右空格
        const value = matches[2].trim(); // 提取 value，去除左右空格
        return { key, value };
    } else {
        return null; // 格式不匹配，返回 null 或者适当的错误处理
    }
}

// 示例用法
const input = '" value" = " example one"';
const extractedData = extractData(input);

if (extractedData) {
    const { key, value } = extractedData;
    console.log(`Key: "${key}"`); // 输出: "value"
    console.log(`Value: "${value}"`); // 输出: "example one"
} else {
    console.log("格式不符合要求。");
}

