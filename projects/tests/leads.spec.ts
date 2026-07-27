import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na lista de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('Kaique Vieira de Freitas');

  await page.getByPlaceholder('Seu email principal').fill('kaiqueffreitasvieira@gmail.com');
  
  await page.waitForTimeout(100000);
});
