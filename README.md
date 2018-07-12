# Lightbox-by-Alex
Free basic lightbox built from scratch using javascript and css


# Setup
- Download the alexBox.css from the css folder
- Download the alexBox.js from the js folder
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
- As seen for pictures, anchor tag class must be "alex-box" and attribute "gallery-alex-box" with a valid value
- Plus, anchor tag must include the type attribute with "video" value

```sh
<a href="path/to/full/video" class="alex-box" gallery-alex-box="myGallery2" type="video">
    <img src="path/to/thumbnail">
</a>
```
# Features
- Navigate through the pictures with keypress (🡄 🡆)
- Multiple (separated) galleries in one page

# Upcoming Features
- Navigate through the pictures with swipe (⮨ ⮩)
- Visual improvements


# ENJOY!
