#!/bin/bash
zip -r -FS ../fastreader.xpi * --exclude '*.git*' --exclude 'README.md' --exclude 'preview.png' --exclude 'preview.gif'
