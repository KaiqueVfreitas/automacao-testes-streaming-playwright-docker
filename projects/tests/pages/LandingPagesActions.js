import { test, expect } from '@playwright/test';

export default class LangingPageActions {
   constructor(page) {
      this.page = page;
   }

   async visit() {
      await this.page.goto('http://localhost:3000/');
   }

   async openLeadModal() {
      await this.page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();
      await expect(this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');
   }

   async submitLeadFor(name, email) {
      await this.page.getByPlaceholder('Informe seu nome').fill(name);
      await this.page.getByPlaceholder('Informe seu email').fill(email);
      await this.page
         .getByTestId('modal')
         .getByRole('button', { name: /Quero entrar na fila/ })
         .click();
   }

   async toastHaveText(expectedMsg) {
      await expect(this.page.locator('.toast')).toHaveText(expectedMsg);
      await expect(this.page.locator('.toast')).toBeHidden({ timeout: 10000 });
   }

   async alertHaveText(target){
      await expect(this.page.locator('.alert')).toHaveText(target);
   }
}
