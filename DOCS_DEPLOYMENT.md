# دليل النشر والاستضافة (Deployment Guide) - Route d'Égypte

هذا الدليل يشرح كيفية عمل الروابط (Routing) في التطبيق وكيفية نشره على مختلف المنصات.

## الوضع المعتمد حالياً: BrowserRouter (الروابط النظيفة)
حالياً، يستخدم التطبيق **BrowserRouter** وهو الخيار الأفضل لمحركات البحث (SEO) والمظهر الاحترافي.

### كيفية العمل على Vercel:
لقد قمت بإضافة ملف `vercel.json` في **المجلد الرئيسي (Root)** للمشروع. هذا الملف يخبر Vercel بأن يقوم بتوجيه كل الطلبات (مثل `/admin/dashboard`) إلى ملف الـ `index.html` حتى يتمكن متصفح المستخدم من تشغيل التوجيه بشكل صحيح.

- الرابط الآن يظهر بشكل نظيف: `https://yoursite.com/admin`

---

## في حالة الانتقال لاستضافة أخرى (مثل cPanel أو Netlify):
1. **Netlify**: الملف `public/_redirects` موجود وجاهز للعمل.
2. **Apache/cPanel**: ستحتاج لإنشاء ملف باسم `.htaccess` ووضع الكود التالي فيه:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## ملاحظات هامة:
- **في بيئة التطوير محلياً**: استخدم `npm run dev` كما هو معتاد.
- **للمعاينة بعد البناء**: استخدم `npm run preview`.
- **عند الرفع**: تأكد من رفع المجلد بالكامل مع ملف `vercel.json` الموجود في المجلد الرئيسي.
