# ColorBandit

Webapp nghịch ngợm giúp bạn "chôm màu" từ ảnh mẫu, giả lập màu phim Fujifilm hoặc preset một cách vui vẻ!

## Tổng quan
ColorBandit là webapp "chôm màu" nghịch ngợm: upload ảnh, áp màu từ ảnh mẫu hoặc preset, quản lý thư viện cá nhân. Backend FastAPI, frontend Next.js, database Postgres.

## Khởi động nhanh
1. Cài đặt Docker & Docker Compose.
2. Clone repo, cd vào thư mục dự án.
3. Chạy:
   ```bash
   docker-compose up --build
   ```
4. Truy cập frontend tại http://localhost:3000, backend tại http://localhost:8000/docs

## Cấu trúc thư mục
```
/ColorBandit/
├── backend/      # FastAPI app
├── frontend/     # Next.js app
├── docker-compose.yml
├── README.md
```

## Tính năng chính
- Đăng ký/đăng nhập, quản lý tài khoản
- Upload ảnh, áp màu từ ảnh mẫu hoặc preset
- Thư viện ảnh cá nhân
- Ảnh mẫu đẹp có sẵn

## Công nghệ
- Backend: FastAPI, SQLAlchemy, PostgreSQL, uv, ruff
- Frontend: Next.js, React
- Database: PostgreSQL

## Ghi chú
- Code backend ở thư mục `backend/`, frontend ở `frontend/`.
- Thông tin cấu hình, tài khoản test sẽ bổ sung sau.
