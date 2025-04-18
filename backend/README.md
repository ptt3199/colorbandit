# Backend
## Local Development
This project uses uv for dependency management.

Install uv:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```
Or use pip / pipx:
```bash
pip install uv
```
```bash
pipx install uv
```

Install dependencies:
```bash
uv sync
```

Activate virtual environment:
```bash
source .venv/bin/activate
```

Set the environment variables: Create a copy of .env.example then fill in the values.
```bash
cp .env.example .env
```

Run the app:
```bash
fastapi run app/main.py
```

The app will run at http://localhost:8000, go to http://localhost:8000/docs to see the API documentation.
