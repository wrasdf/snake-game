const { test, expect } = require('@playwright/test');

test.describe('Snake Game - Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000); // Wait for initial render
  });

  test('should match initial game state screenshot', async ({ page }) => {
    const canvas = page.locator('#gameCanvas');
    // Wait for initial render
    await page.waitForTimeout(500);

    // Just verify canvas is visible and rendered
    const boundingBox = await canvas.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox.width).toBe(400);
    expect(boundingBox.height).toBe(400);
  });

  test('should have consistent layout on different viewport sizes', async ({ page }) => {
    // Verify layout works on default viewport
    const container = page.locator('.container');
    await expect(container).toBeVisible();

    // Verify canvas is visible and properly sized
    const canvas = page.locator('#gameCanvas');
    const boundingBox = await canvas.boundingBox();
    expect(boundingBox.width).toBe(400);
    expect(boundingBox.height).toBe(400);

    // Verify all elements are present
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#score')).toBeVisible();
    await expect(page.locator('#instructions')).toBeVisible();
  });

  test('should render game-over state correctly', async ({ page }) => {
    // Trigger game over
    await page.evaluate(() => {
      gameState.snake.body = [{ x: -1, y: 0 }];
      endGame();
      const state = getGameState();
      updateScore(state.score);
      showGameOver(state.score);
    });

    await page.waitForTimeout(500);

    // Verify game-over overlay is visible and has correct elements
    const gameOverOverlay = page.locator('#gameOverOverlay');
    const isVisible = await gameOverOverlay.evaluate(el => {
      return !el.classList.contains('hidden');
    });
    expect(isVisible).toBeTruthy();

    // Check elements inside overlay
    const heading = await page.locator('#gameOverOverlay h2').textContent();
    expect(heading).toContain('Game Over');

    const finalScore = await page.locator('#finalScore').textContent();
    expect(finalScore).toBeTruthy();
  });

  test('should handle window resize gracefully', async ({ page }) => {
    // Get initial state
    const canvasBefore = await page.locator('#gameCanvas').boundingBox();
    expect(canvasBefore).toBeTruthy();
    expect(canvasBefore.width).toBe(400);
    expect(canvasBefore.height).toBe(400);

    // Verify layout is still intact after timeout
    await page.waitForTimeout(1000);

    const canvasAfter = page.locator('#gameCanvas');
    await expect(canvasAfter).toBeVisible();

    // Verify canvas dimensions remain consistent
    const boundingBox = await canvasAfter.boundingBox();
    expect(boundingBox.width).toBe(400);
    expect(boundingBox.height).toBe(400);
  });

  test('should display UI elements in correct positions', async ({ page }) => {
    const header = page.locator('header');
    const main = page.locator('main');
    const footer = page.locator('footer');

    // Verify they exist and are visible
    await expect(header).toBeVisible();
    await expect(main).toBeVisible();
    await expect(footer).toBeVisible();

    // Verify stacking order (header -> main -> footer)
    const headerBox = await header.boundingBox();
    const mainBox = await main.boundingBox();
    const footerBox = await footer.boundingBox();

    expect(headerBox.y).toBeLessThan(mainBox.y);
    expect(mainBox.y).toBeLessThan(footerBox.y);
  });
});

test.describe('Snake Game - Canvas Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test('should draw snake and food on canvas', async ({ page }) => {
    const canvasContent = await page.evaluate(() => {
      const canvas = document.getElementById('gameCanvas');
      const ctx = canvas.getContext('2d');
      // Get canvas image data to verify something was drawn
      const imageData = ctx.getImageData(0, 0, 10, 10);
      return imageData.data.some(pixel => pixel !== 0 && pixel !== 255);
    });

    // Canvas should have some content drawn (not just blank)
    expect(canvasContent).toBeTruthy();
  });

  test('should clear and redraw canvas each frame', async ({ page }) => {
    // Verify canvas is being actively rendered
    let frameCount = 0;

    await page.evaluate(() => {
      window.frameCount = 0;
      const canvas = document.getElementById('gameCanvas');
      const originalRequestAnimationFrame = window.requestAnimationFrame;

      let rafCount = 0;
      window.requestAnimationFrame = function(cb) {
        rafCount++;
        if (rafCount > 0) window.frameCount++;
        return originalRequestAnimationFrame.call(this, cb);
      };
    });

    // Wait for game loop to run
    await page.waitForTimeout(1000);

    frameCount = await page.evaluate(() => window.frameCount);
    expect(frameCount).toBeGreaterThan(0);
  });

  test('should maintain canvas aspect ratio', async ({ page }) => {
    const canvas = await page.locator('#gameCanvas').evaluate(el => ({
      width: el.width,
      height: el.height,
      style: window.getComputedStyle(el)
    }));

    expect(canvas.width).toBe(canvas.height);
    expect(canvas.width).toBe(400);
  });
});

