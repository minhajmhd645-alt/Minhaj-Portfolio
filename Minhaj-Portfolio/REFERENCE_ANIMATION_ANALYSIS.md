# Reference animation analysis

Inspection date: 2026-10-30. The reference was opened in a fresh browser tab at `https://aakashgugilla.is-a.dev/`.

## Confirmed observations

- The hero is a full-bleed, nighttime developer workspace. The copy occupies the left; a seated developer and several code monitors fill the right. A city skyline and handwritten note panels sit behind the desk, and a curved Earth horizon fills the lower-right.
- After the initial load settled, the developer had a side profile at the 5-second view and faced away by the 10-second view. This is real movement in the scene, not a zoom applied to a still.
- The Earth’s cyan orbital trails changed shape and position between the 5- and 10-second views. Small points of light also appeared in different positions. The background has a visible pause control.
- The public DOM contains five `<video>` elements. Their public source children are MP4 files: `/hero-bg.mp4`, `/about_me.mp4`, `/project_bg.mp4`, `/tools_skills.mp4`, and `/contact.mp4`. The hero video has poster `/hero-poster.webp`; each video is `autoplay`, `loop`, `muted`, `playsinline`, and uses `preload="metadata"`. The other four videos are marked `aria-hidden="true"`.
- No `<canvas>` elements were present in the inspected page. The DOM contains SVG elements, but the inspection does not establish that SVG is used for the visible moving Earth paths.
- The page is a Next.js app with a hashed CSS file and Next.js/Turbopack JavaScript chunks. The visible styling resembles utility-class CSS. The browser exposed no standalone Google Fonts stylesheet link, so the precise font family and numeric color values are unverified.
- The header is sticky and translucent, with a logo at left, section links centered, and a purple “Let’s Connect” action at right. Hero typography is large, rounded/geometric, and white, with a purple word accent. Buttons are rounded, dark/transparent, and purple-glowing. The live IST clock updates.
- Scrolling reveals another full-bleed illustrated environment behind the About content, with a city and a large planet, suggesting section-specific background video rather than one fixed hero image.

## Unverified or limited observations

- The reference’s root HTML, hashed CSS, and JavaScript files could not be fetched from PowerShell: `Invoke-WebRequest` reported that the SSL connection could not be established, and `curl.exe` reported `schannel: AcquireCredentialsHandle failed: SEC_E_NO_CREDENTIALS (0x8009030e)`. Browser inspection exposed the stylesheet URL and public video element metadata, but direct navigation to the hashed stylesheet returned `ERR_BLOCKED_BY_CLIENT`. The exact served CSS/JS source therefore remains unavailable. I did not bypass these restrictions.
- Mouse-reactive behavior was not verified. The reference was inspected by direct navigation and scrolling; no supported pointer-move-only action was available in the browser surface.
- Mobile styling was not verified. The browser viewport override did not change the rendered desktop layout, so observations below the desktop breakpoint remain uncertain.
- The exact font, CSS animation library, video encoding, video duration, and whether some star/orbital motion is baked into the MP4 or layered on top could not be confirmed. The observed turn and changing orbital paths are confirmed visually; their internal source is not.

## Implementation plan

| Layer | Planned implementation |
| --- | --- |
| Cinematic environment | Implemented with an openly licensed, locally stored looping MP4 and a locally stored poster as the load/reduced-motion fallback. |
| Developer/workspace motion | Implemented using Pexels video 33656654, “Overworked Programmer in Dimly Lit Room,” by Attila Pergel. The clip shows an actual person at a multi-monitor workstation; no motion is faked from a still. The local 1280×720, 30fps file is 3.9 MB. |
| Monitor and ambient light | Layer violet/blue color grading and gradients over the live video; keep the left text area shaded. |
| Particles | Implemented as one small Canvas field; cap device pixel ratio and count, respond gently to pointer position, and stop its frame loop while hidden or out of view. |
| Earth | Implemented as a bottom-right Canvas planet with curved horizon, atmospheric edge, grid, and generated city-light points. |
| Orbital/energy paths | Implemented as four visibly moving curved Canvas trails with traveling light nodes around the horizon. |
| Interaction/parallax | Implemented low-amplitude pointer response in particle movement; the human figure is not distorted separately. |
| Foreground motion | GSAP/ScrollTrigger reveal code is included, with IntersectionObserver fallback. During this local test the browser blocked direct JSDelivr navigation (`net::ERR_BLOCKED_BY_CLIENT`), so the fallback path was active; the external library itself could not be runtime-verified here. |
| Foreground | Preserve the Minhaj name, supplied headline/copy, buttons, social links, availability, Kandy label, and Asia/Colombo clock. |

## Performance and accessibility

- Use a compressed, muted 1280×720 MP4 with a locally stored poster and no audible track. Use fewer particles on small screens.
- Cap Canvas backing resolution, keep particle counts modest, and run one animation loop per Canvas. Pause rendering when the page is hidden or the hero is outside the viewport.
- Respect `prefers-reduced-motion` by pausing video and drawing a still poster plus static Earth/wave frames. Provide a keyboard-operable video pause control with an accessible name.
- Use GSAP for restrained foreground entrance timing and ScrollTrigger for section visibility/cleanup; use native Canvas/CSS for continuous background motion.

## Distinction between observation and approximation

The reference’s full-motion MP4 backgrounds and visible human movement are confirmed. This implementation uses a separate Pexels-licensed stock clip and original Canvas/CSS effects; it does not reuse reference videos, posters, or art. The reference’s exact CSS values and internal animation code remain unverified because the reference server’s TLS setup failed in PowerShell and the browser blocked the stylesheet URL. Any orbital details recreated in Canvas are approximations of the observed motion and composition.

## Local verification

The page, local MP4, poster, and resume returned HTTP 200 from a local Python HTTP server. `node --check` passed for the page scripts. In a fresh local browser tab the video reached different frames over time, the orbital trail moved, and the pause/resume control stopped and restarted playback with updated accessible labels. Bootstrap, GSAP, Lucide, and Google Fonts are linked from their CDNs; public CDN loading could not be verified in this browser because direct JSDelivr navigation was blocked, and PowerShell’s TLS setup also failed. The page retains the animated local video/Canvas layers and IntersectionObserver reveal fallback without those libraries.

## Local video attribution

Pexels video 33656654, “Overworked Programmer in Dimly Lit Room,” by Attila Pergel: [video page](https://www.pexels.com/video/overworked-programmer-in-dimly-lit-room-33656654/) · [Pexels license](https://www.pexels.com/license/). The downloaded 1280×720 copy and matching poster are stored locally at `assets/images/developer-workspace.mp4` and `assets/images/developer-workspace-poster.avif`.
