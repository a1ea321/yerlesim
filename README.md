# What this is

A simple floor plan marking &amp; sharing application you can access from your browser.

# Why I wrote this

I wanted to be able to send a link to my co-workers in order to show where stuff is in the company.
I looked around but could not find such an application.
The ones I found were too complex.
(I went in [this](https://wiki.openstreetmap.org/wiki/Indoor_Mapping) direction.)

## How it works

The main page, `index.html`, lists the directories found under `static/plans/` as links.
Each directory is supposed to contain the layers that make up a floor plan.
Upon clicking, the user is directed to the corresponding floor plan (`display.html`).

Plans are supposed to have several layers; such as walls, outlets, furniture, devices etc.
These layers are just transparent image files (see sample file tree below).
The application stacks them on top of each other in alphanumerical order - or whatever order Python's `sorted` uses.
(So you better name your files in the order you want to stack them.)
The user can then toggle these layers' visibility individually.
The URL in the address bar of the browser is updated when layers are toggled, so you can copy the link and share it.

You can also place a cursor anywhere on the image.
This also updates the address bar.

## Sample file tree

I will be committing some image files just to have a working example.
But here's another, theoretical example:

```
app/static/plans/
├── first-floor
│   ├── 1-walls.png
│   ├── 2-furniture.png
│   └── 3-annotations.png
└── second-floor
    ├── 1-walls.png
    ├── 2-furniture.png
    ├── 3-plants.png
    └── 4-annotations.png
```

## By the way

I suppose you can also use it for anatomy.
One layer could be skeleton.
The layer after that could be muscles etc.
