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

        // Debounce resize to prevent excessive recalculations
        let resizeTimeout;

        function resize() {
            // Use clientHeight/Width to get actual display size, avoiding distortion
            const parent = canvas.parentElement;
            if (parent) {
                width = canvas.width = parent.clientWidth;
                height = canvas.height = parent.clientHeight;
            } else {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
        }

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 100);
        });
        resize();

        const points = [];
        // Adjust count based on screen size (less points on mobile)
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 35 : 70;

        for (let i = 0; i < count; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5), // Slower on mobile
                vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5)
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#111';

            // Draw connections
            ctx.beginPath();

            // Thinner lines on mobile
            const lineWidth = window.innerWidth < 768 ? 0.5 : 1.5;
            ctx.strokeStyle = `rgba(0, 112, 243, ${window.innerWidth < 768 ? 0.15 : 0.25})`;
            ctx.lineWidth = lineWidth;

            const connectionDistance = window.innerWidth < 768 ? 100 : 180; // Shorter distance on mobile

            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                    }
                }
            }
            ctx.stroke();

            // Draw points
            ctx.fillStyle = '#0070f3';
            const radius = window.innerWidth < 768 ? 1.5 : 2;

            for (let i = 0; i < points.length; i++) {
                points[i].x += points[i].vx;
                points[i].y += points[i].vy;

                // Bounce off edges properly
                if (points[i].x < 0 || points[i].x > width) points[i].vx *= -1;
                if (points[i].y < 0 || points[i].y > height) points[i].vy *= -1;

                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(animate);
        }

        animate();
    }
});
