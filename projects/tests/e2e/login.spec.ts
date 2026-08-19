import { test } from '@playwright/test';
import LoginActions from '../pages/LoginActions';

let loginActions;
test.beforeEach(async ({ page }) => {
   loginActions = new LoginActions (page);
});

test('deve logar no sistema', async ({ page }) => {
   let email = 'admin@zombieplus.com'
   let pass = 'pwd123'
   
   await loginActions.visit();
   await loginActions.submit(email, pass);
   await loginActions.isLoggedIn();
});
