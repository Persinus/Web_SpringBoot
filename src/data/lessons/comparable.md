# Comparable

## Mục tiêu bài học
Định nghĩa thứ tự tự nhiên cho object.

## Khái niệm
Comparable đặt logic so sánh mặc định trong chính class.

## Ví dụ code Java
```java
class Student implements Comparable<Student> {
  public int compareTo(Student other) { return name.compareTo(other.name); }
}
```

## Bài tập thực hành
Sắp xếp Student theo tên.

