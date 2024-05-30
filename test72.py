import json
import yaml
from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from pydantic import BaseModel
from fastapi.routing import APIRoute
import os



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

def save_swagger_file(endpoint, swagger_schema):
    """
    保存Swagger文档为单独的YAML文件。
    """
    endpoint_path = endpoint.replace("/", "_")
    file_name = f"swagger_{endpoint_path}.yaml"
    with open(file_name, "w") as f:
        yaml.dump(swagger_schema, f, default_flow_style=False)

@app.on_event("startup")
async def generate_openapi_and_swagger():
    # 获取OpenAPI 3.0文档
    openapi_schema = get_openapi(
        title="My API",
        version="1.0.0",
        description="This is my API",
        routes=app.routes,
    )

    # 将OpenAPI 3.0文档保存为JSON文件（可选）
    with open("openapi.json", "w") as f:
        json.dump(openapi_schema, f, indent=2)

    # 对每个路径单独生成Swagger 2.0文档
    for route in app.routes:
        if isinstance(route, APIRoute):
            endpoint = route.path
            methods = route.methods

            # 只处理GET、POST、PUT、DELETE等常用方法
            if methods.intersection({"GET", "POST", "PUT", "DELETE"}):
                # 为当前路径创建一个单独的OpenAPI schema
                endpoint_openapi_schema = {
                    "openapi": openapi_schema["openapi"],
                    "info": openapi_schema["info"],
                    "paths": {endpoint: openapi_schema["paths"][endpoint]},
                    "components": openapi_schema.get("components", {}),
                }

                # 转换为Swagger 2.0文档
                swagger_2_schema = openapi_to_swagger(endpoint_openapi_schema)

                # 保存Swagger 2.0文档为YAML文件
                save_swagger_file(endpoint, swagger_2_schema)