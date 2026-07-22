#!/bin/bash

# Smart Finance - Build Script for Production Optimization
# Este script minifica todos os assets para melhor performance
# Requer: npm install -g terser csso-cli html-minifier-terser

set -e

echo "🚀 Iniciando processo de otimização..."

# Verifica se as ferramentas estão instaladas
if ! command -v terser &> /dev/null; then
    echo "⚠️  terser não encontrado. Instalando..."
    npm install -g terser
fi

if ! command -v csso &> /dev/null; then
    echo "⚠️  csso não encontrado. Instalando..."
    npm install -g csso-cli
fi

if ! command -v html-minifier-terser &> /dev/null; then
    echo "⚠️  html-minifier-terser não encontrado. Instalando..."
    npm install -g html-minifier-terser
fi

# Minify JavaScript files
echo "📦 Minificando JavaScript..."
if [ -f js/app.js ]; then
    terser js/app.js -o js/app.min.js --compress --mangle
    ORIG=$(wc -c < js/app.js)
    MIN=$(wc -c < js/app.min.js)
    echo "✅ app.js: ${ORIG} bytes → ${MIN} bytes ($(echo "scale=2; ${MIN}*100/${ORIG}" | bc)%)"
fi

if [ -f sw.js ]; then
    terser sw.js -o sw.min.js --compress --mangle
    ORIG=$(wc -c < sw.js)
    MIN=$(wc -c < sw.min.js)
    echo "✅ sw.js: ${ORIG} bytes → ${MIN} bytes ($(echo "scale=2; ${MIN}*100/${ORIG}" | bc)%)"
fi

# Minify CSS
echo "🎨 Minificando CSS..."
if [ -f styles.css ]; then
    csso styles.css -o styles.min.css
    ORIG=$(wc -c < styles.css)
    MIN=$(wc -c < styles.min.css)
    echo "✅ styles.css: ${ORIG} bytes → ${MIN} bytes ($(echo "scale=2; ${MIN}*100/${ORIG}" | bc)%)"
fi

# Minify HTML
echo "📄 Minificando HTML..."
if [ -f index.html ]; then
    html-minifier-terser index.html -o index.min.html --collapse-whitespace --remove-comments --minify-css --minify-js
    ORIG=$(wc -c < index.html)
    MIN=$(wc -c < index.min.html)
    echo "✅ index.html: ${ORIG} bytes → ${MIN} bytes ($(echo "scale=2; ${MIN}*100/${ORIG}" | bc)%)"
fi

if [ -f login.html ]; then
    html-minifier-terser login.html -o login.min.html --collapse-whitespace --remove-comments --minify-css --minify-js
    ORIG=$(wc -c < login.html)
    MIN=$(wc -c < login.min.html)
    echo "✅ login.html: ${ORIG} bytes → ${MIN} bytes ($(echo "scale=2; ${MIN}*100/${ORIG}" | bc)%)"
fi

echo ""
echo "🎉 Otimização completa!"
echo ""
echo "📊 Resumo:"

# Calcula totais
JS_ORIG=0
JS_MIN=0
if [ -f js/app.js ] && [ -f js/app.min.js ]; then
    JS_ORIG=$((JS_ORIG + $(wc -c < js/app.js)))
    JS_MIN=$((JS_MIN + $(wc -c < js/app.min.js)))
fi
if [ -f sw.js ] && [ -f sw.min.js ]; then
    JS_ORIG=$((JS_ORIG + $(wc -c < sw.js)))
    JS_MIN=$((JS_MIN + $(wc -c < sw.min.js)))
fi

CSS_ORIG=0
CSS_MIN=0
if [ -f styles.css ] && [ -f styles.min.css ]; then
    CSS_ORIG=$(wc -c < styles.css)
    CSS_MIN=$(wc -c < styles.min.css)
fi

HTML_ORIG=0
HTML_MIN=0
if [ -f index.html ] && [ -f index.min.html ]; then
    HTML_ORIG=$((HTML_ORIG + $(wc -c < index.html)))
    HTML_MIN=$((HTML_MIN + $(wc -c < index.min.html)))
fi
if [ -f login.html ] && [ -f login.min.html ]; then
    HTML_ORIG=$((HTML_ORIG + $(wc -c < login.html)))
    HTML_MIN=$((HTML_MIN + $(wc -c < login.min.html)))
fi

TOTAL_ORIG=$((JS_ORIG + CSS_ORIG + HTML_ORIG))
TOTAL_MIN=$((JS_MIN + CSS_MIN + HTML_MIN))
SAVINGS=$((TOTAL_ORIG - TOTAL_MIN))

if [ $JS_ORIG -gt 0 ]; then
    JS_PCT=$(echo "scale=1; ${JS_MIN}*100/${JS_ORIG}" | bc)
    echo "   - JavaScript: ${JS_PCT}% do tamanho original"
fi

if [ $CSS_ORIG -gt 0 ]; then
    CSS_PCT=$(echo "scale=1; ${CSS_MIN}*100/${CSS_ORIG}" | bc)
    echo "   - CSS: ${CSS_PCT}% do tamanho original"
fi

if [ $HTML_ORIG -gt 0 ]; then
    HTML_PCT=$(echo "scale=1; ${HTML_MIN}*100/${HTML_ORIG}" | bc)
    echo "   - HTML: ${HTML_PCT}% do tamanho original"
fi

echo ""
echo "💾 Economia total: ${SAVINGS} bytes ($(echo "scale=1; ${SAVINGS}*100/${TOTAL_ORIG}" | bc)%)"
echo ""
echo "📁 Arquivos minificados criados:"
ls -lh *.min.* js/*.min.* 2>/dev/null || echo "   Nenhum arquivo minificado encontrado"
echo ""
echo "⚠️  IMPORTANTE: Em produção, atualize as referências nos arquivos HTML para usar as versões .min"
