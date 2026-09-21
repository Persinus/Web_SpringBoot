# Functional Interface

## Mục tiêu bài học
Sử dụng interface chỉ có một abstract method làm kiểu cho lambda.

## Khái niệm
Functional interface có thể được đánh dấu bằng `@FunctionalInterface`.

## Ví dụ code Java
```java
Predicate<Integer> positive = value -> value > 0;
```

## Bài tập thực hành
Tạo functional interface để tính toán hai số.

