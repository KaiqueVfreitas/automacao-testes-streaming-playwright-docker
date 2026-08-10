class LangingPagesActions {
   async visit() {
      await page.goto('http://localhost:3000/');
   }

   async openLeadModal() {
      await page.getByRole('button', { name: /Aperte o play... se tiver coragem/ }).click();
      await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');
   }

   async submitLeadFor() {
      await page.getByPlaceholder('Informe seu nome').fill('Kaique Vieira de Freitas');
      await page.getByPlaceholder('Informe seu email').fill('kaiqueffreitasvieira@gmail.com');
      await page
         .getByTestId('modal')
         .getByRole('button', { name: /Quero entrar na fila/ })
         .click();
   }

   async toastHaveText() {
      const expectedMsg = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';

      await expect(page.locator('.toast')).toHaveText(expectedMsg);
      await expect(page.locator('.toast')).toBeHidden({ timeout: 10000 });
   }
}
