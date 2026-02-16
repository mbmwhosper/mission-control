class MissionControl {
    constructor() {
        this.currentView = 'dashboard';
        this.tasks = [
            { id: 1, title: 'Client Sentiment Tracking', desc: 'Analyzes sentiment of client communications', tags: ['research', 'ai'], progress: 35, status: 'active' },
            { id: 2, title: 'Skill Building', desc: 'Proactively identifies and builds capabilities', tags: ['automation'], progress: 12, status: 'queued' },
            { id: 3, title: 'Memory Building', desc: 'Optimize memory management', tags: ['memory'], progress: 0, status: 'queued' },
            { id: 4, title: 'Brain Cool Down', desc: 'Keep context warm between sessions', tags: ['performance'], progress: 0, status: 'queued' },
            { id: 5, title: 'Brief Builder', desc: 'Dashboard for brief generation', tags: ['ui'], progress: 68, status: 'active' }
        ];
        this.messages = [
            { sender: 'agent', name: 'Jarvis', text: 'Mission Control back online - reconfigured for new network', time: '2:41 PM', avatar: '🤖' },
            { sender: 'agent', name: 'Assistant', text: 'Ready for new high-level mission.', time: '2:40 PM', avatar: '⚡' }
        ];
        this.documents = [
            { name: 'SOUL.md', size: '2KB', type: 'file' },
            { name: 'USER.md', size: '1KB', type: 'file' },
            { name: 'MEMORY.md', size: '4KB', type: 'file' },
            { name: 'memory/', size: '12 files', type: 'folder' }
        ];
        this.activityData = [
            { type: 'heartbeat', message: 'HEARTBEAT_OK - No system events', status: 'pending', time: '2m ago' },
            { type: 'tool_call', message: 'Executing read - SOUL.md', status: 'success', time: '8m ago' },
            { type: 'model_response', message: 'Model switched to kimi k2.5', status: 'success', time: '4h ago' }
        ];
        this.init();
    }

    init() {
        this.setupNavigation();
        this.renderActivity();
        this.renderTasks();
        this.renderChat();
        this.renderDocuments();
        this.startClock();
        this.simulateRealtime();
    }

    setupNavigation() {
        document.querySelectorAll('[data-view]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const view = el.dataset.view;
                if (view) this.switchView(view);
            });
        });

        document.querySelectorAll('.stat-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.stat-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filter = tab.dataset.filter;
                this.renderTasks(filter);
            });
        });

        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.closest('.toggle-group');
                parent.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    }

    switchView(viewName) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const viewEl = document.getElementById(`${viewName}-view`);
        if (viewEl) viewEl.classList.add('active');

        document.querySelectorAll('[data-view]').forEach(el => {
            if (el.classList.contains('nav-item') || el.closest('li')) {
                el.classList.remove('active');
                if (el.dataset.view === viewName) el.classList.add('active');
                if (el.closest('li') && el.dataset.view === viewName) {
                    el.closest('li').classList.add('active');
                }
            }
        });

        const titles = {
            dashboard: 'Dashboard',
            workshop: 'Workshop',
            intelligence: 'Intelligence',
            metrics: 'API Usage',
            documents: 'Documents'
        };

        const titleEl = document.getElementById('pageTitle');
        if (titleEl && titles[viewName]) {
            titleEl.textContent = titles[viewName];
        }

        this.currentView = viewName;
    }

    renderActivity() {
        const container = document.getElementById('activityFeed');
        if (!container) return;
        container.innerHTML = this.activityData.map(item => `
            <div class="activity-item">
                <div class="activity-status ${item.status}"></div>
                <div class="activity-content">
                    <span class="activity-type">${item.type}</span>
                    <div class="activity-message">${item.message}</div>
                </div>
                <span class="activity-time">${item.time}</span>
            </div>
        `).join('');
    }

    renderTasks(filter = 'all') {
        const container = document.getElementById('taskList');
        if (!container) return;

        let filtered = this.tasks;
        if (filter !== 'all') {
            filtered = this.tasks.filter(t => t.status === filter);
        }

        container.innerHTML = filtered.map(task => `
            <div class="task-card">
                <div class="task-header">
                    <span class="task-title">${task.title}</span>
                    <span class="task-status ${task.status}">${task.status}</span>
                </div>
                <p class="task-desc">${task.desc}</p>
                <div class="task-tags">
                    ${task.tags.map(tag => `<span class="task-tag">${tag}</span>`).join('')}
                </div>
                <div class="task-progress-row">
                    <div class="task-progress-bar">
                        <div class="task-progress-fill" style="width: ${task.progress}%"></div>
                    </div>
                    <span class="task-progress-text">${task.progress}%</span>
                </div>
            </div>
        `).join('');

        document.getElementById('activeTasks').textContent = this.tasks.filter(t => t.status === 'active').length;
        document.getElementById('queuedTasks').textContent = this.tasks.filter(t => t.status === 'queued').length;
    }

    renderChat() {
        const container = document.getElementById('chatMessages');
        if (!container) return;

        container.innerHTML = this.messages.map(msg => `
            <div class="chat-message ${msg.sender}">
                <div class="chat-avatar ${msg.sender}">${msg.avatar}</div>
                <div>
                    <div class="chat-name">${msg.name}</div>
                    <div class="chat-bubble">
                        <div class="chat-text">${msg.text}</div>
                    </div>
                    <div class="chat-time">${msg.time}</div>
                </div>
            </div>
        `).join('');

        container.scrollTop = container.scrollHeight;
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        if (!input || !input.value.trim()) {
            console.log('Chat: empty input, not sending');
            return;
        }

        const text = input.value.trim();
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        console.log('Chat: sending message:', text);

        // Add user message
        this.messages.push({
            sender: 'user',
            name: 'You',
            text: text,
            time: time,
            avatar: '👤'
        });

        input.value = '';
        this.renderChat();

        // Simulate agent response
        const responses = [
            'I\'ve processed that request.',
            'Task queued for execution.',
            'Analyzing your input...',
            'Command received.',
            'Working on that now.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        setTimeout(() => {
            const responseTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            this.messages.push({
                sender: 'agent',
                name: 'Assistant',
                text: randomResponse,
                time: responseTime,
                avatar: '⚡'
            });
            console.log('Chat: agent responded');
            this.renderChat();
        }, 800);
    }

    renderDocuments() {
        const container = document.getElementById('documentList');
        if (!container) return;

        container.innerHTML = this.documents.map(doc => `
            <div class="document-item">
                <span class="document-icon">${doc.type === 'folder' ? '📁' : '📄'}</span>
                <div class="document-info">
                    <div class="document-name">${doc.name}</div>
                    <div class="document-meta">${doc.type === 'folder' ? 'Directory' : 'Markdown'}</div>
                </div>
                <span class="document-size">${doc.size}</span>
            </div>
        `).join('');

        document.getElementById('docCount').textContent = this.documents.length;
    }

    startClock() {
        const updateTime = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            const el = document.getElementById('agentUptime');
            if (el) el.textContent = timeStr;
        };
        updateTime();
        setInterval(updateTime, 1000);
    }

    simulateRealtime() {
        setInterval(() => {
            const costEl = document.getElementById('todayCost');
            if (costEl) {
                const current = parseFloat(costEl.textContent.replace('$', ''));
                costEl.textContent = '$' + (current + Math.random() * 0.01).toFixed(2);
            }
        }, 30000);

        setInterval(() => {
            const tokensIn = document.getElementById('tokensIn');
            if (tokensIn) {
                const current = parseInt(tokensIn.textContent.replace(/,/g, ''));
                tokensIn.textContent = (current + Math.floor(Math.random() * 50)).toLocaleString();
            }
        }, 15000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MissionControl();
});
