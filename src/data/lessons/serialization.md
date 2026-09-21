# Serialization

## Mục tiêu bài học
Biết cách chuyển object thành dạng lưu trữ và các rủi ro liên quan.

## Khái niệm
Serialization native cần kiểm soát compatibility và không nên dùng cho dữ liệu không tin cậy.

## Ví dụ code Java
```java
record User(String name) implements Serializable { }
```

## Bài tập thực hành
So sánh serialization với JSON trong một use case.

