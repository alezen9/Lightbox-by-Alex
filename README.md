# Lightbox-by-Alex
Free basic lightbox built from scratch using javascript and css


# Setup
- Download the alexBox.min.css from the css folder ( ~ 2kb)
- Download the alexBox.min.js from the js folder ( ~ 5kb)
- Add them to your page (css inside the head tag and js preferably at the bottom before the body closing tag)


# How to use it
Just wrap an img tag into an anchor tag.


**PICTURES**

**important**
- anchor tag class must be "alex-box" and attribute "gallery-alex-box" with a valid value

```sh
<a href="path/to/full/picture" class="alex-box" gallery-alex-box="myGallery">
    <img src="path/to/thumbnail">
</a>
```

**VIDEOS**

**important**
- Only mp4 formats are supported
- As seen for pictures, anchor tag class must be "alex-box" and attribute "gallery-alex-box" with a valid value
- Anchor tag must include the type attribute with "video" value

```sh
<a href="path/to/full/video" class="alex-box" gallery-alex-box="myGallery2" type="video">
    <img src="path/to/thumbnail">
</a>
```
# Features
- Navigate through the pictures with keypress (🡄 🡆)
- Exit with 'esc' key, tap/click on space around image, tap/click on "x" or swipe up or down
- Navigate through the pictures with arrows click (◄  ►)
- Navigate through the pictures with swipe (⮨ ⮩)
- Video support (only mp4 format)
- Multiple (separated) galleries in one page

# Upcoming Features
- Youtube videos support (maybe)
- Visual improvements


# ENJOY!
