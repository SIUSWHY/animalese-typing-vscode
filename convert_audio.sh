#!/bin/bash

echo "🔄 Конвертирую AAC файлы в WAV..."

# Создаем структуру папок для WAV файлов
mkdir -p assets/audio_wav/animalese/male/{voice_1,voice_2,voice_3,voice_4}
mkdir -p assets/audio_wav/animalese/female/{voice_1,voice_2,voice_3,voice_4}
mkdir -p assets/audio_wav/sfx
mkdir -p assets/audio_wav/vocals

# Функция для конвертации файла
convert_file() {
    local source="$1"
    local target="$2"
    
    if [ -f "$source" ]; then
        echo "🔄 $source -> $target"
        ffmpeg -i "$source" -acodec pcm_s16le -ar 22050 "$target" -y > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "✅ $target"
        else
            echo "❌ Ошибка: $source"
        fi
    fi
}

# Конвертируем мужские голоса
for voice in 1 2 3 4; do
    echo "🎵 Конвертирую male voice_${voice}..."
    source_dir="assets/audio/animalese/male/voice_${voice}"
    target_dir="assets/audio_wav/animalese/male/voice_${voice}"
    
    for file in "$source_dir"/*.aac; do
        if [ -f "$file" ]; then
            filename=$(basename "$file" .aac)
            convert_file "$file" "$target_dir/${filename}.wav"
        fi
    done
done

# Конвертируем женские голоса  
for voice in 1 2 3 4; do
    echo "🎶 Конвертирую female voice_${voice}..."
    source_dir="assets/audio/animalese/female/voice_${voice}"
    target_dir="assets/audio_wav/animalese/female/voice_${voice}"
    
    for file in "$source_dir"/*.aac; do
        if [ -f "$file" ]; then
            filename=$(basename "$file" .aac)
            convert_file "$file" "$target_dir/${filename}.wav"
        fi
    done
done

echo "🎉 Конвертация завершена!"
echo "📊 Статистика:"
echo "WAV файлов создано: $(find assets/audio_wav/ -name "*.wav" | wc -l)" 