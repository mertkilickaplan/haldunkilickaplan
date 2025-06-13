#!/bin/bash

# Tüm optimizasyonları bir arada çalıştırmak için ana script
# Kullanımı: ./optimize-all.sh

echo "=== İZ-KİM Web Sitesi Optimizasyon Aracı ==="
echo "Bu script, web sitesinin performansını artırmak için tüm dosyaları optimize eder."
echo ""

# Resimleri optimize et
echo "1. Resim optimizasyonu başlatılıyor..."
./optimize-images.sh
echo ""

# CSS'i optimize et
echo "2. CSS optimizasyonu başlatılıyor..."
./optimize-css.sh
echo ""

# JavaScript'i optimize et
echo "3. JavaScript optimizasyonu başlatılıyor..."
./optimize-js.sh
echo ""

echo "=== Tüm optimizasyonlar tamamlandı! ==="
echo "Web siteniz artık daha hızlı çalışacak şekilde optimize edildi."
echo ""
echo "Yapılan değişiklikleri test etmek için tarayıcınızda sayfayı yenileyin."
echo "Herhangi bir sorun olursa, yedeklenen dosyaları geri yükleyebilirsiniz:"
echo "- CSS: styles.css.backup"
echo "- JavaScript: scripts.js.backup" 