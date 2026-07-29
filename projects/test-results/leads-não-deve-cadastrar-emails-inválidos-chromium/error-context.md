# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leads.spec.ts >> não deve cadastrar emails inválidos
- Location: tests\leads.spec.ts:26:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.alert')
Expected: "Email incoreto"
Received: "Email incorreto"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.alert')
    14 × locator resolved to <span class="alert">Email incorreto</span>
       - unexpected value "Email incorreto"

```

```yaml
- text: Email incorreto
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('deve cadastrar um lead na lista de espera', async ({ page }) => {
  4  |   await page.goto('http://localhost:3000/');
  5  | 
  6  |   await page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();
  7  | 
  8  |   await expect(
  9  |     page.getByTestId('modal').getByRole('heading')
  10 |   ).toHaveText('Fila de espera');
  11 | 
  12 |   await page.getByPlaceholder('Seu nome completo').fill('Kaique Vieira de Freitas');
  13 | 
  14 |   await page.getByPlaceholder('Seu email principal').fill('kaiqueffreitasvieira@gmail.com');
  15 |   
  16 |   await page.getByTestId('modal')
  17 |     .getByRole('button', { name: /Quero entrar na fila/ })
  18 |     .click();
  19 | 
  20 |   const expectedMsg = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  21 | 
  22 |   await expect(page.locator('.toast')).toHaveText(expectedMsg);
  23 |   await expect(page.locator('.toast')).toBeHidden({timeout: 10000});
  24 | });
  25 | 
  26 | test('não deve cadastrar emails inválidos', async ({ page }) => {
  27 |   await page.goto('http://localhost:3000/');
  28 | 
  29 |   await page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();
  30 | 
  31 |   await expect(
  32 |     page.getByTestId('modal').getByRole('heading')
  33 |   ).toHaveText('Fila de espera');
  34 | 
  35 |   await page.getByPlaceholder('Seu nome completo').fill('Kaique Vieira de Freitas');
  36 | 
  37 |   await page.getByPlaceholder('Seu email principal').fill('kaiqueffreitasvieiragmail.com');
  38 |   
  39 |   await page.getByTestId('modal')
  40 |     .getByRole('button', { name: /Quero entrar na fila/ })
  41 |     .click();
  42 | 
> 43 |   await expect(page.locator('.alert')).toHaveText('Email incoreto');
     |                                        ^ Error: expect(locator).toHaveText(expected) failed
  44 | 
  45 |   
  46 | });
```