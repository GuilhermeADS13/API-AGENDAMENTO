from pathlib import Path
import shutil

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
PROCESSED_DIR = BASE_DIR / "processed"

UPLOAD_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)

app = FastAPI(title="DocFlow", version="1.0.0")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))


@app.get("/", response_class=HTMLResponse)
async def index(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("index.html", {"request": request})


def process_file(input_path: Path, output_path: Path) -> None:
    """
    Ponto de integração para processamento com IA.

    Exemplo de fluxo:
    1. Extrair texto de PDF/DOCX.
    2. Enviar para um modelo para reescrita/normalização.
    3. Gerar e salvar o arquivo processado em output_path.

    Implementação atual: apenas copia o arquivo original.
    """
    shutil.copy2(input_path, output_path)


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    extension = Path(file.filename or "").suffix.lower()
    if extension not in {".pdf", ".docx"}:
        raise HTTPException(status_code=400, detail="Envie apenas arquivos PDF ou DOCX.")

    input_path = UPLOAD_DIR / file.filename
    output_path = PROCESSED_DIR / f"processado_{file.filename}"

    with input_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    process_file(input_path, output_path)

    media_type = (
        "application/pdf"
        if extension == ".pdf"
        else "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )

    return FileResponse(
        output_path,
        filename=output_path.name,
        media_type=media_type,
    )
