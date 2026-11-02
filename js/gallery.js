/*
  gallery.js — renders data/sculptures.js and adds an accessible lightbox.
  Each photo is a real link to the image file, so it still works if the
  lightbox can't run. The lightbox is a native modal <dialog>, which gives
  us focus containment, Escape-to-close and an inert background for free.
*/
(function () {
  "use strict";

  var container = document.querySelector("[data-gallery]");
  var dialog = document.getElementById("lightbox");
  if (!container) return;

  var sculptures = Array.isArray(window.SCULPTURES) ? window.SCULPTURES : [];

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      var value = attrs[key];
      if (value === undefined || value === null || value === false) return;
      if (key === "text") node.textContent = value;
      else if (key === "className") node.className = value;
      else node.setAttribute(key, value);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  var ZOOM_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';

  function detailsText(item) {
    return [item.material, item.year].filter(Boolean).join(" · ");
  }

  /* ---------- Render ---------- */
  if (!sculptures.length) {
    container.replaceChildren(
      el("p", { className: "empty-state", text: "Photographs are on their way. The stone takes its time." })
    );
    return;
  }

  var list = el("ul", { className: "gallery" });
  sculptures.forEach(function (item, index) {
    var titleId = "sculpture-" + (index + 1);

    var link = el("a", {
      className: "gallery__link",
      href: item.image,
      "data-index": String(index),
      "aria-describedby": titleId,
    }, [
      el("img", {
        src: item.image,
        alt: item.alt,
        width: item.width,
        height: item.height,
        loading: index < 2 ? "eager" : "lazy",
        decoding: "async",
      }),
      el("span", { className: "sr-only", text: "View larger" }),
    ]);
    link.insertAdjacentHTML("beforeend", '<span class="gallery__zoom">' + ZOOM_SVG + "</span>");

    var header = el("div", { className: "gallery__header" }, [
      el("h2", { className: "gallery__title", id: titleId, text: item.title }),
      item.placeholder ? el("span", { className: "tag tag--placeholder", text: "Placeholder" }) : null,
    ]);

    var details = el("p", { className: "gallery__details annotation" }, [
      el("span", { text: item.material }),
      el("span", { text: item.year }),
    ]);

    var caption = el("figcaption", { className: "gallery__caption" }, [
      header,
      details,
      item.description ? el("p", { className: "gallery__description", text: item.description }) : null,
    ]);

    list.appendChild(el("li", { className: "gallery__item" }, [el("figure", {}, [link, caption])]));
  });
  container.replaceChildren(list);

  /* ---------- Lightbox ---------- */
  if (!dialog || typeof dialog.showModal !== "function") return;

  var image = dialog.querySelector("[data-lightbox-image]");
  var title = dialog.querySelector("[data-lightbox-title]");
  var details = dialog.querySelector("[data-lightbox-details]");
  var description = dialog.querySelector("[data-lightbox-description]");
  var counter = dialog.querySelector("[data-lightbox-counter]");
  var status = dialog.querySelector("[data-lightbox-status]");
  var closeButton = dialog.querySelector("[data-lightbox-close]");
  var prevButton = dialog.querySelector("[data-lightbox-prev]");
  var nextButton = dialog.querySelector("[data-lightbox-next]");

  var current = 0;
  var opener = null;

  function show(index, announce) {
    var total = sculptures.length;
    current = (index + total) % total;
    var item = sculptures[current];

    image.src = item.image;
    image.alt = item.alt;
    image.width = item.width;
    image.height = item.height;
    title.textContent = item.title;
    details.textContent = detailsText(item);
    description.textContent = item.description || "";
    description.hidden = !item.description;
    counter.textContent = String(current + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");

    var single = total < 2;
    prevButton.hidden = single;
    nextButton.hidden = single;

    // Polite announcement when moving between images (not on first open —
    // the dialog's own label is read then).
    status.textContent = announce ? "Image " + (current + 1) + " of " + total + ": " + item.title : "";
  }

  function open(index, trigger) {
    opener = trigger || document.activeElement;
    show(index, false);
    document.documentElement.classList.add("is-locked");
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeButton.focus();
  }

  function restore() {
    document.documentElement.classList.remove("is-locked");
    document.body.style.overflow = "";
    status.textContent = "";
    if (opener && typeof opener.focus === "function") opener.focus();
    opener = null;
  }

  list.addEventListener("click", function (event) {
    var link = event.target.closest(".gallery__link");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    open(Number(link.getAttribute("data-index")), link);
  });

  closeButton.addEventListener("click", function () { dialog.close(); });
  prevButton.addEventListener("click", function () { show(current - 1, true); });
  nextButton.addEventListener("click", function () { show(current + 1, true); });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1, true); }
    else if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1, true); }
  });

  // Clicking the empty stage area (not the image or controls) closes it.
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target.hasAttribute("data-lightbox-dismiss")) dialog.close();
  });

  // Fires for Escape, the close button and backdrop clicks alike.
  dialog.addEventListener("close", restore);
})();
