# Runnable và Callable

## Mục tiêu bài học
Phân biệt task không trả kết quả và task có thể trả kết quả.

## Khái niệm
Runnable không trả checked result, Callable trả về Future và có thể ném exception.

## Ví dụ code Java
```java
Callable<Integer> task = () -> 42;
```

## Bài tập thực hành
Chạy Callable và lấy kết quả từ Future.

