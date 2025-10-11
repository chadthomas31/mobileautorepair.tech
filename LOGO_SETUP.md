# Logo Integration Instructions

## Logo File Setup

Your new logo has been integrated into the Header and Footer components. To complete the setup:

### Required Action:
**Save the logo file as `/public/logo.png`**

The logo image you provided should be saved to:
```
/home/chad/projects/mobileautorepair.tech/public/logo.png
```

### Logo Specifications:
- **Format:** PNG (with transparent background recommended)
- **Recommended dimensions:** 600x200px or similar aspect ratio
- **File size:** Optimize to < 100KB for fast loading

### Where the Logo Appears:

1. **Header (Desktop & Mobile)**
   - Location: Top left of navigation
   - Size: Height of 48px (auto width)
   - File: `components/Header.tsx`

2. **Footer**
   - Location: Top of footer, first column
   - Size: Height of 64px (auto width)
   - Style: Inverted colors (white) for dark background
   - File: `components/Footer.tsx`

### Technical Details:

Both components now use Next.js `Image` component for:
- Automatic optimization
- Lazy loading (except header which uses `priority`)
- Responsive sizing
- Better performance

### Logo Styling:

**Header:**
- Natural colors (as designed)
- Priority loading for above-the-fold content
- Responsive sizing

**Footer:**
- Inverted to white using CSS filters (`brightness-0 invert`)
- Works well on dark gray background
- Maintains brand consistency

### Alternative: SVG Format

If you prefer SVG format for better scalability:
1. Save as `/public/logo.svg`
2. Update both components to use `src="/logo.svg"`
3. SVG will scale perfectly at any size

### Favicon Update (Optional)

Consider also updating the favicon to match your logo:
1. Create a 32x32px or 64x64px version
2. Save as `/public/favicon.ico`
3. Next.js will automatically use it

---

## Changes Made:

### `components/Header.tsx`
- Removed `Wrench` icon import
- Added `Image` from `next/image`
- Replaced icon + text with logo image
- Maintained mobile phone number display

### `components/Footer.tsx`
- Removed `Wrench` icon import
- Added `Image` from `next/image`
- Replaced icon + text with logo image
- Applied white color filter for dark background

---

## Next Steps:

1. ✅ Save logo as `/public/logo.png`
2. ✅ Test the site to ensure logo displays correctly
3. ✅ Verify logo looks good on both light (header) and dark (footer) backgrounds
4. ✅ Check mobile responsiveness
5. ✅ Consider creating a favicon from the logo

---

## Troubleshooting:

**Logo not showing?**
- Verify file is saved as `/public/logo.png` (exact path)
- Check file permissions (should be readable)
- Clear browser cache and refresh
- Check browser console for errors

**Logo too large/small?**
- Adjust `width` and `height` props in Image components
- Modify `className` height values (h-12, h-16)

**Logo colors wrong in footer?**
- Remove `brightness-0 invert` classes if you want original colors
- Or create a separate white version of the logo
