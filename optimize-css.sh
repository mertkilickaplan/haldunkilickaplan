#!/bin/bash

# CSS optimizasyonu için bash script
# Bu script, projedeki CSS dosyalarını optimize eder
# Kullanımı: ./optimize-css.sh

# Gerekli araçların yüklü olup olmadığını kontrol et
command -v npm >/dev/null 2>&1 || { echo "npm yüklü değil. Lütfen Node.js'i yükleyin."; exit 1; }

# Geçici klasör oluştur
mkdir -p temp

# CSS dosyasını geçici klasöre kopyala
cp styles.css temp/

# CleanCSS kurmak için package.json oluştur
echo '{
  "name": "css-optimizer",
  "version": "1.0.0",
  "description": "CSS optimizasyon aracı",
  "dependencies": {
    "clean-css-cli": "^5.6.2"
  }
}' > temp/package.json

# CleanCSS'i kur
echo "CleanCSS kuruluyor..."
cd temp && npm install

# CSS'i optimize et
echo "CSS optimize ediliyor..."
node_modules/.bin/cleancss -o styles.min.css styles.css

# Orijinal CSS dosyasını yedekle
echo "Orijinal CSS dosyası yedekleniyor..."
cd ..
cp styles.css styles.css.backup

# Optimize edilmiş CSS dosyasını ana dizine taşı
echo "Optimize edilmiş CSS dosyası ana dizine taşınıyor..."
cp temp/styles.min.css styles.css

# Geçici klasörü temizle
echo "Geçici dosyalar temizleniyor..."
rm -rf temp

echo "CSS optimizasyonu tamamlandı!"
echo "Orijinal CSS dosyası 'styles.css.backup' olarak yedeklendi." 