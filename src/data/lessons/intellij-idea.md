# Bài 0: Cách sử dụng IntelliJ IDEA

## Mục tiêu bài học
Sau bài này, bạn có thể cài JDK, tạo Java Project, tạo class Main và chạy chương trình Java đầu tiên trong IntelliJ IDEA.

## Chuẩn bị JDK
Cài JDK 17 hoặc một phiên bản LTS mới hơn. Mở IntelliJ IDEA, chọn **New Project** và kiểm tra mục JDK đã trỏ đến đúng thư mục JDK trên máy.

## Tạo Java Project
Trong cửa sổ New Project, chọn **Java** ở thanh bên trái. Đặt tên project, chọn thư mục lưu và giữ build system là IntelliJ nếu bạn chỉ muốn học Java cơ bản. Nhấn **Create** để tạo project.

## Tạo class đầu tiên
Trong Project ở bên trái, mở thư mục `src`. Nhấp chuột phải vào `src`, chọn **New > Java Class**, đặt tên là `Main` rồi nhấn Enter. IntelliJ sẽ tạo file `Main.java`.

## Viết chương trình
Mở `Main.java` và thêm hàm main. Tên file và tên class phải trùng nhau để Java biên dịch đúng.

## Ví dụ code Java
```java
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, IntelliJ IDEA");
  }
}
```

## Chạy project
Nhấn nút tam giác màu xanh cạnh hàm main rồi chọn **Run Main.main()**. Bạn cũng có thể dùng phím tắt **Shift + F10**. Kết quả xuất hiện trong cửa sổ Run ở phía dưới.

## Debug chương trình
Đặt breakpoint bằng cách nhấp vào lề trái của dòng code. Nhấn **Shift + F9** để chạy debug, sau đó dùng Step Over để chạy từng dòng và quan sát giá trị biến.

## Lỗi thường gặp
Nếu IntelliJ báo thiếu JDK, mở **File > Project Structure** và chọn lại SDK. Nếu không thấy nút Run, hãy kiểm tra class có đúng `public static void main(String[] args)` hay chưa.

## Tóm tắt
Quy trình cơ bản là: cài JDK, tạo Java Project, tạo class trong src, viết hàm main, chạy bằng Run và kiểm tra lỗi bằng Debug.

