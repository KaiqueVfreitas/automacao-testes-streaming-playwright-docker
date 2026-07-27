# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leads.spec.ts >> deve cadastrar um lead na lista de espera
- Location: tests\leads.spec.ts:3:5

# Error details

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('deve cadastrar um lead na lista de espera', async ({ page }) => {
  4  |   await page.goto('http://localhost:3000/');
  5  | 
  6  |   await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click();
  7  | 
  8  |   await expect(
  9  |     page.getByTestId('modal').getByRole('heading')
  10 |   ).toHaveText('Fila de espera');
  11 | 
  12 |   await page.getByPlaceholder('Seu nome completo').fill('Kaique Vieira de Freitas');
  13 | 
  14 |   await page.getByPlaceholder('Seu email principal').fill('kaiqueffreitasvieira@gmail.com');
  15 |   
> 16 |   await page.waitForTimeout(100000);
     |              ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  17 | });
  18 | 
```