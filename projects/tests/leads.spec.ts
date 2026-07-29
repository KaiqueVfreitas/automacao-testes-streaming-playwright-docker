import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na lista de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('Kaique Vieira de Freitas');

  await page.getByPlaceholder('Seu email principal').fill('kaiqueffreitasvieira@gmail.com');
  
  await page.getByTestId('modal')
    .getByRole('button', { name: /Quero entrar na fila/ })
    .click();

  const expectedMsg = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';

  await expect(page.locator('.toast')).toHaveText(expectedMsg);
  await expect(page.locator('.toast')).toBeHidden({timeout: 10000});
});

test('não deve cadastrar emails inválidos', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('Kaique Vieira de Freitas');

  await page.getByPlaceholder('Seu email principal').fill('kaiqueffreitasvieiragmail.com');
  
  await page.getByTestId('modal')
    .getByRole('button', { name: /Quero entrar na fila/ })
    .click();

  await expect(page.locator('.alert')).toHaveText('Email incorreto');

  
});