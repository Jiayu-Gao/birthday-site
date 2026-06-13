document.addEventListener("DOMContentLoaded", () => {
  const coupons = document.querySelectorAll(".coupon-card");
  const finalMessage = document.getElementById("final-message");

  let openedCount = 0;

  coupons.forEach((coupon) => {
    coupon.addEventListener("click", () => {
      if (coupon.classList.contains("opened")) return;

      coupon.classList.add("opened");
      coupon.classList.add("flipped");

      openedCount++;

      if (openedCount === coupons.length) {
        setTimeout(() => {
          finalMessage.classList.add("show");
        }, 800);
      }
    });
  });
});