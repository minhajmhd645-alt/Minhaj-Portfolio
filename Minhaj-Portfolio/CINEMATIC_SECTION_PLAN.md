# Cinematic section plan

The portfolio will use a single visual language (night-sky surfaces, restrained violet/cyan light, Inter/Sora typography) while giving each major area its own motion grammar. The hero remains the only video scene. Every other section uses lightweight original CSS, SVG, Canvas, or DOM animation so it does not download or decode extra videos.

| Section | Visual concept | Interaction / trigger | Performance and truthfulness |
| --- | --- | --- | --- |
| Home | Muted developer-workspace video, atmosphere particles, animated Earth and orbital trails | Video pause/resume, pointer response | Existing local 720p clip; pauses offscreen/hidden and honors reduced motion |
| About | Abstract terminal glyph columns, interface brackets and data links | Canvas responds subtly to pointer; runs only in view | Decorative glyphs, not presented as Minhaj’s source code |
| Education | SVG progress route through the real education milestones | Path draws as timeline enters view; milestone reveals | Uses only supplied dates and qualifications |
| Projects | PrintXpress phone/cart; GlobeTrek illustrated terrain/routes; SafeNation Sri Lanka map/routing; NWSDB API/payment flow | PrintXpress conceptual cart control; card hover | All previews labelled conceptual studies, not screenshots, live data, predictions or real transactions |
| Skills | Connected category constellation built from existing skill categories | Pointer highlights nearby nodes; category filters remain keyboard-operable | No proficiency scores or newly claimed skills |
| Qualifications | Framed achievement gallery with a restrained light sweep and seal animation | Hover/focus emphasis and reveal | Keeps existing Reading/Completed labels and qualification names |
| Contact | Geographic connection field with animated nodes and links | Pointer-influenced network; contact links remain direct | Decorative network only; no invented recipients or location data |

Scroll reveals use GSAP/ScrollTrigger when those CDN scripts are available and IntersectionObserver fallback otherwise. Each background canvas has one animation loop, caps pixel ratio and runs only while its own section is visible; reduced-motion mode draws a static frame. Existing page scrolling and content remain intact.
