const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function transferImageAPI(originalFile: File, referenceFile: File): Promise<string> {
  console.log('transferImageAPI is called')
  const formData = new FormData();
  formData.append('original_image', originalFile);
  formData.append('reference_image', referenceFile);

  console.log('API URL:', `${API_URL}/api/transfer`);
  const response = await fetch(`${API_URL}/api/transfer`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail || 
      `Lỗi máy chủ (${response.status}). Vui lòng thử lại sau.`
    );
  }

  const resultBlob = await response.blob();
  return URL.createObjectURL(resultBlob);
}
