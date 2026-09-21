# Thread Synchronization

## Mục tiêu bài học
Bảo vệ dữ liệu chia sẻ khi nhiều thread cùng truy cập.

## Khái niệm
Race condition xảy ra khi thứ tự truy cập không được kiểm soát. Dùng lock nhỏ và rõ ràng.

## Ví dụ code Java
```java
synchronized void increment() {
  count++;
}
```

## Bài tập thực hành
Sửa counter bị race condition.

