
from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Annotated
import uvicorn

class FormData(BaseModel):
    username : str
    user_email : str



app = FastAPI()

app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/react/dist", StaticFiles(directory="react/dist"), name="react")

@app.get("/")
async def root(request : Request) -> HTMLResponse:
    print(request.client.host, request.client.port)
    content = ""
    with open("./react/dist/index.html", 'r') as f:
        content = f.read()
    return HTMLResponse(content=content)


@app.get("/secondpage")
async def second(request : Request) -> HTMLResponse:
    print(request.client.host, request.client.port)
    content = ""
    with open("./react/dist/secondpage.html", "r") as f:
        content = f.read()
    return HTMLResponse(content=content)

@app.post("/first-form")
async def formfiller(request : Request, username: Annotated[str, Form()], user_email: Annotated[str, Form()]) -> FormData:
    print(request.client.host, request.client.port)   
    print("It connects")
    return FormData(username=username, user_email=user_email)


@app.get("/mike.png")
async def mikepic(request : Request) -> str:
    print(request.client.host, request.client.port)
    content = ""
    with open("mike.png", 'r') as mike:
        content = mike.read()
    return content 



if __name__ == "__main__":
    uvicorn.run("server:app", host="10.0.0.94", port=8080)
    

