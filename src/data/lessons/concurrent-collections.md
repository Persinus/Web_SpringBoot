# Concurrent Collections

## Mục tiêu bài học
Chọn collection an toàn khi nhiều thread cùng sử dụng.

## Khái niệm
ConcurrentHashMap và blocking queue cung cấp semantics phù hợp cho nhiều mô hình concurrent.

## Ví dụ code Java
```java
ConcurrentMap<String, Integer> counts = new ConcurrentHashMap<>();
```

## Bài tập thực hành
Xây dựng bộ đếm thread-safe.

