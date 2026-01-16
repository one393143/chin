// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-menu a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenu.classList.contains('active') ? 'x' : 'menu';
            // Update lucide icon if needed, or simply toggle class
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Animated Background (Simple Network Effect)
    const canvas = document.getElementById('network-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Adjust to hero section height if not fixed
            const hero = document.querySelector('.hero');
            if (hero) {
                // But canvas is absolute in hero, so 100% of hero is fine if hero has defined size.
                // However, hero size changes with window width.
            }
        }

        window.addEventListener('resize', resize);
        resize();

        const points = [];
        const count = 70; // Increased density

        for (let i = 0; i < count; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#111';

            // Draw connections
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 112, 243, 0.25)'; // Increased opacity
            ctx.lineWidth = 1.5; // Thicker lines
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) { // Increased connection distance
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                    }
                }
            }
            ctx.stroke();

            // Draw points
            ctx.fillStyle = '#0070f3';
            for (let i = 0; i < count; i++) {
                points[i].x += points[i].vx;
                points[i].y += points[i].vy;

                if (points[i].x < 0 || points[i].x > width) points[i].vx *= -1;
                if (points[i].y < 0 || points[i].y > height) points[i].vy *= -1;

                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(animate);
        }

        animate();
    }
});
