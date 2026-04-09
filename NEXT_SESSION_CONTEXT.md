# ZERO Website Context

Repo path: `/home/branch/Official ZERO website`

Remote:
- `origin` -> `https://github.com/xXBRANCHXx/official-zero-website.git`

Branch:
- `master`

Known remote state before this next pass:
- remote `master` was last confirmed at `0ba9900964e8332accef75f3413c56492944f378`

Important workflow:
- User wants every meaningful website change committed and pushed.
- This repo can have unrelated dirty media changes in the worktree. Do not revert those.
- If normal `git push` fails because remote moved, fetch and create a remote-safe commit on top of `FETCH_HEAD`, then push that commit SHA to `master`.

Current design direction:
- Homepage should feel close to `linear.app` in structure and polish, but not as a literal clone.
- The site has now been shifted back into a bright white health-brand presentation.
- Teal-blue remains an accent color, but the page should stay mostly white and neutral.
- Navigation and search are active again on the homepage.
- The homepage includes a pinned product-scroll section built around transparent renders for Syrup, Drops, and Maple Topping.
- Images and glass surfaces should feel airy and clean rather than dark or heavy.
- Mobile behavior matters first: full-width sections, no horizontal overflow, clean stacking.

Current product/content sources:
- `public/Information/Zero Company Information.pdf`
- `public/Information/ZERO Syrup Info.pdf`
- `public/Information/ZERO Drops Information.pdf`
- `public/Information/ZERO Maple Topping Information.pdf`
- `public/Information/ZFIT Information.pdf`

Tracked media currently used safely:
- `public/ZERO Media/ZERO Syrup Images/Group Photo ZERO Syrup.png`
- `public/ZERO Media/ZERO Syrup Images/Fruit Variants ZERO Syrup.png`
- `public/ZERO Media/ZERO Syrup Images/Coffee Variants ZERO Syrup.png`
- `public/ZERO Media/100ml ACVS.png`
- `public/ZERO Media/250ml ACVS.png`
- `public/ZERO Media/Fiber Syrup Lemonade Pomegranate.png`

Logo assets:
- `public/ZERO logos/ZERO Logo Black.svg`
- `public/ZERO logos/ZERO Logo White.svg`

Homepage status:
- `index.html`, `index.css`, and `index.js` are the main homepage files.
- Search placeholder is already normal: `Search ZERO`.
- Favicon should use the ZERO logo asset.
- The homepage already includes image fade cards and scroll reveal logic.

Open goals after this pass:
- Keep refining the homepage until it feels more premium and more intentional.
- Consider bringing the same design system into `catalog.html`, `zfit.html`, and `legal.html`.
- Increase the “image emerges from white space” effect where helpful.
- Preserve clean mobile layout at every step.
