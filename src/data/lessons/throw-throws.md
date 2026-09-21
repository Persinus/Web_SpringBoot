# throw / throws

## Mục tiêu bài học
Chủ động ném exception và khai báo exception có thể phát sinh.

## Khái niệm
throw tạo một exception cụ thể, throws mô tả trách nhiệm xử lý ở caller.

## Ví dụ code Java
```java
void load() throws IOException {
  throw new IOException("Cannot load");
}
```

## Bài tập thực hành
Tạo method đọc file và truyền IOException lên tầng gọi.

