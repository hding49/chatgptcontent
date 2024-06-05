
function transformIssueString(input) {
    // 使用split方法将输入字符串按逗号分隔成数组
    const issuesArray = input.split(', ');

    // 使用map方法遍历数组并给每个元素添加方括号
    const transformedArray = issuesArray.map(issue => `[${issue}]`);

    // 使用join方法将数组元素连接成一个新的字符串，以逗号和空格分隔
    const result = transformedArray.join(', ');

    return result;
}


function isValidIssueString(input) {
    // 定义正则表达式模式
    const pattern = /^(ISSUE-[^,]+)(, ISSUE-[^,]+)*$/;

    // 使用正则表达式测试输入字符串
    return pattern.test(input);
}


function convertArrayToString(array) {
    // 使用map方法将数组中的每个对象转换为字符串
    const stringArray = array.map(obj => {
        // 将对象转换为JSON字符串，并对双引号进行转义
        return JSON.stringify(obj).replace(/"/g, '\\"');
    });
    
    // 使用join方法将字符串数组中的元素连接成一个新字符串，以竖线分隔
    const result = stringArray.join('|');
    
    return result;
}

// 示例调用
const input = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }];
const output = convertArrayToString(input);
console.log(output); // 输出: {\"a\":\"1\"}|{\"b\":\"2\"}|{\"c\":\"3\"}|{\"d\":\"4\"}
