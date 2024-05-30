def openapi_to_swagger(openapi_schema):
    """
    将OpenAPI 3.0文档转换为Swagger 2.0文档的简单转换器。
    """
    swagger = {
        "swagger": "2.0",
        "info": openapi_schema["info"],
        "paths": openapi_schema["paths"],
        "definitions": openapi_schema.get("components", {}).get("schemas", {}),
    }

    # 将所有 $ref 中的 '#/components/schemas/' 替换为 '#/definitions/'
    def replace_refs(obj):
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k == "$ref" and isinstance(v, str):
                    obj[k] = v.replace("#/components/schemas/", "#/definitions/")
                else:
                    replace_refs(v)
        elif isinstance(obj, list):
            for item in obj:
                replace_refs(item)

    replace_refs(swagger)
    
    return swagger

@app.on_event("startup")
async def generate_openapi_and_swagger():
    # 获取OpenAPI 3.0文档
    openapi_schema = get_openapi(
        title="My API",
        version="1.0.0",
        description="This is my API",
        routes=app.routes,
    )

    # 保存OpenAPI 3.0文档为JSON文件
    with open("openapi.json", "w") as f:
        json.dump(openapi_schema, f, indent=2)

    # 转换为Swagger 2.0文档
    swagger_2_schema = openapi_to_swagger(openapi_schema)

    # 保存Swagger 2.0文档为YAML文件
    with open("swagger.yaml", "w") as f:
        yaml.dump(swagger_2_schema, f, default_flow_style=False)