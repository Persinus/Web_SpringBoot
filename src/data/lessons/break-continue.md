# break / continue

## Mục tiêu bài học
Điều khiển sớm vòng lặp bằng break và continue.

## Khái niệm
`break` kết thúc vòng lặp, còn `continue` bỏ qua phần còn lại của lần lặp hiện tại.

## Ví dụ code Java
```java
for (int number = 1; number <= 10; number++) {
  if (number % 2 == 0) continue;
  System.out.println(number);
}
```

## Bài tập thực hành
In các số lẻ từ 1 đến 20 và dừng khi gặp số 15.

