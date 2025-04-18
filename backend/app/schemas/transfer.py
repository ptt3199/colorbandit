from pydantic import BaseModel


class TransferImageRequest(BaseModel):
    original_image: bytes
    reference_image: bytes