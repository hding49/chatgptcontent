function escapeSingleQuotesInObject(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(/'/g, "''");
        }
    }
    return obj;
}

// 示例用法
let originalObject = {
    "issue": "sue O'Donaell",
    "ID": "audit's id"
};

let escapedObject = escapeSingleQuotesInObject(originalObject);
let jsonString = JSON.stringify(escapedObject);

console.log(jsonString);
// 输出: {"issue":"sue O''Donaell","ID":"audit''s id"}

// 创建 SQL 查询的函数
function createInsertQuery(tableName, columnName, value) {
    let escapedValue = escapeSingleQuotesInObject(value);
    let jsonString = JSON.stringify(escapedValue);
    return `INSERT INTO ${tableName} (${columnName}) VALUES ('${jsonString}');`;
}

// 示例用法
let tableName = "table_name";
let columnName = "column_name";
let value = {
    "issue": "sue O'Donaell",
    "ID": "audit's id"
};

let query = createInsertQuery(tableName, columnName, value);
console.log(query);
// 输出: INSERT INTO table_name (column_name) VALUES ('{"issue":"sue O''Donaell","ID":"audit''s id"}');


let originalObject = {
    "issue": "sue O'Donaell",
    "ID": "audit's id"
};

let escapedObject = escapeSingleQuotesInObject(originalObject);
let jsonString = JSON.stringify(escapedObject);

console.log(jsonString);



