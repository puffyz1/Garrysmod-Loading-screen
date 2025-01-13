// Müzik kontrolü
const bgMusic = document.getElementById('bgMusic');
if (bgMusic) {
    bgMusic.volume = 0.2; // Ses seviyesi (0.0 - 1.0 arası)
}

// Kar efekti için gerekli değişkenler
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
const particles = [];
const particleCount = 100;

// Canvas boyutunu ayarla
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Kar tanesi oluştur
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 1 + 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Kar tanelerini oluştur
function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Animasyon
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

// Event listeners
window.addEventListener('resize', resizeCanvas);

// Başlat
resizeCanvas();
init();
animate();

// Garry's Mod loading progress
let totalFiles = 0;
let filesNeeded = 0;
const progressBar = document.querySelector('.progress');
const statusText = document.querySelector('.status');
const currentFileText = document.getElementById('currentFile');
const fileCountText = document.getElementById('fileCount');

// Sunucu bilgilerini al
function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    statusText.textContent = `${servername} sunucusuna bağlanılıyor...`;
    updateProgress(0);
}

// Durum değişikliklerini göster
function SetStatusChanged(status) {
    statusText.textContent = status;
}

// İndirilen dosyayı göster
function DownloadingFile(fileName) {
    currentFileText.textContent = `Yükleniyor: ${fileName}`;
    updateProgress(((totalFiles - filesNeeded) / totalFiles) * 100);
}

// Toplam dosya sayısını ayarla
function SetFilesTotal(total) {
    totalFiles = total;
    updateFileCount();
}

// Kalan dosya sayısını ayarla
function SetFilesNeeded(needed) {
    filesNeeded = needed;
    updateFileCount();
    updateProgress(((totalFiles - filesNeeded) / totalFiles) * 100);
}

// İlerleme çubuğunu güncelle
function updateProgress(percentage) {
    progressBar.style.width = `${percentage}%`;
}

// Dosya sayısı bilgisini güncelle
function updateFileCount() {
    if (totalFiles > 0) {
        const downloadedFiles = totalFiles - filesNeeded;
        fileCountText.textContent = `${downloadedFiles}/${totalFiles} dosya yüklendi`;
    }
}
