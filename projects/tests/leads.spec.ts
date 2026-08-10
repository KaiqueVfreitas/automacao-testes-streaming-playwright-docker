import { test, expect } from '@playwright/test';
import LandingPageActions from '../pages/LandingPagesActions';

test('deve cadastrar um lead na lista de espera', async ({ page }) => {
   const landingPageActions = new LandingPageActions (page);

   await landingPageActions.visit()
   await landingPageActions.openLeadModal()
   await landingPageActions.submitLeadFor()
   await landingPageActions.toastHaveText()
});

test('não deve cadastrar emails inválidos', async ({ page }) => {
   await page.goto('http://localhost:3000/');

   await page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();

   await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');

   await page.getByPlaceholder('Informe seu nome').fill('Kaique Vieira de Freitas');

   await page.getByPlaceholder('Informe seu email').fill('kaiqueffreitasvieiragmail.com');

   await page
      .getByTestId('modal')
      .getByRole('button', { name: /Quero entrar na fila/ })
      .click();

   await expect(page.locator('.alert')).toHaveText('Email incorreto');
});

test('não deve cadastrar quando o nome está vazio', async ({ page }) => {
   await page.goto('http://localhost:3000/');

   await page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();

   await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');

   await page.getByPlaceholder('Seu email principal').fill('kaiqueffreitasvieira@gmail.com');

   await page
      .getByTestId('modal')
      .getByRole('button', { name: /Quero entrar na fila/ })
      .click();

   await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
   await page.goto('http://localhost:3000/');

   await page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();

   await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');

   await page.getByPlaceholder('Informe seu nome').fill('Kaique Vieira de Freitas');

   await page
      .getByTestId('modal')
      .getByRole('button', { name: /Quero entrar na fila/ })
      .click();

   await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
   await page.goto('http://localhost:3000/');

   await page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();

   await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');

   await page
      .getByTestId('modal')
      .getByRole('button', { name: /Quero entrar na fila/ })
      .click();

   await expect(page.locator('.alert')).toHaveText(['Campo obrigatório', 'Campo obrigatório']);
});
