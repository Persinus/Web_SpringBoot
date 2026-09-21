# try / catch / finally

## Mục tiêu bài học
Bắt exception và đảm bảo phần cleanup được thực hiện.

## Khái niệm
try chứa code rủi ro, catch xử lý lỗi, finally chạy sau cùng trong hầu hết trường hợp.

## Ví dụ code Java
```java
try { parse(); } catch (NumberFormatException error) { log(error); } finally { close(); }
```

## Bài tập thực hành
Đọc số từ chuỗi và xử lý input không hợp lệ.

