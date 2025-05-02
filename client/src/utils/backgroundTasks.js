// Background task manager with battery optimization
class BackgroundTaskManager {
    constructor() {
        this.tasks = new Map();
        this.isLowPower = false;
        this.checkBatteryStatus();
    }

    async checkBatteryStatus() {
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                this.isLowPower = battery.level <= 0.2 && !battery.charging;
                
                // Listen for battery changes
                battery.addEventListener('levelchange', () => {
                    this.isLowPower = battery.level <= 0.2 && !battery.charging;
                    this.adjustTaskPriorities();
                });
                
                battery.addEventListener('chargingchange', () => {
                    this.isLowPower = battery.level <= 0.2 && !battery.charging;
                    this.adjustTaskPriorities();
                });
            } catch (error) {
                console.warn('Battery status API not available:', error);
            }
        }
    }

    adjustTaskPriorities() {
        for (const [_, task] of this.tasks) {
            if (this.isLowPower && task.priority === 'high') {
                task.interval = task.interval * 2; // Reduce frequency in low power
            } else if (!this.isLowPower && task.originalInterval) {
                task.interval = task.originalInterval; // Restore original frequency
            }
        }
    }

    registerTask(id, callback, interval, priority = 'normal') {
        if (this.tasks.has(id)) {
            this.unregisterTask(id);
        }

        const task = {
            callback,
            interval,
            originalInterval: interval,
            priority,
            lastRun: 0,
            timeoutId: null
        };

        // Adjust interval based on battery status
        if (this.isLowPower && priority === 'high') {
            task.interval = interval * 2;
        }

        const runTask = async () => {
            if (document.hidden && priority !== 'high') {
                return; // Skip non-high priority tasks when page is hidden
            }

            const now = Date.now();
            if (now - task.lastRun >= task.interval) {
                task.lastRun = now;
                try {
                    await callback();
                } catch (error) {
                    console.error(`Background task ${id} failed:`, error);
                }
            }

            if (this.tasks.has(id)) {
                task.timeoutId = setTimeout(runTask, 
                    Math.max(0, task.interval - (Date.now() - task.lastRun))
                );
            }
        };

        this.tasks.set(id, task);
        runTask();
    }

    unregisterTask(id) {
        const task = this.tasks.get(id);
        if (task) {
            clearTimeout(task.timeoutId);
            this.tasks.delete(id);
        }
    }

    unregisterAllTasks() {
        for (const [id] of this.tasks) {
            this.unregisterTask(id);
        }
    }
}

const backgroundTaskManager = new BackgroundTaskManager();

export default backgroundTaskManager;