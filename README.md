Auto-Brackets
======

## Deprecation notice

I downloaded the latest version of Brackets today (0.42 at this moment), and read through the documentation when I found this method from the editor [Editor.getCloseBrackets](http://brackets.io/docs/current/modules/editor/Editor.html#Editor-getCloseBrackets) that reads:

_Gets whether the specified or current file uses auto close brackets_

So basically I discovered that Brackets does what this extension intended to do out of the box now, to activate it, open the preference file `Debug -> Open Preferences File` and add this line:

    "closeBrackets": true

And Cmd+R to reload the editor, now Brackets will close all your brackets (no pun intended) and ultimately doing what this extension was supposed to do way better than it currently does it.

So without further a due I declare this extension deprecated and I advise you use the native method.

Thank you all for your interest. 

------

An extension for [Brackets](https://github.com/adobe/brackets/) for automatic closure of brackets and curly braces on enter key.

### How to Install

1. Select Brackets > File > Extension Manager
2. Search for this extension.
3. Click on the Install button.

### How to use Auto-Brackets
When you write { , [ or ( and press enter, closes the tag and leaves the cursor in the middle line with correct indentation.

![Example](auto-brackets3.gif "Example")

***
Tested on Brackets Sprint 39, Mac OS X.
