# Scope và Keyword

## Mục tiêu bài học
Hiểu phạm vi biến và vai trò của các keyword Java phổ biến.

## Khái niệm
Scope quyết định nơi một biến có thể được truy cập. Keyword có ý nghĩa đặc biệt và không thể dùng tùy ý làm tên biến.

## Ví dụ code Java
```java
final int limit = 10;
if (limit > 0) {
  int localValue = 1;
  System.out.println(localValue);
}
```

## Bài tập thực hành
Thử xác định scope của biến trong một block lồng nhau.

