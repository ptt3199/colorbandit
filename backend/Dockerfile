FROM python:3.11-slim
WORKDIR /app
COPY pyproject.toml ./
RUN pip install uv && pip install ruff && pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary python-multipart pillow
COPY ./app ./app
CMD ["uv", "icorn"]
