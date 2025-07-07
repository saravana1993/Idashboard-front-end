/**
 * Background Generator - Gray Lines and Dots
 * Creates a static background with gray lines and dots
 * Usage: Include this file and call initBackground() or it will auto-initialize
 */

// Configuration object for easy customization
const BackgroundConfig = {
    // Line settings
    lines: {
        horizontal: [15, 35, 55, 75, 85], // positions in percentages
        vertical: [20, 40, 60, 80],       // positions in percentages
        diagonal: [
            { top: 20, left: 0, width: 60, rotation: 25 },
            { top: 60, left: 30, width: 50, rotation: -15 },
            { top: 40, left: 60, width: 40, rotation: 45 },
            { top: 10, left: 70, width: 30, rotation: -30 }
        ]
    },
    // Dot settings
    dots: {
        small: [
            { top: 12, left: 8 },
            { top: 25, left: 25 },
            { top: 45, left: 15 },
            { top: 65, left: 35 },
            { top: 80, left: 20 },
            { top: 30, left: 55 },
            { top: 50, left: 75 },
            { top: 70, left: 85 },
            { top: 20, left: 90 },
            { top: 90, left: 65 },
            { top: 5, left: 45 },
            { top: 85, left: 50 }
        ],
        large: [
            { top: 18, left: 70 },
            { top: 42, left: 45 },
            { top: 68, left: 15 },
            { top: 78, left: 75 },
            { top: 35, left: 85 },
            { top: 55, left: 5 }
        ]
    }
};

// Main background generator class
class BackgroundGenerator {
    constructor() {
        this.initialized = false;
    }

    // Create the background container structure
    createBackgroundStructure() {
        // Check if background already exists
        if (document.getElementById('backgroundLayer')) {
            console.warn('Background layer already exists');
            return;
        }

        // Create main background container
        const backgroundLayer = document.createElement('div');
        backgroundLayer.id = 'backgroundLayer';
        backgroundLayer.className = 'background-layer';

        // Create lines container
        const linesContainer = document.createElement('div');
        linesContainer.id = 'linesContainer';
        linesContainer.className = 'lines-container';

        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.id = 'dotsContainer';
        dotsContainer.className = 'dots-container';

        // Append containers
        backgroundLayer.appendChild(linesContainer);
        backgroundLayer.appendChild(dotsContainer);

        // Insert at the beginning of body
        document.body.insertBefore(backgroundLayer, document.body.firstChild);
    }

    // Inject required CSS styles
    injectStyles() {
        // Check if styles already injected
        if (document.getElementById('backgroundStyles')) {
            return;
        }

        const styleSheet = document.createElement('style');
        styleSheet.id = 'backgroundStyles';
        styleSheet.innerHTML = `
            /* Background Layer Styles */
            .background-layer {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                background: linear-gradient(135deg,rgb(22, 21, 21) 0%,rgb(71, 70, 70) 100%);
                pointer-events: none;
            }

            .lines-container, .dots-container {
                position: absolute;
                width: 100%;
                height: 100%;
            }

            .bg-line {
                position: absolute;
                background:rgb(54, 53, 53);
                opacity: 0.3;
            }

            .bg-line.horizontal {
                height: 1px;
                width: 100%;
            }

            .bg-line.vertical {
                width: 1px;
                height: 100%;
            }

            .bg-line.diagonal {
                height: 1px;
                transform-origin: left center;
            }

            .bg-dot {
                position: absolute;
                width: 4px;
                height: 4px;
                background: #808080;
                border-radius: 50%;
                opacity: 0.4;
            }

            .bg-dot.large {
                width: 8px;
                height: 8px;
                background: #808080;
                opacity: 0.3;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // Create horizontal lines
    createHorizontalLines() {
        const container = document.getElementById('linesContainer');
        if (!container) return;

        BackgroundConfig.lines.horizontal.forEach(pos => {
            const line = document.createElement('div');
            line.className = 'bg-line horizontal';
            line.style.top = pos + '%';
            container.appendChild(line);
        });
    }

    // Create vertical lines
    createVerticalLines() {
        const container = document.getElementById('linesContainer');
        if (!container) return;

        BackgroundConfig.lines.vertical.forEach(pos => {
            const line = document.createElement('div');
            line.className = 'bg-line vertical';
            line.style.left = pos + '%';
            container.appendChild(line);
        });
    }

    // Create diagonal lines
    createDiagonalLines() {
        const container = document.getElementById('linesContainer');
        if (!container) return;

        BackgroundConfig.lines.diagonal.forEach(lineData => {
            const line = document.createElement('div');
            line.className = 'bg-line diagonal';
            line.style.top = lineData.top + '%';
            line.style.left = lineData.left + '%';
            line.style.width = lineData.width + '%';
            line.style.transform = `rotate(${lineData.rotation}deg)`;
            container.appendChild(line);
        });
    }

    // Create small dots
    createSmallDots() {
        const container = document.getElementById('dotsContainer');
        if (!container) return;

        BackgroundConfig.dots.small.forEach(dotData => {
            const dot = document.createElement('div');
            dot.className = 'bg-dot';
            dot.style.top = dotData.top + '%';
            dot.style.left = dotData.left + '%';
            container.appendChild(dot);
        });
    }

    // Create large dots
    createLargeDots() {
        const container = document.getElementById('dotsContainer');
        if (!container) return;

        BackgroundConfig.dots.large.forEach(dotData => {
            const dot = document.createElement('div');
            dot.className = 'bg-dot large';
            dot.style.top = dotData.top + '%';
            dot.style.left = dotData.left + '%';
            container.appendChild(dot);
        });
    }

    // Initialize the complete background
    init() {
        if (this.initialized) {
            console.warn('Background already initialized');
            return;
        }

        try {
            // Inject styles first
            this.injectStyles();
            
            // Create background structure
            this.createBackgroundStructure();
            
            // Create all elements
            this.createHorizontalLines();
            this.createVerticalLines();
            this.createDiagonalLines();
            this.createSmallDots();
            this.createLargeDots();
            
            this.initialized = true;
            console.log('Background initialized successfully');
        } catch (error) {
            console.error('Error initializing background:', error);
        }
    }

    // Remove background (cleanup method)
    destroy() {
        const backgroundLayer = document.getElementById('backgroundLayer');
        const styles = document.getElementById('backgroundStyles');
        
        if (backgroundLayer) {
            backgroundLayer.remove();
        }
        if (styles) {
            styles.remove();
        }
        
        this.initialized = false;
        console.log('Background destroyed');
    }
}

// Create global instance
const backgroundGenerator = new BackgroundGenerator();

// Global functions for easy access
function initBackground() {
    backgroundGenerator.init();
}

function destroyBackground() {
    backgroundGenerator.destroy();
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initBackground();
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BackgroundGenerator, initBackground, destroyBackground };
}

// ✅ Make accessible in browser global scope
window.initBackground = initBackground;
window.destroyBackground = destroyBackground;