# ahmbohlah
https://cdn.aisbircubes.my.id/2024-02-18%2018-12-00.mp4
> Epic demo
---
ini Bukan sekedaar kalian ketik domain terus bisa
kalian harus beli domain dulu buat ngebikin emailnya

## Domain Yang tersedia
| Domain         | Status    |
|--------------|-----------|
| aisbirpedia.my.id | ✅      |
| dreams.my.id | ✅  |
| aisbircubes.tech | ✅  |
| mail.dreams.my.id | Fraud  |
| m.aisbircubes.my.id | ✅ |
| destroyer.dreams.my.id | ✅ |

## Step by step
- Download file zip ini
- Unzip ke folder
- klik install.bat
- lalu start.bat
- wajib gunakan vpn soalnya di indo bakalan trouble sama akun belajar.id

### Custom domain isu
Chat ke https://t.me/aisbirkoenz
atau join grub wa gw
https://chat.whatsapp.com/Ctkzu6cmHasDYaYtPFdHyN

# Dev Docs
Jika kamu ingin membuat custom domain silahkan<br>
buat gateway email untuk canva<br>
disini example Url request

Get Email canva
```batch
GET https://aisbirapi.cyclic.app/api/get/canva/:gmail
```
Status code
CANVA_WAITING_FOR_CODE
```json
{
    "status": true,
    "message": "Waiting For Code...",
    "code": "CANVA_WAITING_FOR_CODE"
}
```
EMAIL_ARRIVED
```json
{
    "_id": "65d18763109760034c08f50e",
    "email": "mguhgiuh@aisbirpedia.my.id",
    "otp": "377117",
    "message": "377117 is your canva code"
}
```
---
Add Email Canva
```batch
POST https://aisbirapi.cyclic.app/api/post/canva/:gmail/:otp/:message
```

Delete Email
```batch
GET https://aisbirapi.cyclic.app/api/get/delete/canva/:gmail
```

## Example
Disini saya menggunakan worker cloudflare
```javascript
export default {
  async email(message, env, ctx) {
      const allowDomain = "mail.canva.com";
    const senderEmailDomain = message.from.split('@')[1];
    if (senderEmailDomain !== allowDomain) {
      return false;
    }

       const subject = message.headers.get('subject');
    const regexMatch = subject.match(/\b\d+\b/);
    const otpNumber = regexMatch ? regexMatch[0] : null;
if(otpNumber !== null){
  console.log("Not Null")
    await fetch(`https://aisbirapi.cyclic.app/api/post/canva/${message.to}/${otpNumber}/${encodeURIComponent(subject)}`, {
      method: 'POST',
    });
}
else {
  console.log("Empty canva otp")
}
  }
  }
```

### Kebingungan?
tanya ke [@penyukaberuang](https://t.me/penyukaberuang)

