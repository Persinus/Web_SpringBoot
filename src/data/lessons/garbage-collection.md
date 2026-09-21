# Garbage Collection

## Mục tiêu bài học
Hiểu GC thu hồi object không còn reachable.

## Khái niệm
GC tự động quản lý heap nhưng không thay thế việc đóng resource và kiểm soát allocation.

## Ví dụ code Java
```java
try (InputStream input = Files.newInputStream(path)) {
  input.read();
}
```

## Bài tập thực hành
Phân biệt memory leak với resource leak.

