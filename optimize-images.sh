#!/bin/bash

# Resim optimizasyonu için bash script
# Bu script, projedeki tüm resimleri optimize eder
# Kullanımı: ./optimize-images.sh

# Gerekli araçların yüklü olup olmadığını kontrol et
command -v convert >/dev/null 2>&1 || { echo "ImageMagick yüklü değil. Lütfen 'brew install imagemagick' veya 'apt-get install imagemagick' ile yükleyin."; exit 1; }
command -v jpegoptim >/dev/null 2>&1 || { echo "jpegoptim yüklü değil. Lütfen 'brew install jpegoptim' veya 'apt-get install jpegoptim' ile yükleyin."; exit 1; }
command -v optipng >/dev/null 2>&1 || { echo "optipng yüklü değil. Lütfen 'brew install optipng' veya 'apt-get install optipng' ile yükleyin."; exit 1; }

# Resim klasörlerini tanımla
CAROUSEL_DIR="assets/carousel-images"
IMAGES_DIR="assets/images"
ICONS_DIR="assets/icons"
FAVICON_DIR="assets/favicon"

echo "Resim optimizasyonu başlıyor..."

# JPEG resimleri optimize et
echo "JPEG resimleri optimize ediliyor..."
find $CAROUSEL_DIR $IMAGES_DIR -type f -name "*.jpg" -o -name "*.jpeg" | while read img; do
  echo "Optimize ediliyor: $img"
  jpegoptim --strip-all --max=85 "$img"
done

# PNG resimleri optimize et
echo "PNG resimleri optimize ediliyor..."
find $CAROUSEL_DIR $IMAGES_DIR $ICONS_DIR $FAVICON_DIR -type f -name "*.png" | while read img; do
  echo "Optimize ediliyor: $img"
  optipng -o5 "$img"
done

# Büyük resimleri yeniden boyutlandır (1000px'den büyükse)
echo "Büyük resimler yeniden boyutlandırılıyor..."
find $CAROUSEL_DIR $IMAGES_DIR -type f -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read img; do
  # Resmin genişliğini al
  width=$(identify -format "%w" "$img")
  
  # Eğer genişlik 1000px'den büyükse, yeniden boyutlandır
  if [ $width -gt 1000 ]; then
    echo "Yeniden boyutlandırılıyor: $img"
    convert "$img" -resize 1000x "$img"
  fi
done

# WebP formatına dönüştür
echo "WebP formatına dönüştürülüyor..."
find $CAROUSEL_DIR $IMAGES_DIR -type f -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read img; do
  # WebP dosya adını oluştur
  webp_img="${img%.*}.webp"
  
  echo "WebP'ye dönüştürülüyor: $img -> $webp_img"
  convert "$img" -quality 85 "$webp_img"
done

echo "Resim optimizasyonu tamamlandı!" 