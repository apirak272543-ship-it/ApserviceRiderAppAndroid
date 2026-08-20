# AP Rider — Android capability boundary

## ใช้ใน APK

AP Rider ใช้ `INTERNET` เพื่อเปิด Rider Console, `POST_NOTIFICATIONS` สำหรับงานจัดส่งและข้อความสำคัญ และ `ACCESS_COARSE_LOCATION`/`ACCESS_FINE_LOCATION` แบบ foreground เพื่อเปิดแผนที่และอัปเดตจุดทำงานเมื่อผู้ใช้เลือกใช้ฟังก์ชันตำแหน่ง

การแจ้งเตือนจะขอสิทธิ์จากเมนูการแจ้งเตือนของแอป ส่วนตำแหน่งจะขอแบบ just-in-time เมื่อหน้า Rider ต้องใช้งานจริง การตั้งค่าปัจจุบันไม่มี native background-location task; จึงไม่มีการเริ่มติดตามตำแหน่งเบื้องหลังโดยลำพัง

## ไม่ขอสิทธิ์

ไม่มีการขอกล้อง ไมโครโฟน ภาพ/สื่อ รายชื่อ หรือสิทธิ์ตำแหน่งเบื้องหลังเพียงเพื่อเปิด WebView การแนบรูปหลักฐานจากเว็บไซต์ยังคงใช้ browser/WebView flow ของเว็บตามเดิม

## ข้อตกลง WebView bridge

เว็บไซต์ส่งเหตุการณ์ที่ได้รับอนุญาต เช่น งานใหม่ สถานะงาน และข้อความสำคัญผ่าน `ap-service-native-notification` ได้ Native shell จะ validate ข้อมูลและเปิด notification เฉพาะใน channel ของ Rider

## ข้อจำกัดการส่ง Push จาก server

source มี EAS project ID, Google services และ Expo notification channel แล้ว การส่ง remote push ต้องลงทะเบียน Expo token ของอุปกรณ์กับ backend หลังผู้ใช้อนุญาตการแจ้งเตือน
