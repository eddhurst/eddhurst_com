/*
  Sculptures — the single source of truth for sculpture.html.

  To add a sculpture, put the photograph in images/sculptures/ and add an entry:
    image        (required) Relative path, e.g. "images/sculptures/owl.jpg"
    width/height (required) Pixel size of the image (prevents layout shift)
    alt          (required) What the photograph shows: form, stone, finish
    title        (required)
    material     (required) e.g. "Portland limestone"
    year         (required) e.g. "2026"
    description  (optional)
    placeholder  (optional) true = clearly marked as a placeholder

  The entries below are PLACEHOLDERS. Replace them with real photographs.
*/
window.SCULPTURES = [
  { image: "images/sculptures/placeholder-01.svg", width: 1200, height: 1500, alt: "Placeholder: no sculpture photograph yet (portrait, 4:5).", title: "Placeholder 01", material: "Material to be added", year: "Year to be added", description: "Replace this entry in data/sculptures.js with a real photograph and details.", placeholder: true },
  { image: "images/sculptures/placeholder-02.svg", width: 1500, height: 1000, alt: "Placeholder: no sculpture photograph yet (landscape, 3:2).", title: "Placeholder 02", material: "Material to be added", year: "Year to be added", placeholder: true },
  { image: "images/sculptures/placeholder-03.svg", width: 1200, height: 1200, alt: "Placeholder: no sculpture photograph yet (square).", title: "Placeholder 03", material: "Material to be added", year: "Year to be added", placeholder: true },
  { image: "images/sculptures/placeholder-04.svg", width: 1000, height: 1500, alt: "Placeholder: no sculpture photograph yet (tall portrait, 2:3).", title: "Placeholder 04", material: "Material to be added", year: "Year to be added", placeholder: true },
  { image: "images/sculptures/placeholder-05.svg", width: 1600, height: 1200, alt: "Placeholder: no sculpture photograph yet (landscape, 4:3).", title: "Placeholder 05", material: "Material to be added", year: "Year to be added", placeholder: true },
  { image: "images/sculptures/placeholder-06.svg", width: 1200, height: 1600, alt: "Placeholder: no sculpture photograph yet (portrait, 3:4).", title: "Placeholder 06", material: "Material to be added", year: "Year to be added", placeholder: true },
];
