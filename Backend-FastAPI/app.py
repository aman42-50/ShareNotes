from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import secrets

from websocket_manager import ConnectionManager
from database import engine, SessionLocal
import models
import schemas
import crud

import pdb

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

data = ""


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


manager = ConnectionManager()


@app.get("/new/", response_model=schemas.Note)
def new_note(db: Session = Depends(get_db)):
    note_url = secrets.token_urlsafe(8)
    db_note = crud.create_note(db, note_url)
    return db_note


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str, db: Session = Depends(get_db)):

    await manager.connect(websocket)
    note_id = await websocket.receive_text()
    note_data = crud.get_note(db, note_id)
    note_data = note_data.to_dict()
    flag = False

    await manager.send_personal_message(note_data['note_content'], websocket)

    try:
        while True:
            data = await websocket.receive_text()
            flag = True
            await manager.broadcast(data)

    except WebSocketDisconnect:
        if flag:
            request = {'note_url': note_id, 'note_content': data}

            crud.update_note(note_id, request, db)

        manager.disconnect(websocket)
