from fastapi import FastAPI

app = FastAPI(title="ColorBandit API")

@app.get("/")
def root():
    return {"message": "Welcome to ColorBandit!"}
