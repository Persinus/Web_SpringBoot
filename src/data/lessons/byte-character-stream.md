# Byte Stream và Character Stream

## Mục tiêu bài học
Chọn stream phù hợp cho dữ liệu nhị phân và văn bản.

## Khái niệm
Byte stream xử lý byte, character stream xử lý text với charset rõ ràng.

## Ví dụ code Java
```java
try (BufferedReader reader = Files.newBufferedReader(path)) {
  reader.lines().forEach(System.out::println);
}
```

## Bài tập thực hành
Sao chép file text và file nhị phân.

