# Parallel Stream

## Mục tiêu bài học
Hiểu khi nào stream song song có thể cải thiện hiệu năng.

## Khái niệm
Parallel stream dùng common pool và chỉ phù hợp với workload đủ lớn, độc lập và đo được.

## Ví dụ code Java
```java
values.parallelStream().map(this::process).toList();
```

## Bài tập thực hành
Đo thời gian sequential và parallel với dữ liệu đủ lớn.

