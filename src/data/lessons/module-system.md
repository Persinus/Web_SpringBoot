# Java Module System

## Mục tiêu bài học
Tổ chức dependency và API public bằng module-info.java.

## Khái niệm
Module giúp đóng gói package, khai báo requires và exports rõ ràng.

## Ví dụ code Java
```java
module app.core {
  exports com.example.core;
}
```

## Bài tập thực hành
Tạo hai module và khai báo dependency giữa chúng.

