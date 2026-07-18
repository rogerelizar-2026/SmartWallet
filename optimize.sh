#!/bin/bash

# Smart Finance - Build Script for Production Optimization
# This script minifies all assets for better performance

set -e

echo "🚀 Starting optimization process..."

# Minify JavaScript files
echo "📦 Minifying JavaScript..."
terser js/app.js -o js/app.min.js --compress --mangle
echo "✅ app.js: $(wc -c < js/app.js) bytes → $(wc -c < js/app.min.js) bytes"

terser sw.js -o sw.min.js --compress --mangle
echo "✅ sw.js: $(wc -c < sw.js) bytes → $(wc -c < sw.min.js) bytes"

# Minify CSS
echo "🎨 Minifying CSS..."
csso styles.css -o styles.min.css
echo "✅ styles.css: $(wc -c < styles.css) bytes → $(wc -c < styles.min.css) bytes"

# Minify HTML
echo "📄 Minifying HTML..."
html-minifier-terser index.html -o index.min.html --collapse-whitespace --remove-comments --minify-css --minify-js
echo "✅ index.html: $(wc -c < index.html) bytes → $(wc -c < index.min.html) bytes"

echo ""
echo "🎉 Optimization complete!"
echo ""
echo "📊 Summary:"
JS_ORIG=$(($(wc -c < js/app.js) + $(wc -c < sw.js)))
JS_MIN=$(($(wc -c < js/app.min.js) + $(wc -c < sw.min.js)))
JS_PCT=$((JS_MIN * 100 / JS_ORIG))
CSS_PCT=$(($(wc -c < styles.min.css) * 100 / $(wc -c < styles.css)))
HTML_PCT=$(($(wc -c < index.min.html) * 100 / $(wc -c < index.html)))
echo "   - JavaScript: ${JS_PCT}% of original size"
echo "   - CSS: ${CSS_PCT}% of original size"
echo "   - HTML: ${HTML_PCT}% of original size"
echo ""
echo "💾 Total savings: $((JS_ORIG + $(wc -c < styles.css) + $(wc -c < index.html) - JS_MIN - $(wc -c < styles.min.css) - $(wc -c < index.min.html))) bytes"
