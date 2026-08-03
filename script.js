/* =========================================================
   VES VES — Coffee Menu
   ملف الجافاسكريبت الرئيسي
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1) ظهور العناصر تدريجيًا أثناء التمرير (Scroll Reveal)
  --------------------------------------------------------- */
  const revealItems = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // تأخير بسيط متدرج لعناصر القائمة يظهر أثناء النزول
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 25);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach(item => revealObserver.observe(item));

  /* ---------------------------------------------------------
     2) الزر العائم: الانتقال إلى الحلويات / العودة لأعلى
  --------------------------------------------------------- */
  const floatBtn   = document.getElementById('floatBtn');
  const dessertSec = document.getElementById('dessert');

  let atBottom = false;

  const checkScrollPosition = () => {
    const scrollBottom = window.scrollY + window.innerHeight;
    const pageHeight    = document.documentElement.scrollHeight;

    // نعتبر أن المستخدم "وصل لآخر الصفحة" عند اقترابه من 60px من النهاية
    atBottom = scrollBottom >= pageHeight - 60;
    floatBtn.classList.toggle('is-up', atBottom);
    floatBtn.setAttribute(
      'aria-label',
      atBottom ? 'العودة إلى الأعلى' : 'الانتقال إلى قسم الحلويات'
    );
  };

  window.addEventListener('scroll', checkScrollPosition, { passive: true });
  checkScrollPosition();

  floatBtn.addEventListener('click', () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      dessertSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

});
