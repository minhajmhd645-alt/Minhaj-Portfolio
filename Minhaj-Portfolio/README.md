# Minhaj Portfolio

A responsive portfolio for Mohammadu Musthafa Minhaj. It retains the supplied profile, education, qualifications, projects, resume, GitHub, LinkedIn, and contact information. The visual language follows the observed public reference’s compact navigation, dark illustrated environments, geometric typography, and violet accents.

## Cinematic hero

The hero uses a muted, looping local MP4 of a developer at a multi-monitor workspace, layered with original Canvas particles, a moving orbital Earth, CSS color grading, and a keyboard-operable background-motion control. The video pauses when the hero is off screen, the tab is hidden, or reduced motion is requested; visitors can explicitly opt in from the motion control. The local poster is shown before playback and if the video cannot load. The stock clip is illustrative and does not depict Minhaj.

Video: Pexels video 33656654, “Overworked Programmer in Dimly Lit Room,” by Attila Pergel ([video page](https://www.pexels.com/video/overworked-programmer-in-dimly-lit-room-33656654/)), under the [Pexels License](https://www.pexels.com/license/). Files: `assets/images/developer-workspace.mp4` and `assets/images/developer-workspace-poster.avif`.

Reference inspection findings, confirmed behavior, and technical limitations are recorded in `REFERENCE_ANIMATION_ANALYSIS.md`.

## Run locally

Open `index.html` with VS Code Live Server, or run a static HTTP server from this folder. No build step or backend is required. Bootstrap, GSAP, Lucide, and Google Fonts load from CDNs and need internet access; the video and poster are local.

## Update content

- Add sourced project screenshots in `assets/projects/` and update preview markup in `js/projects.js`; current previews are decorative.
- Project cards link to Minhaj’s GitHub profile because individual repository URLs have not been verified.
- Replace `assets/resume/Minhaj_Resume.pdf` with the current resume while keeping its name, or update the links in `index.html`.
- Update profile, education, qualifications, and contact information in `index.html`; edit skills in `js/skills.js`.

## Accessibility and motion

Navigation and category filters are keyboard operable. The background motion control can pause and resume the hero animation. The video automatically pauses out of view and under a reduced-motion preference; decorative Canvas effects become static. Scroll reveals use GSAP/ScrollTrigger when their CDN scripts load, with an IntersectionObserver fallback. Skill cards intentionally omit proficiency scores.
