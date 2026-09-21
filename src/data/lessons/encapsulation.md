# Encapsulation

## Mục tiêu bài học
Đóng gói dữ liệu và chỉ cho phép thay đổi qua API hợp lệ.

## Khái niệm
Encapsulation bảo vệ invariant của object bằng private state và method kiểm soát.

## Ví dụ code Java
```java
class Account {
  private double balance;
  void deposit(double amount) { if (amount > 0) balance += amount; }
}
```

## Bài tập thực hành
Tạo Account không cho phép số dư âm.

