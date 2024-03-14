from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pymssql

app = FastAPI()

# 定义请求体数据模型
class InputData(BaseModel):
    arg1: str
    arg2: int
    arg3: float

# 连接到 SQL Server 数据库
def connect_to_sql_server():
    conn = pymssql.connect(server='your_server', user='your_username', password='your_password', database='your_database')
    return conn

# 调用存储过程
def call_stored_procedure(connection, procedure_name, data):
    cursor = connection.cursor()
    cursor.callproc(procedure_name, (data.arg1, data.arg2, data.arg3))
    result = cursor.fetchall()
    return result

@app.post("/call-procedure")
def call_procedure_endpoint(data: InputData):
    # 连接到 SQL Server 数据库
    connection = connect_to_sql_server()

    # 调用存储过程
    result = call_stored_procedure(connection, 'your_stored_procedure', data)

    # 关闭数据库连接
    connection.close()

    return {"result": result}



from fastapi import FastAPI
from pydantic import BaseModel
import pymssql

app = FastAPI()

# 连接到 SQL Server 数据库
def connect_to_sql_server():
    conn = pymssql.connect(server='your_server', user='your_username', password='your_password', database='your_database')
    return conn

# 调用存储过程
def call_stored_procedure(connection, procedure_name, param):
    cursor = connection.cursor()
    cursor.callproc(procedure_name, (param,))
    result = cursor.fetchall()
    return result

@app.get("/call-procedure/{param}")
def call_procedure_endpoint(param: str):
    # 连接到 SQL Server 数据库
    connection = connect_to_sql_server()

    # 调用存储过程
    result = call_stored_procedure(connection, 'your_stored_procedure', param)

    # 关闭数据库连接
    connection.close()

    return {"result": result}


