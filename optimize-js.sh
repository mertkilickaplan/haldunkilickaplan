#!/bin/bash

# JavaScript optimizasyonu için bash script
# Bu script, projedeki JavaScript dosyalarını optimize eder
# Kullanımı: ./optimize-js.sh

# Gerekli araçların yüklü olup olmadığını kontrol et
command -v npm >/dev/null 2>&1 || { echo "npm yüklü değil. Lütfen Node.js'i yükleyin."; exit 1; }

# Geçici klasör oluştur
mkdir -p temp

# JavaScript dosyasını geçici klasöre kopyala
cp scripts.js temp/

# Terser kurmak için package.json oluştur
echo '{
  "name": "js-optimizer",
  "version": "1.0.0",
  "description": "JavaScript optimizasyon aracı",
  "dependencies": {
    "terser": "^5.17.1"
  }
}' > temp/package.json

# Terser'i kur
echo "Terser kuruluyor..."
cd temp && npm install

# JavaScript'i optimize et
echo "JavaScript optimize ediliyor..."
node_modules/.bin/terser scripts.js --compress --mangle --output scripts.min.js

# Orijinal JavaScript dosyasını yedekle
echo "Orijinal JavaScript dosyası yedekleniyor..."
cd ..
cp scripts.js scripts.js.backup

# Optimize edilmiş JavaScript dosyasını ana dizine taşı
echo "Optimize edilmiş JavaScript dosyası ana dizine taşınıyor..."
cp temp/scripts.min.js scripts.js

# Geçici klasörü temizle
echo "Geçici dosyalar temizleniyor..."
rm -rf temp

echo "JavaScript optimizasyonu tamamlandı!"
echo "Orijinal JavaScript dosyası 'scripts.js.backup' olarak yedeklendi." 