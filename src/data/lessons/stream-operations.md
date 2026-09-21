# Stream Operations

## Mục tiêu bài học
Phân biệt filter, map, sorted, reduce và collect.

## Khái niệm
Chọn operation theo ý định và tránh pipeline quá khó đọc.

## Ví dụ code Java
```java
List<Integer> doubled = values.stream().map(value -> value * 2).toList();
```

## Bài tập thực hành
Tính tổng và nhóm dữ liệu bằng collectors.

