#!/bin/bash
# Cleanup unused files in the unpop website project.
# Generated after auditing every asset reference across all .html, .css and .js files.
#
# Usage:
#   cd "/Users/warunyapootpan/Documents/Claude/Projects/unpop website"
#   bash cleanup-unused.sh
#
# Tip: run "git status" first if this folder is under version control.

cd "$(dirname "$0")" || exit 1

echo "Cleaning up unused files..."

# ── 1. Backups and OS junk ────────────────────────────────
rm -f styles.css.bak styles.css.bak2 styles.css.bak3 styles.css.bak4
rm -f .DS_Store assets/.DS_Store
rm -f assets/logo/.writetest

# ── 2. Dead pages ─────────────────────────────────────────
# bg5-foundation.html: course removed, no page links to it anymore
# preview.html / logo-preview.html: internal dev previews, not linked from the site
rm -f bg5-foundation.html
rm -f preview.html
rm -f logo-preview.html

# ── 3. Images not referenced anywhere ─────────────────────
rm -f "assets/khai-logo.png"
rm -f "assets/khai-bg5-chart.png"
rm -f "assets/post-gut-feeling-clearly.png"
rm -f "assets/post-emotional-clarity.png"
rm -f "assets/post-capitalism.png"
rm -f "assets/icon-ihds.png"
rm -f "assets/icon-jovian.png"
rm -f "assets/icon-innerblueprint.png"
rm -f "assets/logo Patreon.png"
rm -f "assets/logo IG.png"
rm -f "assets/logo Youtube.png"
rm -f "assets/logo Tiktok.png"
rm -f "assets/IACET accredited.pdf"
rm -f "assets/bg5-foundation-cover.jpg"

# Were only used by bg5-foundation.html
rm -f "assets/BG5-cover-156.jpg"
rm -f "assets/bg5-journey-roadmap.png"
rm -f "assets/iacet-accredited-1.png"

# ── 4. Unused emoji icons ─────────────────────────────────
rm -f "assets/emoji certificate.png"
rm -f "assets/emoji important note.png"
rm -f "assets/emoji warning.png"

# ── 5. Unused stickers ────────────────────────────────────
rm -f assets/stickers/cursor-pink.svg
rm -f assets/stickers/flower-sky.svg
rm -f assets/stickers/arrow-ink.svg
rm -f assets/stickers/plus-ink.svg
rm -f assets/stickers/eye-butter.svg

echo "Done."
echo
echo "Still kept: the assets/logo/ brand kit (~87 files)."
echo "The site now only uses 3 of them: mark-favicon.svg, favicon-32.png, favicon-180.png"
echo "Run 'bash cleanup-unused.sh --logos' to remove the rest as well."

# ── 6. Optional: old logo brand kit ───────────────────────
# The site's logo is now assets/Unpop logo.png. Everything in assets/logo/
# apart from the three favicon files is unused BY THE SITE, but you may still
# want these for social media, print or Canva. Opt in explicitly.
if [ "$1" = "--logos" ]; then
  echo
  echo "Removing unused logo files..."
  find assets/logo -type f \
    ! -name 'mark-favicon.svg' \
    ! -name 'favicon-32.png' \
    ! -name 'favicon-180.png' \
    -delete
  find assets/logo -type d -empty -delete
  echo "Done. assets/logo/ now contains only the favicon files."
fi
