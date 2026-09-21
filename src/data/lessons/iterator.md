# Iterator

## Mục tiêu bài học
Duyệt collection an toàn và xóa phần tử trong lúc duyệt.

## Khái niệm
Iterator cung cấp hasNext và next, đồng thời hỗ trợ remove theo quy tắc collection.

## Ví dụ code Java
```java
Iterator<String> iterator = names.iterator();
while (iterator.hasNext()) System.out.println(iterator.next());
```

## Bài tập thực hành
Xóa các phần tử thỏa điều kiện khi duyệt.

