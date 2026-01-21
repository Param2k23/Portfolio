# 🎁 Quick Start Guide - Adding Your Images & Video

## 📋 What You Need To Do

You need to add **15 media files** total to make this work:

### 1️⃣ Background Images (12 files)
**Location:** `Portfolio/public/special-delivery/images/`
**Files needed:**
```
bg-1.jpg
bg-2.jpg
bg-3.jpg
bg-4.jpg
bg-5.jpg
bg-6.jpg
bg-7.jpg
bg-8.jpg
bg-9.jpg
bg-10.jpg
bg-11.jpg
bg-12.jpg
```

**What they're used for:** These create a beautiful scrolling background animation on the first page

**Recommended size:** 400x300 pixels (landscape)
**Format:** JPG or PNG

---

### 2️⃣ Memory Card Images (3 files)
**Location:** `Portfolio/public/special-delivery/images/`
**Files needed:**
```
memory-1.jpg  → "The Beginning" card
memory-2.jpg  → "Through Distance" card
memory-3.jpg  → "Here & Now" card
```

**What they're used for:** These are the main photos displayed in the memory cards section

**Recommended size:** 500x600 pixels (portrait/vertical)
**Format:** JPG or PNG

---

### 3️⃣ Video File (1 file)
**Location:** `Portfolio/public/special-delivery/`
**File needed:**
```
video.mp4
```

**What it's used for:** This is your surprise video message that plays after the countdown

**Recommended specs:**
- Format: MP4
- Max size: 50MB (for faster loading)
- Resolution: 1080p or 720p

---

## 🚀 How to Add the Files

1. **Open the folder:** Navigate to `d:\VS\portfolio\Portfolio\public\special-delivery\`

2. **Add your images:**
   - Place all 15 images (12 bg-*.jpg + 3 memory-*.jpg) in the `images/` subfolder
   - Make sure the filenames match EXACTLY as shown above

3. **Add your video:**
   - Place `video.mp4` directly in the `special-delivery/` folder (NOT in images/)

4. **Verify file structure should look like:**
   ```
   special-delivery/
   ├── video.mp4
   ├── images/
   │   ├── bg-1.jpg
   │   ├── bg-2.jpg
   │   ├── ... (all 12 bg files)
   │   ├── memory-1.jpg
   │   ├── memory-2.jpg
   │   └── memory-3.jpg
   └── HOW_TO_ADD_MEDIA.md (this file)
   ```

---

## ✅ Before You Deploy

- [ ] All 12 background images are named correctly (bg-1.jpg through bg-12.jpg)
- [ ] All 3 memory images are in place (memory-1.jpg, memory-2.jpg, memory-3.jpg)
- [ ] Video file is named exactly `video.mp4`
- [ ] All files are in the correct folders
- [ ] Test locally with `npm start` to make sure everything loads
- [ ] Update `HER_NAME` in the code (see below)

---

## 🎨 Optional Customizations

### Change Her Name
In `src/components/SpecialDelivery.js`, line 8:
```javascript
const HER_NAME = '[HER NAME]';  // ← Change this!
```

### Change the Password
In `src/components/SpecialDelivery.js`, line 7:
```javascript
const PASSWORD = '08062020';  // ← Change this!
```

### Edit the Messages
You can customize the text in any of the memory cards or other sections by editing the text in `SpecialDelivery.js`

---

## 🎯 What Changed

✅ **Removed:** Audio/song section (for now - can be added back later)
✅ **Updated:** All images now point to your custom files
✅ **Updated:** Video now uses your custom video file
✅ **Ready:** The page will work as soon as you add the 15 media files!

---

## 💡 Tips

- **Compress your images** using tools like [TinyPNG](https://tinypng.com/) to make the page load faster
- **Choose meaningful photos** for the memory cards
- **Keep video under 50MB** for best performance
- **Test on mobile** after deploying to make sure it looks good on her phone

---

## 🐛 Troubleshooting

**Images not showing?**
- Check that filenames match EXACTLY (case-sensitive)
- Verify files are in the correct folders
- Make sure you're using .jpg or .png format

**Video not playing?**
- Ensure it's in MP4 format
- Try converting with a tool like HandBrake if needed
- Check the file isn't too large

---

Good luck! This is going to be amazing! 💝
