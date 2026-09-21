# Stream API

## Mục tiêu bài học
Xử lý collection theo pipeline khai báo.

## Khái niệm
Stream không lưu dữ liệu; nó mô tả chuỗi thao tác trung gian và terminal operation.

## Ví dụ code Java
```java
names.stream().filter(name -> name.length() > 2).forEach(System.out::println);
```

## Bài tập thực hành
Lọc và chuyển đổi danh sách tên.

