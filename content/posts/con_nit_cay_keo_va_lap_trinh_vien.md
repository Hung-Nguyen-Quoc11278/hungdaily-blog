+++
date = '2026-09-16T09:02:37+07:00'
draft = false
title = 'Con nít và cây kéo của chúng, lập trình viên và tool của họ'
description = "Giới thiệu mối liên hệ giữa con nít - cây kéo và lập trình viên - công cụ"
tags = ["TechThink"]
categories = ["Tech"]
series = ["Anh dev nhìn"]
+++

Đọc tiêu đề, có lẽ bạn sẽ liên tưởng ngay tới hình ảnh một đứa con nít cầm cây kéo và một lập trình viên cùng những công cụ của chính mình: từ IDE, VS Code... cho tới chiếc máy tính.

---

### I. Con nít và cây kéo

&emsp;Hãy cố nhớ lại thuở thơ bé, khi lần đầu tiên bạn được tiếp xúc với một thứ gọi là **cây kéo**. Bạn đã làm gì với nó?

&emsp;Có người sẽ nói là "cắt". Đúng, công dụng chính của cây kéo là cắt. Nó khác con dao ở chỗ có hai lưỡi kẹp chung dí nhau, cơ động và linh hoạt hơn nhiều so với việc dùng một con dao kết hợp với tấm thớt. Nhưng nó cũng có những nhược điểm riêng mà chúng ta không nhắc quá nhiều ở đây. 

&emsp;Ở đây, bạn có phát hiện ra điều gì đó không?

&emsp;Khi còn nhỏ, ta tiếp xúc với cây kéo bằng **sự tò mò thuần túy**. Ta không so sánh nó với con dao trên phạm trù ưu hay nhược điểm như khi đã lớn. Không có phân tích nhỏ nhặt, không có suy nghĩ rành mạch để chọn xem trường hợp nào dùng dao, trường hợp nào dùng kéo. Ta chỉ đơn giản là... thử.

&emsp;Điều này liên quan mật thiết tới cách một lập trình viên tiếp xúc với máy tính và các công cụ lập trình. Trước khi bị cuốn vào những bài báo công nghệ so sánh Framework A vs Framework B, Công nghệ C vs Công nghệ D... hãy cùng tui phân tích hành vi của một đứa trẻ qua câu chuyện dưới đây.

#### Đứa em tò mò của tui

&emsp;Tui có một đứa em, năm nay nó 5 tuổi. Ở cái tuổi này, con nít quậy lắm! Nhưng với tui, "quậy" không phải là lỗi, mà là một *feature* (tính năng).

&emsp;Ban đầu nó không biết dùng kéo nhưng sau khi dòm mẹ và tui cắt đồ bằng kéo thì nó bắt đầu "lén" mượn cây kéo. Và các hành động sau đó mới khiến tui thấy hình ảnh của chính mình hiện diện trong đó:

*   Nó lôi giấy ăn ra: **Pụp!** Miếng giấy làm hai. Nó hí hửng.
*   Nó tiếp tục tìm ống hút, giấy cứng, giấy thùng, bao gạo, dây nilon, dây điện dư... Mỗi lần cắt đứt một thứ, mắt nó lại trừng ra, lông mày nhíu lại đầy thích thú.
*   Thử trong nhà tới chán, nó vác kéo ra sau hè: lá cây, cọng rơm, cành cây khô... 

&emsp;Cho tới khi nó đụng phải cọng kẽm cột ở gốc cây. Cắt không nổi, nó kêu tui ra: *"Anh hai cắt giùm em đi!"*. Tui lớn hơn nên cắt cái là đứt liền luôn. 

> *"Anh hai lớn mạnh hơn em nên cắt được!"* — Nó nói.

&emsp;Tui khá bất ngờ khi nó nhận ra giới hạn không nằm ở công cụ, mà nằm ở **sức của người dùng công cụ**. Nhưng tui muốn thử nó tiếp, tui đưa cho nó một cây kéo to hơn, sắc bén hơn.

*   **Đứa em:** *"Em nhỏ lắm cắt không được đâu, đau tay em."*
*   **Tui:** *"Cây kéo này to hơn, bén hơn, cắt đi."*
*   Nó cắt thử một cái đứt ngay, rồi làm kiểu bộ bất ngờ: *"Dị là cây kéo kia cùi hơn cây này, nhưng mà cây này bự quá, cầm mỏi tay!"*

&emsp;Nghe xong câu đó, các tế bào thần kinh của tui giựt tạch tạch tạch với nhau. Cả một vùng tư duy mở ra, và đó là lý do bài viết này ra đời.

---

### II. Lập trình viên và Tooling: Mối quan hệ kế thừa (`extends`)

&emsp;Thông qua câu chuyện trên, ta thấy một mối tương quan mang tính `extends` (kế thừa) rất rõ ràng. 

&emsp;Khi mới bắt đầu con đường lập trình, ta đụng vào VS Code, NetBeans, Eclipse, Android Studio... Ta cũng y hệt đứa em 5 tuổi của tui, dùng chiếc máy tính để vọc đủ trò. Để rồi theo thời gian:

1. Ta nhận ra **hạn chế của bản thân** $\rightarrow$ Nâng cấp tư duy, kiến thức.
2. Ta nhận ra **hạn chế của công cụ** $\rightarrow$ Đổi sang một "cây kéo" to hơn, xịn hơn.
3. Ta bắt đầu biết cân đo đong đếm giữa các công nghệ.

&emsp;Tui viết bài này vì tui không muốn bản thân tách biệt khỏi cuộc sống đời thường như cách nhiều dev vẫn hay làm. Công nghệ, suy cho cùng, cũng giống như cây kéo: **Nó ra đời chỉ vì ai đó muốn giải quyết một vấn đề tiện hơn.**

&emsp;Từ ý tưởng hai lưỡi kẹp cơ bản, người ta biến tấu kéo thành kéo tỉa tóc, kéo cắt sắt công trình, vặn vít... hay thậm chí là vũ khí ngầu lòi trong các tựa game. 

&emsp;Công cụ là vậy, công nghệ là vậy, và cuộc sống của chúng ta cũng vậy!