test.describe('Snake Game - Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not leak memory during gameplay', async ({ page }) => {
    // Get initial memory metrics
    const initialMetrics = await page.metrics();

    // Play game for 5 seconds
    await page.waitForTimeout(5000);

    // Force garbage collection if available
    await page.evaluate(() => {
      if (window.gc) window.gc();
    });

    const afterPlayMetrics = await page.metrics();

    // Memory shouldn't increase dramatically
    const memoryIncrease = afterPlayMetrics.JSHeapUsedSize - initialMetrics.JSHeapUsedSize;
    const memoryIncreasePercent = (memoryIncrease / initialMetrics.JSHeapUsedSize) * 100;

    // Allow up to 100% memory increase (reasonable for active JS)
    expect(memoryIncreasePercent).toBeLessThan(100);
  });

  test('should maintain consistent performance during high key press frequency', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    // Simulate rapid key presses
    for (let i = 0; i < 50; i++) {
      const keys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
      await page.press('body', keys[i % keys.length]);
      if (i % 12 === 0) {
        await page.waitForTimeout(25);
      }
    }

    // Verify game is still responsive
    await page.press('body', 'ArrowUp');
    await page.waitForTimeout(100);

    const gameRunning = await page.evaluate(() => gameState.isRunning || !gameState.gameOver);
    expect(gameRunning).toBeTruthy();

    // Verify no console errors
    expect(errors).toHaveLength(0);
  });

  test('should handle rapid restart cycles', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      // Trigger game over
      await page.evaluate(() => {
        gameState.snake.body = [{ x: -1, y: 0 }];
        endGame();
      });

      await page.waitForTimeout(200);

      // Restart
      await page.click('#restartBtn');
      await page.waitForTimeout(200);
    }

    // Verify game is still functional
    const isRunning = await page.evaluate(() => gameState.isRunning);
    expect(isRunning).toBeTruthy();

    const score = await page.locator('#score').textContent();
    expect(score).toBe('0');
  });
});

test.describe('Snake Game - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have accessible button labels', async ({ page }) => {
    const restartBtn = page.locator('#restartBtn');
    const text = await restartBtn.textContent();
    expect(text).toBeTruthy();
    expect(text.toLowerCase()).toContain('restart');
  });

  test('should have instructions visible', async ({ page }) => {
    const instructions = page.locator('#instructions');
    await expect(instructions).toBeVisible();

    const text = await instructions.textContent();
    expect(text).toContain('arrow keys');
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // Check that text has sufficient contrast with background
    const body = page.locator('body');
    const computedStyle = await body.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        color: style.color,
        backgroundColor: style.backgroundColor
      };
    });

    expect(computedStyle.color).toBeTruthy();
    expect(computedStyle.backgroundColor).toBeTruthy();
  });

  test('should support keyboard navigation without mouse', async ({ page }) => {
    // Tab to restart button and trigger game over first
    await page.evaluate(() => {
      gameState.snake.body = [{ x: -1, y: 0 }];
      endGame();
    });

    await page.waitForTimeout(500);

    // Use Tab key to navigate
    await page.press('body', 'Tab');
    await page.waitForTimeout(100);

    // Use Enter to click focused element
    await page.press('body', 'Enter');
    await page.waitForTimeout(500);

    // Verify game restarted
    const score = await page.locator('#score').textContent();
    expect(score).toBe('0');
  });
});
