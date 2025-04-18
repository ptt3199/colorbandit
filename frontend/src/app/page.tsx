import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">ColorBandit</h1>
          <p className="text-xl text-gray-600 mb-12">
            Chào mừng bạn đến với ColorBandit! "Chôm màu" ảnh một cách nghịch ngợm,
            áp màu phim hoặc mẫu sẵn có cho ảnh của bạn.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              href="/upload"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Bắt đầu ngay
            </Link>
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Đăng nhập
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Chôm màu thông minh</h3>
            <p className="text-gray-600">
              Trích xuất bảng màu từ bất kỳ ảnh nào một cách nhanh chóng và chính xác
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Thư viện màu phong phú</h3>
            <p className="text-gray-600">
              Hàng trăm bộ màu từ các bộ phim nổi tiếng và ảnh nghệ thuật
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Dễ dàng chia sẻ</h3>
            <p className="text-gray-600">
              Lưu và chia sẻ các bảng màu yêu thích của bạn với cộng đồng
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
