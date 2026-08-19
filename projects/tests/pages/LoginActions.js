import { expect } from "@playwright/test";

export default class LoginActions {
   constructor(page) {
      this.page = page;
   }

   async visit(){
      await this.page.goto('http://localhost:3000/admin/login');
   }

   async submit(email, pass){
      await this.page.getByPlaceholder('E-mail').fill(email);
      await this.page.getByPlaceholder('Senha').fill(pass);
      await this.page.getByText('Entrar').click();
   }

   async isLoggedIn(){
      const btnLogout = this.page.locator('a[href="/logout"]');
      await this.page.waitForLoadState('networkidle');
      
      await expect(this.page).toHaveURL(/.*admin/)
      await expect(btnLogout).toBeVisible();
   }
}