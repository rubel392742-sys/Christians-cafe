/* =========================================================
   script.js  -  Single Christians pre-lander
   ========================================================= */

/* ---------------------------------------------------------
   1) PUT YOUR MAXBOUNTY TRACKING LINKS HERE (only place!)
   --------------------------------------------------------- */
var TRACKING_LINK_DESKTOP = "YOUR_DESKTOP_LINK_HERE";   // computer / laptop visitors
var TRACKING_LINK_MOBILE  = "YOUR_MOBILE_LINK_HERE";    // phone / tablet visitors
/* If you use only one link, put it in DESKTOP and leave MOBILE as it is:
   mobile visitors will then use the DESKTOP link too. */

function isMobileDevice() {
  var ua = navigator.userAgent || "";
  if (/Android|iPhone|iPod|iPad|Mobile|Opera Mini|IEMobile|BlackBerry|Silk/i.test(ua)) return true;
  // newer iPads report themselves as a Mac but have touch screens
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true;
  return false;
}

function getTrackingLink() {
  var m = TRACKING_LINK_MOBILE;
  if (isMobileDevice() && m && m.indexOf("YOUR_") !== 0) return m;
  return TRACKING_LINK_DESKTOP;
}

/* --------------------------------------------------------- */

(function () {
  // footer year
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // fill age dropdown (28 - 80)
  var age = document.getElementById("age");
  for (var i = 28; i <= 80; i++) {
    var o = document.createElement("option");
    o.value = i;
    o.textContent = i;
    age.appendChild(o);
  }

  // if you add hero.jpg next to index.html, show it instead of the drawing
  var img = new Image();
  img.onload = function () {
    var left = document.querySelector(".hero-left");
    if (left) left.classList.add("has-photo");
  };
  img.src = "hero.jpg";

  // form: validate, then send visitor to the tracking link
  var form = document.getElementById("signup");
  var err = document.getElementById("err");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!age.value) {
      err.classList.add("show");
      age.focus();
      return;
    }
    err.classList.remove("show");
    window.location.href = getTrackingLink();
  });

  // extra "JOIN FREE" button(s): go straight to the SAME tracking link
  // (desktop link for computers, mobile link for phones)
  var go = document.querySelectorAll(".js-go");
  for (var k = 0; k < go.length; k++) {
    go[k].setAttribute("href", getTrackingLink());
  }

  age.addEventListener("change", function () {
    if (age.value) err.classList.remove("show");
  });
})();
