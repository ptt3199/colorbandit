from fastapi import APIRouter, File, UploadFile, HTTPException, status
from fastapi.responses import Response
from io import BytesIO
import numpy as np
from PIL import Image
from color_matcher import ColorMatcher

router = APIRouter()
matcher = ColorMatcher()

@router.post(
    "",
    status_code=201,
    # response_model=Process,
    # dependencies=[Depends(get_current_user)]
)
async def handle_transfer_image(
    original_image: UploadFile = File(...),
    reference_image: UploadFile = File(...),
):
    """
    Transfer the color distribution of the reference image to the original image.

    Args:
    - original_image (UploadFile): The original image.
    - reference_image (UploadFile): The reference image.

    Returns:
    - The image with the transferred color distribution.
    """
    try:
        # Read images from UploadFile into PIL Images
        original_img = Image.open(BytesIO(await original_image.read()))
        reference_img = Image.open(BytesIO(await reference_image.read()))
        
        # Convert PIL Images to RGB mode
        original_img = original_img.convert('RGB')
        reference_img = reference_img.convert('RGB')
        
        # Convert PIL Images to numpy arrays
        original_np = np.array(original_img)
        reference_np = np.array(reference_img)
        
        # Process images
        result_np = matcher.transfer(original_np, reference_np, method='mkl')

        # Convert result numpy array back to PIL Image
        result_img = Image.fromarray(result_np.astype('uint8'))
        
        # Save result to bytes
        img_byte_arr = BytesIO()
        result_img.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        
        # Return image bytes with proper content type
        return Response(
            content=img_byte_arr,
            media_type="image/png"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing images: {str(e)}"
        )

  