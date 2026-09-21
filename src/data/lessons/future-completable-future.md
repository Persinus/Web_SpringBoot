# Future và CompletableFuture

## Mục tiêu bài học
Xử lý kết quả bất đồng bộ và kết hợp nhiều tác vụ.

## Khái niệm
CompletableFuture hỗ trợ pipeline callback và xử lý lỗi mà không block sớm.

## Ví dụ code Java
```java
CompletableFuture.supplyAsync(() -> load())
  .thenApply(this::transform);
```

## Bài tập thực hành
Kết hợp hai tác vụ độc lập thành một kết quả.

