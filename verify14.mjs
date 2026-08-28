import { chromium } from 'playwright'
const browser = await chromium.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })

// Fellow view: no verify/flag/escalate buttons
await page.goto('http://localhost:5173/login')
await page.click('button[role="tab"]:has-text("Fellow")')
await page.fill('#identifier', 'x')
await page.fill('#password', 'x')
await page.click('button:has-text("Sign in as Fellow")')
await page.waitForURL('**/fellow')
await page.goto('http://localhost:5173/fellow/reports/RPT-1043')
await page.waitForSelector('text=Back to reports')
await page.screenshot({ path: 'v14-fellow-report-detail.png', fullPage: true })

const bodyText = await page.textContent('body')
console.log('Has "Mark verified" (should be false):', bodyText.includes('Mark verified'))
console.log('Has "Flag as disinformation" (should be false):', bodyText.includes('Flag as disinformation'))
console.log('Has "Escalate" (should be false):', bodyText.includes('Escalate'))
console.log('Has reported-message (should be true):', bodyText.includes("You've reported this"))

// Admin view: verify/flag/escalate still present
await page.goto('http://localhost:5173/login')
await page.fill('#identifier', 'x')
await page.fill('#password', 'x')
await page.click('button:has-text("Sign in as Admin")')
await page.waitForURL('**/dashboard')
await page.goto('http://localhost:5173/reports/RPT-1044')
await page.waitForSelector('text=Mark verified')
await page.screenshot({ path: 'v14-admin-report-detail.png', fullPage: true })
const adminBodyText = await page.textContent('body')
console.log('Admin has "Mark verified" (should be true):', adminBodyText.includes('Mark verified'))
console.log('Admin has "Escalate to electoral body" (should be true):', adminBodyText.includes('Escalate to electoral body'))

console.log('errors:', errors.length ? errors : 'none')
await browser.close()
