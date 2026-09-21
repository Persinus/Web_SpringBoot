# File I/O

## Mục tiêu bài học
Đọc và ghi file bằng API java.nio.file.

## Khái niệm
Path và Files cung cấp API hiện đại, rõ ràng để thao tác file.

## Ví dụ code Java
```java
Path path = Path.of("notes.txt");
Files.writeString(path, "Java");
```

## Bài tập thực hành
Đọc file text và đếm số dòng.

