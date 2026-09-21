# Custom Exception

## Mục tiêu bài học
Tạo loại exception diễn đạt đúng nghiệp vụ.

## Khái niệm
Custom exception giúp caller phân biệt các nhóm lỗi và xử lý phù hợp.

## Ví dụ code Java
```java
class InvalidOrderException extends RuntimeException {
  InvalidOrderException(String message) { super(message); }
}
```

## Bài tập thực hành
Tạo exception cho số dư không đủ.

