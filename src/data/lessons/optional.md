# Optional

## Mục tiêu bài học
Biểu diễn giá trị có thể vắng mặt mà không lạm dụng null.

## Khái niệm
Optional phù hợp ở boundary trả về, giúp caller xử lý rõ trường hợp không có dữ liệu.

## Ví dụ code Java
```java
Optional<String> name = Optional.of("An");
name.ifPresent(System.out::println);
```

## Bài tập thực hành
Tìm user theo id và trả về Optional.

