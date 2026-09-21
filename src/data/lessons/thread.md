# Thread

## Mục tiêu bài học
Hiểu Thread và cách chương trình thực hiện nhiều luồng công việc.

## Khái niệm
Thread là đơn vị thực thi độc lập trong một process. Gọi start tạo luồng mới; gọi run trực tiếp chỉ chạy như method.

## Ví dụ code Java
```java
Thread worker = new Thread(() -> {
  System.out.println("Working...");
});
worker.start();
```

## Bài tập thực hành
Tạo worker chạy một tác vụ độc lập và chờ nó hoàn thành.

