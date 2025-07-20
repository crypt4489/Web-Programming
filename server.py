
from fastapi import FastAPI, Form, Request
from fastapi.responses import FileResponse, HTMLResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Annotated
from contextlib import closing
from datetime import datetime, timedelta, timezone
import uvicorn
import sqlite3
from hostdetails import HostDetails




class FormData(BaseModel):
    username : str
    user_email : str



app = FastAPI()
h = None

@app.on_event("startup")
async def startup():
    global h
    h = HostDetails()


def check_db(ip : str) -> int:
    ret = 1        
    with closing(sqlite3.connect("users.db")) as db_connection:
        cursor = db_connection.cursor()
        rows = cursor.execute("SELECT * from USERS where USERS.ip = ?", (ip,)).fetchall()
        if len(rows) == 0:
            try:
                cursor.execute("INSERT INTO USERS VALUES (?, ?)", (ip, ret))
                db_connection.commit()
            except sqlite3.OperationalError as e:
                print(f"Insert failed: {e}")
        else:
            ret = rows[0][1]+1
            cursor.execute("UPDATE USERS SET connection_number = ? WHERE ip = ?", (ret, ip))
            db_connection.commit()
    return ret

app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/react/dist", StaticFiles(directory="react/dist"), name="react")

@app.get("/", response_class=HTMLResponse)
async def root(request : Request, response : Response) -> HTMLResponse:
    print(request.client.host, request.client.port)
    
    session_active = request.cookies.get("session_cookie")
    
    content = ""
    with open("./react/dist/index.html", 'r') as f:
        content = f.read()
    html = HTMLResponse(content=content)

    if session_active is None or session_active != "active":
        print(check_db(request.client.host))
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        html.set_cookie(key="session_cookie", httponly=True, value="active", expires=expire) 

    return html


@app.get("/secondpage", response_class=HTMLResponse)
async def second(request : Request, response : Response) -> HTMLResponse:
    print(request.client.host, request.client.port)
    
    session_active = request.cookies.get("session_cookie")
    
    content = ""
    with open("./react/dist/secondpage.html", 'r') as f:
        content = f.read()
    html = HTMLResponse(content=content)

    if session_active is None or session_active != "active":
        print(check_db(request.client.host))
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        html.set_cookie(key="session_cookie", httponly=True, value="active", expires=expire) 

    return html

@app.get("/hostdetails", response_class=HTMLResponse)
async def second(request : Request, response : Response) -> HTMLResponse:
    print(request.client.host, request.client.port)
    
    session_active = request.cookies.get("session_cookie")
    
    content = ""
    with open("./react/dist/hostdetails.html", 'r') as f:
        content = f.read()
    html = HTMLResponse(content=content)

    if session_active is None or session_active != "active":
        print(check_db(request.client.host))
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        html.set_cookie(key="session_cookie", httponly=True, value="active", expires=expire) 

    return html

@app.post("/first-form")
async def formfiller(request : Request, username: Annotated[str, Form()], user_email: Annotated[str, Form()]) -> FormData:
    print(request.client.host, request.client.port)   
    print("It connects")
    return FormData(username=username, user_email=user_email)


@app.get("/host-details")
async def hostdeats(request: Request):
    print(request.client.host, request.client.port)
    return h.GetHostInfo()

@app.get("/mike.png", response_class=FileResponse)
async def mikepic(request : Request) -> FileResponse:
    print(request.client.host, request.client.port)
    return FileResponse("mike.png")



if __name__ == "__main__":
    uvicorn.run("server:app", host="10.0.0.94", port=8080)
    

