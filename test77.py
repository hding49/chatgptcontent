import pymssql

# 连接到数据库
conn = pymssql.connect(server='your_server', 
                       user='your_username', 
                       password='your_password', 
                       database='your_database')
cursor = conn.cursor()

# 执行存储过程
# 你可以使用 EXEC 或 EXECUTE 语句来调用存储过程
user_id = 1
new_email = 'new_email@example.com'

# 注意使用参数化查询，以防止SQL注入
cursor.execute("EXEC usp_UpdateUserEmail @UserID=%d, @NewEmail=%s", (user_id, new_email))

# 如果存储过程返回结果集，你可以获取结果
rows = cursor.fetchall()
for row in rows:
    print(row)

# 提交事务（如果存储过程涉及数据修改）
conn.commit()

# 关闭连接
cursor.close()
conn.close()
