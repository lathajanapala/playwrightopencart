import { test,expect,Locator } from "@playwright/test";
test("ComparingMethods",async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
   const prodcuts : Locator = page.locator('.product-title');
//    )innerText() vs textContent
const productCount = await prodcuts.count();
for(let i=1; i < productCount; i++){
   console.log(await prodcuts.nth(i).innerText());
   console.log(await prodcuts.nth(i).textContent());
}

})

