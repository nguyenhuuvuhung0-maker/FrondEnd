const rateLimitMap = new Map();

export default function rateLimit(ip: string) {
  const limit = 5; // Cho phép gọi 5 requests
  const windowMs = 60 * 1000; // Trong vòng 1 phút (60.000 milliseconds)

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, timer: setTimeout(() => rateLimitMap.delete(ip), windowMs) });
    return true; // Cho qua
  }

  const info = rateLimitMap.get(ip);
  if (info.count >= limit) {
    return false; // Chặn lại ngay vì đã spam quá 5 req/phút
  }

  info.count++;
  return true; // Cho qua
}