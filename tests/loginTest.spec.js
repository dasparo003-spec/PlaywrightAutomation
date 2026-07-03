import {test, expect, chromium} from '@playwright/test'
import fs from 'fs'

test('demoPractice', async () =>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/#top")
    await page.waitForLoadState("domcontentloaded")
   // await page.locator("#dropdown-class-example").click()
    await page.locator("#dropdown-class-example").selectOption({index : 2})
    const store = await page.locator("#dropdown-class-example").inputValue()
    console.log(store)
    await expect(store).toBe('option2')

    await page.getByPlaceholder('Type to Select Countries').pressSequentially('ind', {delay : 500})
    const options = await page.locator("[id='ui-id-1'] li").all()
    for(let i of options){
        if(await i.textContent()=="India"){
            await i.click()
            break;
        }
    }
    const valueCheck = await page.getByPlaceholder('Type to Select Countries').inputValue()
    await expect(valueCheck).toBe("hgjghgg")

    })

    test('alert', async ({page}) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/#top")
        await page.getByPlaceholder('Enter Your Name').fill('Babi')
        const alertBoxCheck =  await page.getByPlaceholder('Enter Your Name').inputValue()
        await expect(alertBoxCheck).toBe('Babi')
        page.on('dialog', async d => {
            console.log(await d.message())
            await d.accept()
        })
        await page.locator('#alertbtn').click()
    })

    test('windowHandling', async ({page, context}) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/#top")
        const [newTab] = await Promise.all([context.waitForEvent('page'), page.getByRole('link', {name : 'Open Tab'}).click()])
        console.log(await newTab.url())
        console.log(await page.url())
    })

    test('frame', async ({page}) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/#top")
        const frame = await page.frameLocator('#courses-iframe')
        await page.locator().click({button : 'right'})

    })

    test('download', async ({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html")
        await page.locator('#generatePdf').click()
        const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('link', {name : "Download PDF File"}).click()]);
        const filePath = 'C:\\Users\\Admin\\Desktop\\' + download.suggestedFilename()
        await download.saveAs(filePath)
        await expect(fs.existsSync(filePath)).toBeTruthy()



    })
        







