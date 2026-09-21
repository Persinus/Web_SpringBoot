# ExecutorService

## Mục tiêu bài học
Quản lý pool thread thay vì tự tạo thread thủ công.

## Khái niệm
ExecutorService nhận task, tái sử dụng worker và cần được shutdown đúng cách.

## Ví dụ code Java
```java
try (ExecutorService executor = Executors.newFixedThreadPool(2)) {
  executor.submit(() -> work());
}
```

## Bài tập thực hành
Chạy nhiều task bằng fixed thread pool.

