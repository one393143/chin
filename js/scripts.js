// Embedded Portfolio Data
const portfolioData = [
    {
        "id": "minerva",
        "title": "Minerva 專業級棒球管理系統",
        "type": "Custom Tools & Systems",
        "tags": ["Github", "戰術排陣", "自動輪替", "數據分析"],
        "description": "FDE 工具代表作。具備戰術排陣與自動輪替邏輯的專業球隊管理系統。",
        "link": "https://github.com/one393143/minerva"
    },
    {
        "id": "opinion-war-room",
        "title": "輿論戰情室",
        "type": "Big Data & Semantic Analysis",
        "tags": ["Python", "R", "情緒分析", "PCA降維"],
        "description": "數據代表作。整合語意分析、情感分析與 PCA 主成分分析的輿情儀表板。",
        "link": "#"
    },
    {
        "id": "news-efficiency",
        "title": "新聞工作效率整合系統",
        "type": "Custom Tools & Systems",
        "tags": ["AiStudio", "效率優化"],
        "description": "效率代表作。專為簡化每日新聞監測與報表製作流程而設計的自動化系統。",
        "link": "#"
    },
    {
        "id": "office-auto",
        "title": "辦公室自動化工具集",
        "type": "Custom Tools & Systems",
        "tags": ["VBA", "Python", "加班費計算", "自動排班"],
        "description": "包含加班費自動計算機、人事排班演算法、電腦空間自動管理系統。",
        "link": "#"
    },
    {
        "id": "browser-ext",
        "title": "瀏覽器外掛開發",
        "type": "Custom Tools & Systems",
        "tags": ["JavaScript", "Chrome Extension"],
        "description": "自製新聞閱讀優化器 (去除廣告)、公文系統輔助外掛。",
        "link": "#"
    },
    {
        "id": "news-krawler",
        "title": "台灣主流新聞爬蟲庫",
        "type": "Big Data & Semantic Analysis",
        "tags": ["Python", "DOM Parsing"],
        "description": "針對台灣四大報 (UDN/LTN/ChinaTimes/CNA) 的自動化爬蟲腳本庫。",
        "link": "#"
    },
    {
        "id": "ptt-sna",
        "title": "PTT 全板面爬蟲與 SNA 分析",
        "type": "Big Data & Semantic Analysis",
        "tags": ["SNA", "Big Data", "網軍識別"],
        "description": "抓取 PTT 全板面資料，進行社會網絡分析以識別意見領袖與異常帳號。",
        "link": "#"
    },
    {
        "id": "historical-data",
        "title": "職業運動歷史數據探勘",
        "type": "Big Data & Semantic Analysis",
        "tags": ["CPBL", "NBA", "MLB", "30年歷史數據"],
        "description": "針對 CPBL、NBA、MLB 進行長達 30 年跨度的歷史數據爬取與深層探勘。",
        "link": "#"
    },
    {
        "id": "nat-sec-web",
        "title": "國家安全互動教材網",
        "type": "Digital Publishing",
        "tags": ["Web", "Interactive"],
        "description": "將生硬的國家安全議題轉化為可互動的網頁教材。",
        "link": "#"
    },
    {
        "id": "partymoney",
        "title": "PartyMoney 分帳系統",
        "type": "Digital Publishing",
        "tags": ["Web App", "Utility"],
        "description": "解決聚餐分帳痛點的網頁應用程式。",
        "link": "#"
    },
    {
        "id": "maya-ae",
        "title": "3D 建模與特效設計",
        "type": "Digital Publishing",
        "tags": ["Maya", "After Effects"],
        "description": "Maya 3D 建模作品與 After Effects 影音特效展示。",
        "link": "#"
    },
    {
        "id": "gov-projects",
        "title": "政府數位專案實績",
        "type": "Government Projects",
        "tags": ["採購案", "系統管理", "資安"],
        "description": "參與數位化輿情系統、城市形象推動計畫等大型標案規劃與執行。",
        "link": "#"
    }
];

// Portfolio Generation
function renderPortfolio(filter = 'all') {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = '';

    const filtered = filter === 'all'
        ? portfolioData
        : portfolioData.filter(item => item.type.includes(filter));

    filtered.forEach(item => {
        const tagsHtml = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <div class="project-content">
              <div class="project-type">${item.type}</div>
              <h3 class="project-title">${item.title}</h3>
              <p class="project-desc">${item.description}</p>
              <div class="project-tags">
                  ${tagsHtml}
              </div>
          </div>
      `;
        grid.appendChild(card);
    });
}

// Filter Handling
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class
        e.target.classList.add('active');
        // Filter
        renderPortfolio(e.target.dataset.filter);
    });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    lucide.createIcons();
});

// Simple Interactive Background (Alternative to Force Graph)
const canvas = document.getElementById('network-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0070f3';
        ctx.strokeStyle = 'rgba(0, 112, 243, 0.1)';

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();

            // Connect
            particles.forEach((p2, j) => {
                if (i === j) return;
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        requestAnimationFrame(animate);
    }
    animate();
}
