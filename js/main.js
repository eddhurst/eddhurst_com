/*
  main.js — small progressive enhancements shared by every page.
  Everything here is optional: the pages remain usable without it.
*/
(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};

  /* Build elements without innerHTML so data can never inject markup. */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value === undefined || value === null || value === false) return;
        if (key === "text") node.textContent = value;
        else if (key === "className") node.className = value;
        else node.setAttribute(key, value === true ? "" : value);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  var ARROW_SVG =
    '<svg class="arrow-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';

  function arrowLink(href, label, srSuffix) {
    var link = el("a", { href: href, className: "arrow-link", rel: "noopener" }, [
      el("span", { text: label }),
      srSuffix ? el("span", { className: "sr-only", text: " " + srSuffix }) : null,
    ]);
    link.insertAdjacentHTML("beforeend", ARROW_SVG);
    return link;
  }

  /* ---------- Current year ---------- */
  var year = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = year;
  });

  /* ---------- Social links from site-config.js ---------- */
  var socialLabels = { github: "GitHub", linkedin: "LinkedIn" };
  document.querySelectorAll("[data-social]").forEach(function (slot) {
    var key = slot.getAttribute("data-social");
    var url = config.social && config.social[key];
    if (!url) return;
    slot.replaceChildren(el("a", { href: url, rel: "me noopener", text: socialLabels[key] || key }));
  });

  /* ---------- Projects from data/projects.js ---------- */
  function renderProject(project, index) {
    var headingId = "project-" + (index + 1);

    var meta = el("div", { className: "project__meta" }, [
      el("span", { className: "project__number annotation", text: pad(index + 1) }),
      el("span", { className: "annotation", text: project.category }),
      project.placeholder ? el("span", { className: "tag tag--placeholder", text: "Placeholder" }) : null,
    ]);

    var tech = el(
      "ul",
      { className: "project__tech annotation", "aria-label": "Technologies" },
      (project.technologies || []).map(function (t) {
        return el("li", { text: t });
      })
    );

    var links = [];
    if (project.liveUrl) links.push(el("li", {}, [arrowLink(project.liveUrl, "View project", "— " + project.name)]));
    if (project.githubUrl) links.push(el("li", {}, [arrowLink(project.githubUrl, "Source on GitHub", "— " + project.name)]));

    var body = el("div", { className: "project__body" }, [
      el("h3", { className: "project__title", id: headingId, text: project.name }),
      el("p", { className: "project__description", text: project.description }),
      tech,
      links.length ? el("ul", { className: "project__links" }, links) : null,
    ]);

    var thumb = project.image
      ? el("div", { className: "project__thumb" }, [
          el("img", { src: project.image, alt: project.imageAlt || "", loading: "lazy", decoding: "async" }),
        ])
      : null;

    return el(
      "li",
      { className: "project" + (project.placeholder ? " is-placeholder" : ""), "aria-labelledby": headingId },
      [el("article", { className: "project__inner", "aria-labelledby": headingId }, [meta, body, thumb])]
    );
  }

  document.querySelectorAll("[data-projects]").forEach(function (container) {
    var all = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
    var featuredOnly = container.getAttribute("data-projects") === "featured";
    var list = featuredOnly
      ? all.filter(function (p) { return p.featured; }).slice(0, config.featuredProjectCount || 3)
      : all;

    if (!list.length) {
      container.replaceChildren(
        el("p", { className: "empty-state", text: "Nothing on the workbench just yet. New projects will appear here soon." })
      );
      return;
    }

    container.replaceChildren(el("ol", { className: "project-list" }, list.map(renderProject)));
  });
})();
