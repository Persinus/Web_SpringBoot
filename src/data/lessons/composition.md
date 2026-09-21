# Composition

## Mục tiêu bài học
Xây dựng object bằng cách kết hợp các object nhỏ hơn.

## Khái niệm
Composition thể hiện quan hệ has-a và thường linh hoạt hơn kế thừa sâu.

## Ví dụ code Java
```java
class Car {
  private final Engine engine = new Engine();
}
```

## Bài tập thực hành
Tạo Order chứa Customer và các OrderItem.

