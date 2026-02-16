# Mission Control

OpenClaw Agent Dashboard - Built with the "Son of Anton" cost-optimized approach.

## 🚀 Features

- **Dashboard** - Real-time system overview, cost tracking, live activity
- **Workshop** - Task queue with progress tracking (Kanban-style)
- **Intelligence** - Agent chat interface
- **API Usage** - Token cost breakdown by model
- **Documents** - File browser

## 📱 Mobile + Desktop

- **iOS**: Add to Home Screen for native app experience
- **Desktop**: Responsive sidebar navigation
- **PWA**: Works offline after first load

## 💰 Cost to Build

Following the Matt Ganzak "Son of Anton" methodology:

| Component | Tokens | Cost |
|-----------|--------|------|
| HTML Structure | ~2,000 | $0.0016 |
| CSS (Mobile + Desktop) | ~4,500 | $0.0036 |
| JavaScript (Interactive) | ~3,500 | $0.0028 |
| PWA Setup | ~1,500 | $0.0012 |
| **Total** | **~11,500** | **~$0.009** |

**Less than one penny.**

## 🛠️ Tech Stack

- Vanilla HTML/CSS/JS (no build step)
- Mobile-first responsive design
- PWA with service worker
- Adaptive navigation (bottom tabs on mobile, sidebar on desktop)

## 🚀 Deploy to GitHub Pages

1. Push to GitHub:
```bash
cd mission-control-v2
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mission-control.git
git push -u origin main
```

2. Enable GitHub Pages:
- Go to Settings → Pages
- Source: Deploy from a branch
- Branch: main / root
- Save

3. Access at: `https://YOUR_USERNAME.github.io/mission-control`

## 📱 Install on iOS

1. Open the GitHub Pages URL in Safari
2. Tap Share → Add to Home Screen
3. Launch like a native app

## 🎨 Design

- Dark theme (#0a0a0f background)
- Mint accent (#00d4aa)
- Glassmorphism cards
- iOS-safe areas support

## License

MIT
