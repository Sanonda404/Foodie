from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src import model
from src.database import engine
from src.routes import router as api_router
import uvicorn

app = FastAPI()

#Creating all tables
model.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

